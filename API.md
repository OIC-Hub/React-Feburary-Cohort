# Day 8 — Fetching Data from APIs
Assignment API: https://programming-quotesapi.vercel.app/api/random
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