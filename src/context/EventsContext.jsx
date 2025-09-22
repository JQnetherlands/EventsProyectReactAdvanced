import { submitWithToaster } from "@/utils/submitWithToaster";
import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchEvents, fetchCategories, fetchUsers } from "@/api/events";
import { normalizeEvent } from "@/utils/normalizeEvent";
import { messages } from "@/utils/messages";
const EventsContext = createContext(null);

const initialState = {
  events: [],
  categories: [],
  users: [],
  loading: true,
  error: null,
};

const ACTIONS = {
  SET_ALL: "SET_ALL",
  SET: "SET",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_USERS: "SET_USERS",
  ADD: "ADD",
  UPDATE: "UPDATE",
  REMOVE: "REMOVE",
  ERROR: "ERROR",
};

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
      }
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

export const EventsProvider = ({ children, initialEvents = [] }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    events: initialEvents,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [events, categories, users] = await Promise.all([
          fetchEvents(),
          fetchCategories(),
          fetchUsers(),
        ]);
        console.log(events) 
        if (cancelled) return;
        console.log(events)
        const enrichedEvents = events.map((e) => {
          const normalized = normalizeEvent(e, categories, users);
          return normalized;
        });
        console.log(enrichedEvents)
        dispatch({ type: ACTIONS.SET_ALL, payload: { events: enrichedEvents, categories, users}, });
      } catch (err) {
        if (cancelled) return;
        dispatch({ type: ACTIONS.ERROR, payload: err });
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // simple action wrappers
  const addEvent = (event) => dispatch({ type: ACTIONS.ADD, payload: event });
  const updateEventInState = (event) =>
    dispatch({ type: ACTIONS.UPDATE, payload: event });
  const removeEvent = (id) => dispatch({ type: ACTIONS.REMOVE, payload: id });

  // default transform: normalize saved event with current categories & users
  const defaultTransform = (saved, cats = [], users = []) => normalizeEvent(saved, cats, users);
  
  // helpers that use submitWithToaster ()
  const submitAndAdd = async (
    promiseFactory,
    message = messages.event.create,
    transform = defaultTransform
  ) => {
    const saved = await submitWithToaster(promiseFactory, message);
    // transform gets (saved, categories, users)
    const toStore = transform(saved, state.categories, state.users);
    addEvent(toStore);
    return toStore;
  };

  const submitAndUpdate = async (
    promiseFactory,
    message = messages.event.update,
    transform = defaultTransform
  ) => {
    const saved = await submitWithToaster(promiseFactory, message);
    const toStore = transform(saved, state.categories, state.users);
    updateEventInState(toStore);
    return toStore;
  };

  const submitAndRemove = async (
    promiseFactory,
    message = messages.event.delete,
    getId = (res) => res?.id
  ) => {
const res = await submitWithToaster(promiseFactory, message);
console.log("[submitAndRemove] API response:", res);
    
    const id = getId(res);
    if (id === undefined || id === null) {
      throw new Error(
        "Could not determine id to remove from response. Pass getId function."
      );
    }
    removeEvent(id);
    return res;
  };
  const value = {
    events: state.events,
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

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return ctx;
};
