
const BASE = "http://localhost:3000";

async function handleRes(res) { 
    const text = await res.text();
    let data;
    try { 
        data = text ? JSON.parse(text) : null;
     } catch { 
        data = text;
    }
    
    if (!res.ok) { 
        const err = new Error(data?.message || res.statusText || "API error");
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}
 
export async function fetchEvents() {
    const res = await fetch(`${BASE}/events`);
    return handleRes(res)
}

export async function fetchEvent(id) {
    const res = await fetch(`${BASE}/events/${id}`);
    return handleRes(res)
}

export async function fetchCategories() {
    const res = await fetch(`${BASE}/categories`);
    return handleRes(res);
}

export async function fetchUsers() {
    const res = await fetch(`${BASE}/users`);
    return handleRes(res);
}

export async function createEvent(event) {
    const res = await fetch(`${BASE}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });
    return handleRes(res);
}

export async function updateEvent(id, event) {
    const res = await fetch(`${BASE}/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    });

    return handleRes(res);
}

export async function deleteEvent(id) {
    const res = await fetch(`${BASE}/events/${id}`, {
        method: "DELETE",
    });
    return handleRes(res);
}