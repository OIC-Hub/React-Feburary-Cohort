# Day 3 — State & useState

---

## 1. What is State and Why It Matters

So far, your components just display data passed in via props. But what happens when data needs to **change over time** — a counter that increments, a menu that opens and closes, a form being filled in?

That's what **state** is for.

### Props vs State — The Core Difference

|                        | Props | State |
|---|---|---|
| Where it comes from | Parent component | The component itself |
| Can it change? | No (read-only) | Yes |
| Who controls it? | Parent | The component that owns it |
| What's it for? | Passing data down | Tracking data that changes |

### The Problem Without State

You might think — why not just use a regular variable?

```jsx
// ❌ This does NOT work
function Counter() {
  let count = 0;

  function handleClick() {
    count++;
    console.log(count); // updates in JS memory...
  }

  return (
    <div>
      <p>{count}</p>           {/* ...but the screen never changes */}
      <button onClick={handleClick}>+</button>
    </div>
  );
}
```

The variable updates in memory, but **React doesn't know anything changed** — so it never re-renders the component. The screen stays frozen at `0`.

React needs to be *told* when data changes so it can update the UI. That's exactly what `useState` does.

---

## 2. The useState Hook

A **Hook** is a special React function that lets you "hook into" React features from inside a functional component. `useState` is the most fundamental one.

### Syntax

```jsx
import { useState } from 'react';

const [value, setValue] = useState(initialValue);
```

This one line does three things:
1. Creates a **state variable** (`value`) with the given initial value
2. Creates a **setter function** (`setValue`) to update it
3. Tells React to **re-render** the component whenever `setValue` is called

### Naming Convention
Always name your setter `set` + the variable name:

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([]);
```

### useState with Different Data Types

```jsx
// Number
const [score, setScore] = useState(0);

// String
const [username, setUsername] = useState('');

// Boolean
const [isVisible, setIsVisible] = useState(true);

// Array
const [todos, setTodos] = useState([]);

// Object
const [user, setUser] = useState({ name: '', age: 0 });

// null (no value yet)
const [data, setData] = useState(null);
```

### A Working Counter

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

Now when you click the button:
1. `setCount(count + 1)` is called
2. React updates the state value
3. React **re-renders** the component with the new value
4. The screen shows the updated count ✅

---

## 3. Updating State Correctly — Immutability

This is the most important concept on Day 3. Getting it wrong causes subtle bugs that are hard to track down.

### The Golden Rule
**Never mutate state directly. Always use the setter function.**

```jsx
// ❌ Wrong — mutating state directly
count = count + 1;
isOpen = true;
items.push('new item');
user.name = 'Ada';

// ✅ Correct — using the setter
setCount(count + 1);
setIsOpen(true);
setItems([...items, 'new item']);
setUser({ ...user, name: 'Ada' });
```

### Why Does This Matter?

React decides whether to re-render by checking if the state value **changed**. If you mutate the original value directly, React sees the same reference and thinks nothing changed — so it won't re-render.

### Updating Arrays in State

Never use `.push()`, `.pop()`, or `.splice()` on state arrays. Always create a **new array**:

```jsx
const [items, setItems] = useState(['Apple', 'Banana']);

// ✅ Add an item
setItems([...items, 'Cherry']);

// ✅ Remove an item
setItems(items.filter(item => item !== 'Banana'));

// ✅ Update an item
setItems(items.map(item => item === 'Apple' ? 'Mango' : item));
```

### Updating Objects in State

Never modify object properties directly. Spread the old object and override only what changed:

```jsx
const [user, setUser] = useState({ name: 'Ada', age: 25 });

// ✅ Update one field — spread first, then override
setUser({ ...user, age: 26 });

// ❌ This mutates the original object
user.age = 26;
setUser(user); // React sees the same object reference — no re-render!
```

### Functional Updates — When to Use Them

When the new state depends on the previous state, use the **functional form** of the setter. This guarantees you're working with the latest value:

```jsx
// ✅ Safer for values that depend on previous state
setCount(prev => prev + 1);

