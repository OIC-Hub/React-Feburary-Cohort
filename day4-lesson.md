# Day 4 — Event Handling

---

## 1. Events in React vs Vanilla JS

If your students know vanilla JS events, they already understand the concept. React just has a slightly different syntax.

```js
// Vanilla JS
const btn = document.getElementById('btn');
btn.addEventListener('click', function(event) {
  console.log('clicked!');
});

// React — same idea, different syntax
<button onClick={(e) => console.log('clicked!')}>Click me</button>
```

### Key Syntax Differences

| Vanilla JS | React |
|---|---|
| `onclick` (lowercase) | `onClick` (camelCase) |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `addEventListener('click', fn)` | `onClick={fn}` |
| Passed as a string `"handleClick()"` | Passed as a **function reference** `{handleClick}` |

### ⚠️ The Most Common Beginner Mistake

```jsx
// ❌ Wrong — calls the function immediately on render, not on click
<button onClick={handleClick()}>Click</button>

// ✅ Correct — passes the function to be called later on click
<button onClick={handleClick}>Click</button>

// ✅ Also correct — wraps it in an arrow function (useful when you need arguments)
<button onClick={() => handleClick()}>Click</button>
<button onClick={() => handleClick(item.id)}>Click</button>
```

The `()` is the trigger. If you add `()`, you're calling it right now. Without `()`, you're handing React a function to call later.

---

## 2. Synthetic Events

React doesn't give you the raw browser event. It wraps it in a **SyntheticEvent** — a cross-browser wrapper that works identically in every browser.

```jsx
function handleClick(e) {
  console.log(e);              // SyntheticEvent object
  console.log(e.type);         // "click"
  console.log(e.target);       // the element that was clicked
  console.log(e.target.value); // value of an input element
}
```

For the most part, SyntheticEvents behave exactly like native DOM events. The two methods you'll use most often are the same as vanilla JS:

```jsx
// Prevent default browser behavior (e.g. page reload on form submit)
e.preventDefault();

// Stop the event from bubbling up to parent elements
e.stopPropagation();
```

---

## 3. The Three Most Important Events

### `onClick`

The most common event. Works on any element, not just buttons.

```jsx
function App() {
  const [msg, setMsg] = useState('');

  function handleClick() {
    setMsg('Button was clicked!');
  }

  // Defining the handler as a named function (cleaner for complex logic)
  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <p>{msg}</p>
    </div>
  );
}
```

**Inline vs Named handlers — when to use which:**

```jsx
// Inline arrow function — fine for simple one-liners
<button onClick={() => setCount(count + 1)}>+</button>

// Named function — better for anything more than one line
function handleDelete() {
  // multiple lines of logic...
  setItems(items.filter(i => i.id !== id));
  setMessage('Item deleted');
  console.log('deleted');
}
<button onClick={handleDelete}>Delete</button>
```

---

### `onChange`

Fires every time the value of an input, textarea, or select changes. This is how you build **controlled inputs** — inputs whose value is driven by React state.

```jsx
function App() {
  const [name, setName] = useState('');

  return (
    <div>
      <input
        type="text"
        value={name}                          // controlled by state
        onChange={(e) => setName(e.target.value)} // updates state on every keystroke
        placeholder="Type your name..."
      />
      <p>Hello, {name}!</p>
    </div>
  );
}
```

**The controlled input pattern** — notice the two-way binding:
1. `value={name}` — React controls what's displayed in the input
2. `onChange` — updates state when the user types

This is the React way. The input value always reflects state, and state always reflects the input.

**Other input types:**

```jsx
// Checkbox — use e.target.checked instead of e.target.value
<input
  type="checkbox"
  checked={isAgreed}
  onChange={(e) => setIsAgreed(e.target.checked)}
/>

// Select dropdown
<select value={city} onChange={(e) => setCity(e.target.value)}>
  <option value="lagos">Lagos</option>
  <option value="abuja">Abuja</option>
  <option value="ph">Port Harcourt</option>
</select>
```

---

### `onSubmit`

Fires when a form is submitted — either by clicking a submit button or pressing Enter in an input field. Always call `e.preventDefault()` first to stop the page from reloading.

```jsx
function App() {
  const [username, setUsername] = useState('');

  function handleSubmit(e) {
    e.preventDefault();           // ← never forget this
    console.log('Submitted:', username);
    setUsername('');              // clear the input after submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

> **Note:** Always put `onSubmit` on the `<form>` tag, not on the button. This ensures the form submits when the user presses Enter too — not just when they click the button.

---

## 4. Passing Event Handlers as Props

Sometimes a child component needs to trigger something in the parent. Since data flows **down** via props, you pass the handler **function** as a prop — the child calls it when needed.

```
Parent  ──── handler function (via props) ────▶  Child
Parent  ◀──── child calls the function ──────── Child
```

```jsx
// Child — receives the handler as a prop and calls it
function DeleteButton({ onDelete }) {
  return (
    <button onClick={onDelete} style={{ color: 'red' }}>
      Delete
    </button>
  );
}

