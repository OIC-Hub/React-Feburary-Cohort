# Day 9 — React Router (v6)

---

## 1. What is React Router?

React apps are **Single Page Applications (SPA)** — the browser only loads one HTML file. But users still expect to navigate between pages like a normal website.

React Router is the tool that makes this possible. It watches the URL in the browser and shows the right component for that URL — without reloading the page.

### Real Life Analogy 🏢
Think of your app as a building. React Router is the **receptionist**.

> "You want the Home page? Go to Room `/`"
> "You want the About page? Go to Room `/about`"
> "You want a user profile? Go to Room `/users/5`"

The building never changes — only which room you're in.

### Without React Router vs With React Router

```
Without React Router:
URL always stays at → localhost:5173
User can't bookmark a specific page
Browser back button doesn't work

With React Router:
Home page    → localhost:5173/
About page   → localhost:5173/about
Contact page → localhost:5173/contact
User profile → localhost:5173/users/3
```

---

## 2. Installation

```bash
npm install react-router-dom
```

That's all you need. One package, everything is included.

---

## 3. The Four Building Blocks

React Router v6 has 4 things you need to know:

| Name | What it does |
|---|---|
| `<BrowserRouter>` | Wraps your whole app — enables routing |
| `<Routes>` | A container that holds all your routes |
| `<Route>` | Maps a URL path to a component |
| `<Link>` | Like `<a>` tag — navigates without page reload |

---

## 4. Setting Up BrowserRouter

Wrap your entire app in `<BrowserRouter>` inside `main.jsx`. You only do this once.

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // ← import this
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* ← wrap App here */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

Think of `<BrowserRouter>` as switching the lights on. Nothing works without it.

---

## 5. Routes and Route — Mapping URLs to Pages

Inside `App.jsx`, use `<Routes>` and `<Route>` to say:
**"When the URL is THIS, show THAT component."**

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home    from './pages/Home';
import About   from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/"        element={<Home />}    />
      <Route path="/about"   element={<About />}   />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
```

### Reading a Route line

```jsx
<Route path="/about" element={<About />} />
//         ↑                    ↑
//   "when URL is /about"   "show this component"
```

### The 404 Page — Catch All Unknown URLs

```jsx
<Routes>
  <Route path="/"        element={<Home />}    />
  <Route path="/about"   element={<About />}   />
  <Route path="/contact" element={<Contact />} />
  <Route path="*"        element={<NotFound />} /> {/* catches everything else */}
</Routes>
```

`path="*"` means "any URL that didn't match anything above."

---

## 6. Link — Navigating Between Pages

`<Link>` works just like an HTML `<a>` tag — but it **doesn't reload the page**.

```jsx
// ❌ Regular <a> tag — reloads the whole page (bad in React)
<a href="/about">About</a>

// ✅ React Router <Link> — no page reload, fast navigation
import { Link } from 'react-router-dom';
<Link to="/about">About</Link>
```

### Building a Simple Navbar

```jsx
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      gap: '24px',
      padding: '16px 32px',
      background: '#1e293b',
    }}>
      <Link to="/"        style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
      <Link to="/about"   style={{ color: 'white', textDecoration: 'none' }}>About</Link>
      <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
```

---

## 7. NavLink — Active Link Styling

`<NavLink>` is a special version of `<Link>` that knows when its route is currently active. Use it for navbars so the current page link looks different.

```jsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? '#818cf8' : 'white',
    fontWeight: isActive ? 'bold' : 'normal',
    textDecoration: 'none',
  })}
>
  About
</NavLink>
```

When you're on `/about`, the About link automatically highlights. React Router handles this for you.

---

## 8. URL Params with useParams

Sometimes you want a **dynamic URL** — like showing a specific user's profile page.

```
/users/1   → show user with id 1
/users/2   → show user with id 2
/users/99  → show user with id 99
```

Instead of creating a separate route for every user, use a **URL parameter** with `:` prefix:

```jsx
// In App.jsx — the : means "this part is a variable"
<Route path="/users/:id" element={<UserProfile />} />
```

Then inside `UserProfile`, use `useParams` to read the value from the URL:

```jsx
// src/pages/UserProfile.jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams(); // reads the :id from the URL

  return (
    <div>
      <h1>User Profile</h1>
      <p>Showing profile for user ID: {id}</p>
    </div>
  );
}
```

### Full Example — Users List + Profile

```jsx
// Users list page — clicking a name goes to their profile
import { Link } from 'react-router-dom';

const users = [
  { id: 1, name: 'Ada Lovelace' },
  { id: 2, name: 'Alan Turing' },
  { id: 3, name: 'Grace Hopper' },
];

