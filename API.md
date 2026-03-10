# Day 8 — Fetching Data from APIs

---

## 1. What is an API?

An **API** (Application Programming Interface) is like a waiter at a restaurant.

> 🍽️ You (the app) tell the waiter (API) what you want.
> The waiter goes to the kitchen (server/database) and brings back your food (data).

In real apps, APIs give us data like:
- A list of users
- Weather information
- Products in a store
- Posts on a blog

That data usually comes back as **JSON** — which looks just like a JavaScript object:

```json
{
  "id": 1,
  "name": "Ada Lovelace",
  "email": "ada@example.com"
}
```

---

## 2. How to Fetch Data in React

We use the built-in `fetch()` function inside a `useEffect` to get data from an API.

**The pattern is always the same — memorize these 4 steps:**

```jsx
// Step 1: Create state to hold the data
const [users, setUsers] = useState([]);

// Step 2: Fetch inside useEffect with empty array []
useEffect(() => {

  // Step 3: Call fetch(), convert to JSON, save to state
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setUsers(data));

}, []); // [] = fetch only once when page loads

// Step 4: Display the data
return (
  <ul>
    {users.map(user => <li key={user.id}>{user.name}</li>)}
  </ul>
);
```

That's the core pattern. Everything else is just adding to it.

---

## 3. Understanding the fetch() Chain

`fetch()` works with **promises** — each `.then()` is a step that runs after the previous one finishes.

```jsx
fetch('https://jsonplaceholder.typicode.com/users')  // Step A: go get the data
  .then(response => response.json())                 // Step B: convert it to JS
  .then(data => setUsers(data));                     // Step C: save it to state
```

Think of it like a relay race 🏃:
- Runner A fetches the raw response
- Runner B converts it to readable JSON
- Runner C saves it into state so React can show it

---

## 4. Loading State

Fetching data takes time — the internet is not instant. While we wait, we should show the user something instead of a blank screen.

We use a **loading state** for this:

