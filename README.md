# 📅 Events Manager

A modern **React event management application** built with a modular architecture focused on **reusability, scalability, and clean separation of concerns**.

The application allows users to **view, create, edit, and delete events** while demonstrating good frontend engineering practices such as centralized API handling, reusable UI components, error normalization, and responsive design.

---

# 🚀 Live Demo

*(Add your deployed link here later)*

Example:

https://your-project-name.vercel.app

---

# 🧠 Project Goal

This project was created as part of my **portfolio** to demonstrate real-world frontend architecture and development practices.

The goal was not just to build a CRUD interface, but to structure the project in a way that resembles **production-ready React applications**.

Key architectural goals:

- Maintainable project structure
- Reusable UI components
- Centralized API communication
- Consistent error handling
- Responsive user experience
- Scalable code organization

---

# ✨ Features

## Event Management
- View all events
- View a single event page
- Create new events
- Edit existing events
- Delete events with confirmation

## UI / UX
- Responsive layout
- Accessible dialog system
- Toast notifications for feedback
- Sticky navigation bar

## Architecture
- Centralized API layer
- Context-based state management
- Reusable hooks
- Reusable dialog system
- Error normalization and domain errors

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Chakra UI
- Context API

## Backend (External API)

- REST API hosted on Render
- JWT authentication

---

# 📁 Project Structure

```
src
├── api
│   └── events.js           # Centralized API client
│
├── components
│   ├── AddEventDialog.jsx
│   ├── BaseDialog.jsx
│   ├── ConfirmDialog.jsx
│   ├── EditEventDialog.jsx
│   ├── EventFormFields.jsx
│   ├── Navigation.jsx
│   ├── ColorModeToggle.jsx
│   └── UI
│       ├── provider.jsx
│       ├── toaster.jsx
│       └── tooltip.jsx
│
├── context
│   └── EventsContext.jsx   # Global event state
│
├── hooks
│   ├── useDialogConfig.jsx
│   └── useEventForm.js
│
├── pages
│   ├── EventsPage.jsx
│   └── EventPage.jsx
│
├── utils
│   ├── dateUtils.js
│   ├── domainError.js
│   ├── filterEvents.js
│   ├── messages.js
│   ├── normalizeError.js
│   ├── normalizeEvent.js
│   ├── showToast.js
│   ├── submitWithToaster.js
│   ├── toastPresets.js
│   └── validateEvent.js
│
└── main.jsx
```

---

# 🧩 Architecture Highlights

## Centralized API Client

All backend communication is handled through a dedicated API layer:

```
src/api/events.js
```

This keeps networking logic separate from UI components.

---

## Domain Error System

The project uses a custom error abstraction:

```
utils/domainError.js
utils/normalizeError.js
```

This ensures errors are:

- predictable
- structured
- easy to display in the UI

---

## Toast Notification System

A reusable toast utility wraps asynchronous operations:

```
submitWithToaster()
```

This automatically handles:

- loading state
- success notifications
- error notifications

without duplicating logic across components.

---

## Reusable Dialog System

Dialog components share a common base component:

```
BaseDialog
ConfirmDialog
AddEventDialog
EditEventDialog
```

This ensures consistent UI behavior and reduces duplication.

---

## Context-Based State Management

Event data is managed through a React Context:

```
EventsContext.jsx
```

This centralizes:

- events
- categories
- loading state
- event mutations

avoiding unnecessary prop drilling.

---

# 🔐 Authentication

The backend API requires **JWT authentication** for protected operations.

Currently:

- Create Event
- Update Event
- Delete Event

require a token.

For demonstration purposes, a **development token** is used while the frontend login flow is not implemented yet.

In a production environment this would be replaced with:

- login form
- token storage
- authenticated requests

---

# 📦 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/events-manager.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 🌐 Backend API

The application communicates with an external API hosted on Render.

Base URL:

```
https://events-back-end.onrender.com
```

---

# 📱 Responsive Design

The UI was designed to work across:

- desktop
- tablet
- mobile

Examples include:

- responsive button layouts
- flexible containers
- adaptive typography

---

# 🔮 Future Improvements

Potential improvements for future versions:

- User authentication flow
- Role-based permissions
- Pagination
- Event search
- Image uploads
- Event category filtering
- Improved loading states
- Unit testing

---

# 📚 What I Learned

This project helped reinforce several important frontend engineering concepts:

- designing scalable React architectures
- separating UI and business logic
- building reusable components
- handling API errors consistently
- structuring real-world projects

---

# 👤 Author

**Your Name**

Frontend Developer

GitHub:  
https://github.com/yourusername

Portfolio:  
*(add your portfolio link here later)*

---

# 📄 License

This project is open source and available under the MIT License.