# Day 7 — useEffect Hook

---

## 1. What is a Side Effect?

When your component does something **outside of just showing content on screen**, that's a side effect.

Think of it this way:

> A component's main job is to **display things**.
> A side effect is anything **extra** it does on the side.

### Real Life Analogy 🍕
Imagine a chef (your component). Their main job is to cook food (return JSX).
A side effect is when the chef also:
- Answers the phone (fetch data from internet)
- Sets a kitchen timer (start a timer)
- Writes on a whiteboard (update the page title)

These are all "extra" tasks happening on the side.

### Examples of Side Effects in React

```jsx
// Fetching data from the internet
fetch('https://api.example.com/users')

// Changing the browser tab title
document.title = 'Hello!'

// Starting a timer
setInterval(() => { console.log('tick') }, 1000)

// Listening to keyboard presses
window.addEventListener('keydown', handleKey)
```

### Why Can't We Just Write Them Normally?

```jsx
// ❌ PROBLEM — this runs on every render and causes an infinite loop!
function App() {
  const [name, setName] = useState('');

  fetch('/api/name')                    // 1. fetches data
    .then(r => r.json())
    .then(data => setName(data.name));  // 2. setName causes a re-render
                                        // 3. re-render runs fetch again → 💥 loop!
  return <h1>{name}</h1>;
}
```

React re-renders components often. If we put side effects directly in the component, they run every single time — causing bugs and infinite loops.

`useEffect` gives side effects a **safe place to live** so they only run when we want them to.

---

## 2. useEffect — Basic Syntax

```jsx
import { useEffect } from 'react';

useEffect(() => {
  // write your side effect here
});
```

That's it! Let's see a simple example:

```jsx
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // This runs after every render
  useEffect(() => {
    document.title = 'Count is ' + count;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  );
}
```

Every time you click the button → count updates → component re-renders → `useEffect` runs → browser tab title updates. ✅

---

## 3. The Dependency Array — Controlling When it Runs

Right now the effect runs after **every** render. But often you want more control.

Add a second argument — the **dependency array** — to control when the effect runs.

```jsx
useEffect(() => {
  // your effect
}, [/* dependencies go here */]);
```

### There are only 3 options:

---

### Option 1 — No array → runs after every render

```jsx
useEffect(() => {
  console.log('I run after every render!');
});
```

```
User opens page   → effect runs ✅
User clicks button → effect runs ✅
User types something → effect runs ✅
```

---

### Option 2 — Empty array `[]` → runs ONCE when page first loads

```jsx
useEffect(() => {
  console.log('I only run once when the page loads!');
}, []);
```

```
User opens page   → effect runs ✅
User clicks button → effect does NOT run ❌
User types something → effect does NOT run ❌
```

This is perfect for fetching data when a page loads — you only need to fetch once.

---

### Option 3 — Array with values → runs when those values change

```jsx
const [username, setUsername] = useState('Ada');

useEffect(() => {
  console.log('Username changed to:', username);
}, [username]); // only runs when `username` changes
```

```
Page loads             → effect runs ✅ (first time)
username changes       → effect runs ✅
something else changes → effect does NOT run ❌
```

---

### Easy Comparison Table

| What do you want? | What to write |
|---|---|
| Run once on page load | `useEffect(() => { ... }, [])` |
| Run when a value changes | `useEffect(() => { ... }, [value])` |
| Run after every render | `useEffect(() => { ... })` |

---

## 4. Simple Examples for Each Option

### Example 1 — Show a welcome message once (empty array)

```jsx
function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage('Welcome! The page has loaded 🎉');
  }, []); // runs once

  return <h2>{message}</h2>;
}
```

---

### Example 2 — Update tab title when count changes (with value)

```jsx
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'You clicked ' + count + ' times';
  }, [count]); // only runs when count changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

---

### Example 3 — Watch a name input (with value)

```jsx
function App() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (name !== '') {
      setGreeting('Hello, ' + name + '! 👋');
    } else {
      setGreeting('');
    }
  }, [name]); // runs every time name changes

  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Type your name..."
      />
      <p>{greeting}</p>
    </div>
  );
}
```

---

## 5. Cleanup Functions — Tidying Up After Yourself

Some effects need to be **turned off** when we are done with them.

### Real Life Analogy 🔦
When you leave a room, you turn off the light.
When the component is done, you turn off the effect.

The most common example is a **timer**. If you start a timer and never stop it, it keeps running forever in the background — even after the component is gone. That's a **memory leak**.

### How to Write a Cleanup

Return a function from your effect:

```jsx
useEffect(() => {
  // START something
  const timerId = setInterval(() => {
    console.log('tick!');
  }, 1000);

  // STOP it when done (cleanup)
  return () => {
    clearInterval(timerId);
    console.log('Timer stopped! 🛑');
  };
}, []);
```

The cleanup function runs:
1. When the component **disappears** from the screen
2. Before the effect **runs again** (if dependencies changed)

### Simple Timer Example

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start counting
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Stop counting when component is removed
    return () => clearInterval(id);
  }, []); // start once


  useEffect(() => {
    document.title = "Seconds " + sec
  }, []);

  return <h2>⏱ {seconds} seconds have passed</h2>;
}
```

