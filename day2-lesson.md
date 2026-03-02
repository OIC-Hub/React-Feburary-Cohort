# Day 2 — Components & Props

---

## 1. Functional Components

A **component** is just a JavaScript function that returns JSX. That's it.

```jsx
function Hello() {
  return <h1>Hello World</h1>;
}
```

### Rules for Components
| Rule | Example |
|---|---|
| Name must start with a **capital letter** | `MyCard` ✅ &nbsp; `myCard` ❌ |
| Must return **a single root element** | Wrap in `<div>` or `<>` |
| Defined in its own `.jsx` file (best practice) | `Card.jsx`, `Header.jsx` |
| Must be **exported** to be used elsewhere | `export default MyCard` |

### Why capital letters matter
React uses the capitalization to tell components apart from plain HTML tags:

```jsx
<div />       // → HTML element
<Greeting />  // → React component
```

---

## 2. Writing & Rendering Multiple Components

Think of your UI as a **tree of components**. You build small pieces and compose them together.

```
App
├── Header
├── Main
│   ├── ProfileCard
│   ├── ProfileCard
│   └── ProfileCard
└── Footer
```

### Example

```jsx
// src/components/Header.jsx
function Header() {
  return (
    <header style={{ background: '#282c34', color: 'white', padding: '16px' }}>
      <h1>Our Team</h1>
    </header>
  );
}
export default Header;
```

```jsx
// src/components/Footer.jsx
function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '16px', color: '#888' }}>
      <p>© 2025 My Company</p>
    </footer>
  );
}
export default Footer;
```

```jsx
// src/App.jsx
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <p>Content goes here...</p>
      </main>
      <Footer />
    </>
  );
}
export default App;
```

### Key Concept — Components are Reusable
The real power is rendering the **same component multiple times** with different data. That's where **props** come in.

---

## 3. Props — Passing Data from Parent to Child

**Props** (short for *properties*) are how a parent component passes data **down** to a child component. They work exactly like HTML attributes.

```jsx
// Parent passes data via attributes
<ProfileCard name="Ada Lovelace" role="Engineer" />

// Child receives it as a `props` object
function ProfileCard(props) {
  return <h2>{props.name} — {props.role}</h2>;
}
```

### Destructuring Props (Preferred Style)
Instead of writing `props.name`, `props.role` everywhere, destructure directly in the function parameter:

```jsx
function ProfileCard({ name, role }) {
  return <h2>{name} — {role}</h2>;
}
```

Much cleaner. You'll see this pattern everywhere in real codebases.

### Props are Read-Only
A component **must never modify its own props**. Props flow one way — down from parent to child. This is React's **one-way data flow**.

```jsx
// ❌ Never do this
function ProfileCard({ name }) {
  name = "Someone else"; // WRONG — don't mutate props
  return <h2>{name}</h2>;
}
```

### Default Props
You can give props a fallback value in case the parent doesn't pass them:

```jsx
function ProfileCard({ name = "Anonymous", role = "No role assigned" }) {
  return <h2>{name} — {role}</h2>;
}
```

### The `children` Prop
React automatically passes anything written **between** a component's opening and closing tags as a special prop called `children`:

```jsx
function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      {children}
    </div>
  );
}

// Used like this:
<Card>
  <h2>Hello!</h2>
  <p>This content is passed as children.</p>
</Card>
```

---

## 4. PropTypes — Basic Validation

**PropTypes** is a built-in React tool that warns you in the console if a component receives the wrong type of prop — great for catching bugs early.

### Install (if needed)
```bash
npm install prop-types
```

### Usage

```jsx
import PropTypes from 'prop-types';

function ProfileCard({ name, role, age, avatar }) {
  return ( /* ... */ );
}

ProfileCard.propTypes = {
  name:   PropTypes.string.isRequired,  // must be a string, required
  role:   PropTypes.string.isRequired,
  age:    PropTypes.number,             // optional number
  avatar: PropTypes.string,             // optional string (url)
};
```

If the parent passes `age="25"` (a string instead of a number), React will print a **warning in the browser console** — without crashing the app. This is a safety net during development.

### Common PropTypes

| Type | PropType |
|---|---|
| String | `PropTypes.string` |
| Number | `PropTypes.number` |
| Boolean | `PropTypes.bool` |
| Function | `PropTypes.func` |
| Array | `PropTypes.array` |
| Object | `PropTypes.object` |
| Any required | add `.isRequired` |

---

## 5. Practice — Build a `ProfileCard` Component

### Goal
Build a `ProfileCard` component that accepts `name`, `role`, and `avatar` as props, then render **multiple cards** inside `App`.

### File Structure
```
src/
├── components/
│   └── ProfileCard.jsx
└── App.jsx
```

---

### Step 1 — Build the ProfileCard component

```jsx
// src/components/ProfileCard.jsx
import PropTypes from 'prop-types';

function ProfileCard({ name, role, avatar }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '24px',
      width: '200px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <img
        src={avatar}
        alt={name}
        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <h3 style={{ margin: '12px 0 4px' }}>{name}</h3>
      <p style={{ color: '#666', margin: 0 }}>{role}</p>
    </div>
  );
}

ProfileCard.propTypes = {
  name:   PropTypes.string.isRequired,
  role:   PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ProfileCard;
```

---

### Step 2 — Create a team data array

Instead of hardcoding three separate components, store data in an array — a taste of the pattern you'll use constantly in React.

```jsx
// src/App.jsx
import ProfileCard from './components/ProfileCard';

const team = [
  {
    name: 'Ada Lovelace',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Alan Turing',
    role: 'Backend Developer',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Grace Hopper',
    role: 'DevOps Engineer',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
];

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Our Team</h1>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {team.map((member) => (
          <ProfileCard
            key={member.name}
            name={member.name}
            role={member.role}
            avatar={member.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
```

> **Note on `key`:** You'll learn about `.map()` and `key` in depth on Day 5. For now just know that when you render a list of components, each needs a unique `key` prop — React uses it to track elements efficiently.

---

### Expected Output
Three profile cards displayed side by side, each showing a unique avatar image, name, and role.

---

## ✅ Day 2 Checklist
- [ ] Can write and export a functional component
- [ ] Understand the component tree concept
- [ ] Can pass props from parent to child
- [ ] Use destructuring to receive props
- [ ] Know that props are read-only
- [ ] Added PropTypes validation to a component
- [ ] Rendered multiple components from an array of data

## 💡 Homework
Extend the `ProfileCard` component:
1. Add two more props: `email` (string) and `isOnline` (bool)
2. Display the email below the role
3. Show a green dot 🟢 if `isOnline` is `true`, grey dot ⚫ if `false`
4. Add PropTypes for the two new props
5. **Bonus:** Create a `CardGrid` component that receives the whole `team` array as a single prop and renders all the cards inside it