// This matters when state updates are batched together
// (you'll see this become important as apps grow)
```

---

## 4. The Re-rendering Concept

Understanding *when* and *why* React re-renders is key to building predictable apps.

### What Triggers a Re-render?
1. The component's **own state changes** (via a setter function)
2. The component's **props change** (parent re-rendered with new values)

### What Happens During a Re-render?
React calls your component function again from top to bottom with the new state values, and updates only the parts of the DOM that actually changed.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Every time setCount is called, React runs this entire function again.
  // But only the <p> text in the DOM is actually updated — not the whole page.
  console.log('Component rendered! count =', count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

Open your browser console and add a `console.log` inside a component — you'll see it fire every time state changes. This is a useful debugging trick.

### State is Isolated per Component Instance

Each instance of a component has its **own independent state**:

```jsx
// These two counters are completely independent
function App() {
  return (
    <>
      <Counter />  {/* has its own count */}
      <Counter />  {/* has its own separate count */}
    </>
  );
}
```

---

## 5. Practice — Counter App & Toggle Component

### Project Structure
```
src/
├── components/
│   ├── Counter.jsx
│   └── Toggle.jsx
└── App.jsx
```

---

### Component 1 — Counter App

A counter with increment, decrement, and reset buttons. Also changes color when the count goes negative.

```jsx
// src/components/Counter.jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const isNegative = count < 0;

  return (
    <div style={{
      textAlign: 'center',
      padding: '32px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      width: '240px',
    }}>
      <h2>Counter</h2>
      <p style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: isNegative ? 'crimson' : 'seagreen',
        margin: '16px 0',
      }}>
        {count}
      </p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button onClick={() => setCount(prev => prev - 1)}>−</button>
        <button onClick={() => setCount(0)}>Reset</button>
        <button onClick={() => setCount(prev => prev + 1)}>+</button>
      </div>
    </div>
  );
}

export default Counter;
```

**What to point out to students:**
- `prev => prev + 1` — functional update pattern
- `isNegative` — deriving a value from state (no extra state needed)
- The color change happens automatically on every re-render

---

### Component 2 — Toggle (Show/Hide)

A button that shows and hides a block of content.

```jsx
// src/components/Toggle.jsx
import { useState } from 'react';

function Toggle() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{
      padding: '32px',
      border: '1px solid #ddd',
      borderRadius: '12px',
      width: '240px',
    }}>
      <h2>Toggle Panel</h2>

      <button
        onClick={() => setIsVisible(prev => !prev)}
        style={{
          background: isVisible ? '#e74c3c' : '#2ecc71',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {isVisible ? 'Hide' : 'Show'} Content
      </button>

      {isVisible && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: '#f0f4ff',
          borderRadius: '8px',
        }}>
          <p>🎉 You revealed the hidden content!</p>
          <p>This appears and disappears based on state.</p>
        </div>
      )}
    </div>
  );
}

export default Toggle;
```

**What to point out to students:**
- `!prev` — toggling a boolean the clean way
- `{isVisible && <div>...</div>}` — conditional rendering with `&&`
- Button label and color also change based on state — one state drives multiple UI changes

---

### App.jsx — Render Both

```jsx
// src/App.jsx
import Counter from './components/Counter';
import Toggle from './components/Toggle';

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Day 3 — State Practice</h1>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginTop: '24px' }}>
        <Counter />
        <Toggle />
      </div>
    </div>
  );
}

export default App;
```

---

## ✅ Day 3 Checklist
- [ ] Understand why regular variables don't work for dynamic UI
- [ ] Can declare state with `useState` and destructure correctly
- [ ] Know when to use functional updates (`prev => prev + 1`)
- [ ] Never mutate state directly — always use the setter
- [ ] Understand what triggers a re-render
- [ ] Know that each component instance has its own isolated state
- [ ] Built the Counter and Toggle components

## 💡 Homework
1. Add a **step size** feature to the Counter — a second piece of state (`step`) that starts at `1`. Add `+` and `−` buttons to change the step, and make the counter increment/decrement by that step value instead of always by 1.
2. Extend the Toggle to support **three panels** — each with its own independent `isVisible` state. Notice how each one works independently.
3. **Bonus:** Build a `ColorPicker` component with three buttons (Red, Green, Blue) that changes the background color of a box using state.