```jsx
function App() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true); // start as true — we ARE loading

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false); // done loading!
      });
  }, []);

  // Show this while waiting
  if (loading) {
    return <p>Loading users... ⏳</p>;
  }

  // Show this when data arrives
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**Timeline of what happens:**

```
Page loads → loading = true  → "Loading users... ⏳" is shown
Data arrives → loading = false → user list appears ✅
```

---

## 5. Error State

Sometimes things go wrong — the internet is down, the server is broken, the URL is wrong. We need to handle that gracefully.

We add an **error state**:

```jsx
function App() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null); // null = no error yet

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {             // .catch() runs when something goes wrong
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading... ⏳</p>;
  if (error)   return <p>Something went wrong: {error} ❌</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

**The three states your app can be in:**

```
loading = true              → show spinner / loading message
loading = false, error set  → show error message
loading = false, data set   → show the actual content
```

---

## 6. Using axios (Simpler Alternative to fetch)

`axios` is a popular library that makes fetching even simpler. The main benefit — it converts JSON automatically, so you skip the `.then(res => res.json())` step.

### Install it first:
```bash
npm install axios
```

### fetch() vs axios — side by side:

```jsx
// Using fetch()
fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())        // ← extra step needed
  .then(data => setUsers(data));

// Using axios — cleaner!
import axios from 'axios';

axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => setUsers(res.data)); // data is already converted ✅
```

### axios with loading and error:

```jsx
import axios from 'axios';

useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      setUsers(res.data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);
```

> **Which should students use?** Start with `fetch()` — it's built into the browser and needs no install. Once they're comfortable, introduce `axios` as a cleaner option.

---

## 7. Practice — Fetch & Display Users

### What We're Building
A user directory that:
- Fetches 10 users from a real API
- Shows a loading message while waiting
- Shows an error message if something goes wrong
- Displays each user in a card with their name, email, and city
- Has a search box to filter users by name

### File Structure
```
src/
├── components/
│   ├── UserCard.jsx
│   └── UserList.jsx
└── App.jsx
```

---

### Step 1 — UserCard.jsx (display only)

```jsx
// src/components/UserCard.jsx
import PropTypes from 'prop-types';

function UserCard({ name, email, city, company }) {
  return (
    <div style={{
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      background: 'white',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    }}>
      {/* Avatar circle with first letter of name */}
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: '#4f46e5',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '12px',
      }}>
        {name[0]}
      </div>

      <h3 style={{ margin: '0 0 4px' }}>{name}</h3>
      <p style={{ margin: '0 0 4px', color: '#555', fontSize: '14px' }}>📧 {email}</p>
      <p style={{ margin: '0 0 4px', color: '#555', fontSize: '14px' }}>📍 {city}</p>
      <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>🏢 {company}</p>
    </div>
  );
}

UserCard.propTypes = {
  name:    PropTypes.string.isRequired,
  email:   PropTypes.string.isRequired,
  city:    PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
};

export default UserCard;
```

---

### Step 2 — UserList.jsx (fetches data, owns state)

Build this step by step with students. Start with just the fetch, then add loading, then error, then search.

```jsx
// src/components/UserList.jsx
import { useState, useEffect } from 'react';
import UserCard from './UserCard';

function UserList() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [search, setSearch]   = useState('');

  // Fetch users once when the component loads
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filter users by search term (no extra state needed — derived from existing state)
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- Render ---

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ fontSize: '24px' }}>⏳ Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: 'crimson' }}>
        <p style={{ fontSize: '24px' }}>❌ Something went wrong!</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search box */}
      <input
        type="text"
        placeholder="🔍 Search users by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          marginBottom: '24px',
          boxSizing: 'border-box',
        }}
      />

      {/* Result count */}
      <p style={{ color: '#888', marginBottom: '16px' }}>
        Showing {filtered.length} of {users.length} users
      </p>

      {/* No results message */}
      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '18px' }}>
          No users found for "{search}" 😕
        </p>
      )}

      {/* User grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px',
      }}>
        {filtered.map(user => (
          <UserCard
            key={user.id}
            name={user.name}
            email={user.email}
            city={user.address.city}
            company={user.company.name}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;
```

---

### Step 3 — App.jsx

```jsx
// src/App.jsx
import UserList from './components/UserList';

function App() {
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>👥 User Directory</h1>
      <p style={{ color: '#888' }}>Fetched from JSONPlaceholder API</p>
      <UserList />
    </div>
  );
}

export default App;
```

---

### What Each Part Teaches

| Feature | What it covers |
|---|---|
| `fetch()` inside `useEffect` | Core data fetching pattern |
| `loading` state | Showing feedback while waiting |
| `error` state | Handling things going wrong |
| `filtered` from `.filter()` | Deriving data — no extra `useState` |
| Search input + `onChange` | Day 4 event handling revision |
| `UserCard` receives props | Day 2 props revision |
| `key={user.id}` on list | Day 5 lists revision |

---

### Build Order for Class 🏗️

Teach this in order — don't show the full code at once:

1. **First** — fetch and display names in a plain `<ul>` (5 lines)
2. **Then** — add `loading` state
3. **Then** — add `error` state (test by changing the URL to something broken)
4. **Then** — move into the `UserCard` component
5. **Finally** — add the search filter

Each step works on its own. Students feel progress, not overwhelm.

---

## ✅ Day 8 Checklist
- [ ] Can explain what an API is in simple words
- [ ] Know the 4-step fetch pattern (state → useEffect → fetch → display)
- [ ] Understand what `.then()` does and why there are two of them
- [ ] Can add a loading state that shows while data is being fetched
- [ ] Can add an error state with `.catch()`
- [ ] Know the difference between `fetch()` and `axios`
- [ ] Built the user directory with search

## 💡 Homework
1. Add a **"Reload"** button that fetches the users again when clicked. Hint — you'll need a piece of state that triggers the `useEffect` when it changes.
2. Change the avatar circle color for each user — use the user's `id` to pick from an array of colors like `['#4f46e5', '#e74c3c', '#2ecc71', '#f39c12']`.
3. **Bonus:** Fetch posts from `https://jsonplaceholder.typicode.com/posts` and display them in a separate page. Each post should show its title and body. Add a search that filters by title.