function Users() {
  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

```jsx
// UserProfile page — reads :id from the URL
import { useParams, Link } from 'react-router-dom';

const users = [
  { id: 1, name: 'Ada Lovelace',  role: 'Engineer' },
  { id: 2, name: 'Alan Turing',   role: 'Mathematician' },
  { id: 3, name: 'Grace Hopper',  role: 'Admiral & Developer' },
];

function UserProfile() {
  const { id } = useParams();

  // Find the user whose id matches the URL param
  // Note: id from URL is a string, user.id is a number — use Number() to convert
  const user = users.find(u => u.id === Number(id));

  if (!user) return <p>User not found! <Link to="/users">Go back</Link></p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Role: {user.role}</p>
      <Link to="/users">← Back to all users</Link>
    </div>
  );
}
```

---

## 9. useNavigate — Go to a Page with Code

`useNavigate` lets you navigate to a page **from inside your JavaScript** — not from a link click. Useful after a form submission, login success, button click, etc.

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // ... do login logic ...

    navigate('/dashboard'); // go to dashboard after login
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Login</button>
    </form>
  );
}
```

### Go Back (Like Browser Back Button)

```jsx
const navigate = useNavigate();

<button onClick={() => navigate(-1)}>← Go Back</button>
```

`navigate(-1)` means "go one page back in history." Just like clicking the browser's back button.

---

## 10. Practice — Multi-Page App (Home, About, Contact)

### What We're Building
A personal portfolio site with 4 pages:
- **Home** — welcome message and quick links
- **About** — a short bio
- **Contact** — a contact form
- **404** — page not found

### File Structure
```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

---

### main.jsx — Add BrowserRouter

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

---

### App.jsx — Routes Setup

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar    from './components/Navbar';
import Home      from './pages/Home';
import About     from './pages/About';
import Contact   from './pages/Contact';
import NotFound  from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />  {/* Navbar is outside Routes — always visible */}

      <main style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <Routes>
          <Route path="/"        element={<Home />}     />
          <Route path="/about"   element={<About />}    />
          <Route path="/contact" element={<Contact />}  />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
```

> **Key point:** `<Navbar>` is **outside** `<Routes>` so it appears on every page. Only the content inside `<Routes>` changes.

---

### Navbar.jsx

```jsx
// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  color: isActive ? '#818cf8' : 'white',
  fontWeight: isActive ? 'bold' : 'normal',
  textDecoration: 'none',
  fontSize: '15px',
});

function Navbar() {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      padding: '16px 40px',
      background: '#0f172a',
    }}>
      <span style={{ color: 'white', fontWeight: 'bold', marginRight: 'auto' }}>
        MyPortfolio
      </span>
      <NavLink to="/"        style={linkStyle}>Home</NavLink>
      <NavLink to="/about"   style={linkStyle}>About</NavLink>
      <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
    </nav>
  );
}

export default Navbar;
```

---

### Home.jsx

```jsx
// src/pages/Home.jsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '60px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
        👋 Hi, I'm Ada
      </h1>
      <p style={{ fontSize: '18px', color: '#555', marginBottom: '32px' }}>
        I'm a software developer who loves building things for the web.
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/about"
          style={{
            background: '#4f46e5', color: 'white',
            padding: '12px 28px', borderRadius: '8px', textDecoration: 'none',
          }}>
          About Me
        </Link>
        <Link to="/contact"
          style={{
            border: '2px solid #4f46e5', color: '#4f46e5',
            padding: '12px 28px', borderRadius: '8px', textDecoration: 'none',
          }}>
          Contact Me
        </Link>
      </div>
    </div>
  );
}

export default Home;
```

---

### About.jsx

```jsx
// src/pages/About.jsx
import { useNavigate } from 'react-router-dom';

const skills = ['React', 'JavaScript', 'Node.js', 'CSS', 'Git'];

function About() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>About Me</h1>
      <p style={{ fontSize: '16px', color: '#444', lineHeight: '1.8' }}>
        I'm a passionate developer based in Lagos, Nigeria. I love turning
        ideas into real products that people enjoy using. When I'm not coding,
        you'll find me reading, playing chess, or exploring new tech.
      </p>

      <h2>My Skills</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {skills.map(skill => (
          <span key={skill} style={{
            background: '#e0e7ff', color: '#4f46e5',
            padding: '6px 16px', borderRadius: '999px', fontSize: '14px',
          }}>
            {skill}
          </span>
        ))}
      </div>

      <br /><br />
      {/* useNavigate example — go to contact page on button click */}
      <button
        onClick={() => navigate('/contact')}
        style={{
          background: '#4f46e5', color: 'white', border: 'none',
          padding: '12px 24px', borderRadius: '8px', cursor: 'pointer',
        }}
      >
        Get in Touch →
      </button>
    </div>
  );
}

export default About;
```

---

### Contact.jsx

```jsx
// src/pages/Contact.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate  = useNavigate();
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [sent,    setSent]    = useState(false);

  const inputStyle = {
    width: '100%', padding: '10px', borderRadius: '6px',
    border: '1px solid #ddd', fontSize: '15px',
    marginBottom: '16px', boxSizing: 'border-box',
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, message });
    setSent(true);

    // After 2 seconds, go back to home using useNavigate
    setTimeout(() => navigate('/'), 2000);
  }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '60px' }}>
        <p style={{ fontSize: '48px' }}>✅</p>
        <h2>Message Sent!</h2>
        <p style={{ color: '#888' }}>Taking you back to home...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '480px' }}>
      <h1>Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input style={inputStyle} placeholder=