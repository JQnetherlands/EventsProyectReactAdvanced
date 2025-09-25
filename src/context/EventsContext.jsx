/**
 * EventsContext.jsx
 * -----------------
 * This file defines a React Context (`EventsContext`) and its Provider (`EventsProvider`)
 * to manage global state for events, categories, and users in the app.
 *
 * Responsibilities:
 * - Fetch events, categories, and users on load
 * - Normalize events (map categoryIds → category names, resolve creator → user)
 * - Provide helper methods for adding, updating, and removing events
 * - Handle async mutations with toast notifications (via submitWithToaster)
 *
 * Usage:
 * - Wrap your app with <EventsProvider> to make events available globally
 * - Access the context with `useEvents()`
 */
import { submitWithToaster } from "@/utils/submitWithToaster";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import { fetchEvents, fetchCategories, fetchUsers } from "@/api/events";
import { normalizeEvent } from "@/utils/normalizeEvent";
import { messages } from "@/utils/messages";

// Create context object (null default to enforce provider usage)
const EventsContext = createContext(null);

// Initial state for the reducer
const initialState = {
  events: [],
  categories: [],
  users: [],
  loading: true,
  error: null,
};

// Define action constants for reducer
const ACTIONS = {
  SET_ALL: "SET_ALL",
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  ERROR: "ERROR",
};

// Reducer: handles state transitions
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ALL:
      return {
        ...state,
        events: action.payload.events || [],
        categories: action.payload.categories || [],
        users: action.payload.users || [],
        loading: false,
        error: null,
      };
    case ACTIONS.ADD:
      return { ...state, events: [action.payload, ...state.events] };
    case ACTIONS.UPDATE:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case ACTIONS.REMOVE:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      };
    case ACTIONS.ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

/**
 * EventsProvider
 * --------------
 * Provides global events state and helper functions to child components.
 */
export const EventsProvider = ({ children, initialEvents = [] }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    events: initialEvents, // optional preloaded events
  });

  // Load data (events, categories, users) on mount
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [events, categories, users] = await Promise.all([
          fetchEvents(),
          fetchCategories(),
          fetchUsers(),
        ]);
        if (cancelled) return;
        // Store raw events, categories, and users in state
        dispatch({
          type: ACTIONS.SET_ALL,
          payload: { events, categories, users },
        });
      } catch (err) {
        if (cancelled) return;
        dispatch({ type: ACTIONS.ERROR, payload: err });
      }
    }
    load();

    return () => {
      cancelled = true; // cleanup flag to avoid setting state on unmounted component
    };
  }, []);

  // --- Simple state mutators (sync) ---
  const addEvent = (event) => dispatch({ type: ACTIONS.ADD, payload: event });
  const updateEventInState = (event) =>
    dispatch({ type: ACTIONS.UPDATE, payload: event });
  const removeEvent = (id) => dispatch({ type: ACTIONS.REMOVE, payload: id });

  // --- Async helpers with toaster feedback ---
  const submitAndAdd = async (
    promiseFactory,
    message = messages.event.create
  ) => {
    const saved = await submitWithToaster(promiseFactory, message);
    // transform gets (saved, categories, users)
    addEvent(saved);
    return saved;
  };

  const submitAndUpdate = async (
    promiseFactory,
    message = messages.event.update
  ) => {
    const saved = await submitWithToaster(promiseFactory, message);

    // Merge saved event into existing one if it exists
    const existing = state.events.find((e) => e.id === saved?.id);
    const merged = existing ? { ...existing, ...saved } : saved;

    updateEventInState(merged);
    return merged;
  };

  const submitAndRemove = async (
    promiseFactory,
    message = messages.event.delete,
    getId = (res) => res?.id
  ) => {
    const res = await submitWithToaster(promiseFactory, message);
    const id = getId(res);
    if (id === null) {
      throw new Error(
        "Could not determine id to remove from response. Pass getId function."
      );
    }
    removeEvent(id);
    return res;
  };

  // --- Derived state ---
  // Normalize events each time events/categories/users change
  const normalizedEvents = useMemo(() => {
    const normalized = state.events.map((e) =>
      normalizeEvent(e, state.categories, state.users)
    );
    return normalized;
  }, [state.events, state.categories, state.users]);

  // Expose context value
  const value = {
    events: normalizedEvents, // always normalized
    categories: state.categories,
    users: state.users,
    loading: state.loading,
    error: state.error,

    //mutators
    addEvent,
    updateEvent: updateEventInState,
    removeEvent,

    // helpers
    submitAndAdd,
    submitAndUpdate,
    submitAndRemove,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};

/**
 * Hook to access EventsContext
 * Throws if used outside of EventsProvider
 */
export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return ctx;
};