// Parent — owns the state and defines the handler
function App() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);

  function handleDelete(itemToRemove) {
    setItems(items.filter(item => item !== itemToRemove));
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item}>
          {item}
          <DeleteButton onDelete={() => handleDelete(item)} />
        </li>
      ))}
    </ul>
  );
}
```

**Naming convention:** Props that hold event handlers are named with an `on` prefix — `onClick`, `onDelete`, `onSubmit`, `onChange`. This signals to anyone reading the code that "this prop expects a function."

---

## 5. Practice — Live Input Preview Form

### Goal
Build a profile form with multiple fields. As the user types, a live preview card updates in real time — no submit needed.

### File Structure
```
src/
├── components/
│   ├── ProfileForm.jsx
│   └── PreviewCard.jsx
└── App.jsx
```

---

### Step 1 — PreviewCard (child, display only)

```jsx
// src/components/PreviewCard.jsx
import PropTypes from 'prop-types';

function PreviewCard({ name, role, bio, color }) {
  return (
    <div style={{
      border: `3px solid ${color || '#ccc'}`,
      borderRadius: '12px',
      padding: '24px',
      width: '260px',
      textAlign: 'center',
      transition: 'border-color 0.3s',
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: color || '#ccc',
        margin: '0 auto 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        color: 'white',
        fontWeight: 'bold',
      }}>
        {name ? name[0].toUpperCase() : '?'}
      </div>
      <h3 style={{ margin: '0 0 4px' }}>{name || 'Your Name'}</h3>
      <p style={{ color: '#888', margin: '0 0 12px' }}>{role || 'Your Role'}</p>
      <p style={{ fontSize: '14px', color: '#555' }}>{bio || 'Your bio will appear here...'}</p>
    </div>
  );
}

PreviewCard.propTypes = {
  name:  PropTypes.string,
  role:  PropTypes.string,
  bio:   PropTypes.string,
  color: PropTypes.string,
};

export default PreviewCard;
```

---

### Step 2 — ProfileForm (parent, owns all state)

```jsx
// src/components/ProfileForm.jsx
import { useState } from 'react';
import PreviewCard from './PreviewCard';

const labelStyle = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: 'bold',
  fontSize: '14px',
};

const inputStyle = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '14px',
  boxSizing: 'border-box',
  marginBottom: '16px',
};

function ProfileForm() {
  const [name,  setName]  = useState('');
  const [role,  setRole]  = useState('');
  const [bio,   setBio]   = useState('');
  const [color, setColor] = useState('#4f46e5');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Profile saved!\nName: ${name}\nRole: ${role}`);
  }

  return (
    <div style={{ display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <h2 style={{ marginTop: 0 }}>Edit Profile</h2>

        <label style={labelStyle}>Name</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label style={labelStyle}>Role</label>
        <input
          style={inputStyle}
          type="text"
          placeholder="Software Engineer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <label style={labelStyle}>Bio</label>
        <textarea
          style={{ ...inputStyle, resize: 'vertical', height: '80px' }}
          placeholder="Tell us about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label style={labelStyle}>Card Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginBottom: '20px', cursor: 'pointer', height: '36px', width: '60px' }}
        />

        <br />
        <button
          type="submit"
          style={{
            background: color,
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '15px',
          }}
        >
          Save Profile
        </button>
      </form>

      {/* Live Preview */}
      <div>
        <h2 style={{ marginTop: 0 }}>Live Preview</h2>
        <PreviewCard name={name} role={role} bio={bio} color={color} />
      </div>

    </div>
  );
}

export default ProfileForm;
```

---

### Step 3 — App.jsx

```jsx
// src/App.jsx
import ProfileForm from './components/ProfileForm';

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Day 4 — Event Handling Practice</h1>
      <ProfileForm />
    </div>
  );
}

export default App;
```

---

### What This Practice Covers

| Feature | Where |
|---|---|
| `onChange` on text input | Name, Role fields |
| `onChange` on textarea | Bio field |
| `onChange` on color picker | Color input |
| `onSubmit` + `e.preventDefault()` | Form tag |
| Props passed to child | `PreviewCard` receives all 4 values |
| Derived UI from state | Avatar letter, button color, card border |

---

## ✅ Day 4 Checklist
- [ ] Know camelCase event names — `onClick`, `onChange`, `onSubmit`
- [ ] Understand why `onClick={fn}` vs `onClick={fn()}` matters
- [ ] Can use `e.target.value` to read input values
- [ ] Always call `e.preventDefault()` on form submit
- [ ] Built controlled inputs — `value` + `onChange` together
- [ ] Know how to pass handler functions as props to child components
- [ ] Built the live preview form

## 💡 Homework
1. Add a **character counter** below the Bio textarea that shows `X / 150 characters`. Disable the Save button and turn the counter red when the limit is exceeded — all driven by state.
2. Add a **Reset button** next to Save that clears all fields back to their initial values.
3. **Bonus:** Extract each form field into its own reusable `FormField` component that accepts `label`, `value`, `onChange`, and `placeholder` as props — then use it for all three text inputs.