---

## 6. Practice — Live Clock Component

### What We're Building
A clock that:
- Shows the current time and updates every second ⏰
- Shows today's date 📅
- Has a button to switch between 12-hour and 24-hour format
- Updates the browser tab title with the current time

### File Structure
```
src/
├── components/
│   └── Clock.jsx
└── App.jsx
```

---

### Step 1 — Start Simple: A Clock That Ticks

```jsx
// src/components/Clock.jsx
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date()); // get the current time
    }, 1000);

    // Cleanup: stop the timer when component is removed
    return () => clearInterval(id);
  }, []); // [] = start the timer only once

  return (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <h1 style={{ fontSize: '48px' }}>
        {time.toLocaleTimeString()}
      </h1>
    </div>
  );
}

export default Clock;
```

Run this first. The students should see a live ticking clock. Then build on it step by step.

---

### Step 2 — Add the Date

```jsx
<h1 style={{ fontSize: '48px' }}>
  {time.toLocaleTimeString()}
</h1>

{/* Add this below the time */}
<p style={{ color: '#888', fontSize: '18px' }}>
  {time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}
</p>
```

---

### Step 3 — Add 12h / 24h Toggle

```jsx
function Clock() {
  const [time, setTime]     = useState(new Date());
  const [use24h, setUse24h] = useState(false); // false = 12-hour by default

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Format time based on toggle
  const displayTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  });

  return (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <h1 style={{ fontSize: '48px' }}>{displayTime}</h1>
      <p style={{ color: '#888', fontSize: '18px' }}>
        {time.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric',
          month: 'long',  day: 'numeric',
        })}
      </p>
      <button onClick={() => setUse24h(v => !v)}>
        Switch to {use24h ? '12-hour' : '24-hour'}
      </button>
    </div>
  );
}
```

---

### Step 4 — Add the Tab Title Effect

```jsx
// Add this second useEffect — updates the browser tab title
useEffect(() => {
  document.title = '🕐 ' + displayTime;
}, [displayTime]); // runs every time displayTime changes
```

---

### Full Final Clock.jsx

```jsx
// src/components/Clock.jsx
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime]     = useState(new Date());
  const [use24h, setUse24h] = useState(false);

  // Effect 1: tick every second
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id); // stop timer on unmount
  }, []);

  const displayTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: !use24h,
  });

  // Effect 2: update tab title when time changes
  useEffect(() => {
    document.title = '🕐 ' + displayTime;
    return () => { document.title = 'React App'; }; // restore on unmount
  }, [displayTime]);

  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 32px',
      background: '#0f172a',
      color: 'white',
      borderRadius: '16px',
      width: '320px',
      margin: '0 auto',
    }}>
      <p style={{ color: '#94a3b8', margin: '0 0 8px' }}>
        {time.toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric',
          month: 'long',  day: 'numeric',
        })}
      </p>

      <h1 style={{ fontSize: '48px', margin: '8px 0 24px', letterSpacing: '2px' }}>
        {displayTime}
      </h1>

      <button
        onClick={() => setUse24h(v => !v)}
        style={{
          background: '#4f46e5',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '999px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Switch to {use24h ? '12-hour' : '24-hour'}
      </button>
    </div>
  );
}

export default Clock;
```

---

### App.jsx — With Mount/Unmount Button

```jsx
// src/App.jsx
import { useState } from 'react';
import Clock from './components/Clock';

function App() {
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Day 7 — useEffect Practice</h1>
      <button onClick={() => setShow(v => !v)} style={{ marginBottom: '24px' }}>
        {show ? 'Hide Clock' : 'Show Clock'}
      </button>

      {/* When clock hides → cleanup runs → timer stops → tab title resets */}
      {show && <Clock />}
    </div>
  );
}

export default App;
```

> **Show students:** Click "Hide Clock" and watch the browser tab title go back to "React App". That's the cleanup function running! Add `console.log('cleanup!')` inside the cleanup to make it even more visible.

---

## ✅ Day 7 Checklist
- [ ] Can explain what a side effect is in simple words
- [ ] Know the 3 modes of the dependency array
- [ ] Can write `useEffect` that runs once with `[]`
- [ ] Can write `useEffect` that watches a value
- [ ] Can write a cleanup function with `return () => {}`
- [ ] Know why we need cleanup (prevent memory leaks)
- [ ] Built the live clock step by step

## 💡 Homework
1. Add a **background color** that changes based on the time of day — blue for morning (6am–12pm), orange for afternoon (12pm–6pm), dark navy for evening (6pm–6am). Use `useEffect` to update it.
2. Add a **"Pause / Resume"** button to the clock that stops and starts the ticking.
3. **Bonus:** Build a simple **countdown timer** — user types in a number of seconds, hits Start, and it counts down to 0 then shows "Time's up! 🎉". Uses `useEffect` for the interval and cleanup to stop it at 0.
