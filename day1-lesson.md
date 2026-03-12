# Day 1 — Introduction to React

---

## 1. What is React and Why Use It?

React is a **JavaScript library** built by Facebook (Meta) in 2013 for building user interfaces — specifically, the *view* layer of an application.

### The Problem React Solves
Before React, building dynamic UIs with vanilla JS meant manually updating the DOM every time data changed. This got messy fast:

```js
// Vanilla JS — you manage every update yourself
const btn = document.getElementById("btn");
const count = document.getElementById("count");
let num = 0;

btn.addEventListener("click", () => {
  num++;
  count.innerText = num; // you have to remember to do this
});
```

With React, you just describe **what the UI should look like** based on data, and React handles the DOM updates automatically.

```jsx
// React — UI is a function of state
const [count, setCount] = useState(0);
return <button onClick={() => setCount(count + 1)}>{count}</button>;
```

### Why React?
| Reason | Explanation |
|---|---|
| **Component-based** | Build small, reusable pieces (components) and compose them into large UIs |
| **Declarative** | Describe *what* you want, not *how* to update the DOM |
| **Huge ecosystem** | Massive community, libraries, and job market |
| **One-way data flow** | Makes apps predictable and easier to debug |
| **Virtual DOM** | React updates only what changed — fast and efficient |

---

## 2. Setting Up with Vite

**Vite** is a modern build tool — much faster than the older Create React App (CRA). Always use Vite for new projects.

### Steps

```bash
# 1. Create a new project
npm create vite@latest my-first-app

# When prompted:
# > Framework: React
# > Variant: JavaScript

# 2. Move into the project folder
cd my-first-app

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open your browser at `http://localhost:5173` — you should see the default Vite + React page.

---

## 3. Understanding the Project Structure

```
my-first-app/
├── node_modules/       # installed packages (never touch this)
├── public/             # static files (favicon, images)
├── src/                # ← YOUR CODE LIVES HERE
│   ├── assets/         # images, fonts, etc.
│   ├── App.jsx         # root component
│   └── main.jsx        # entry point — mounts React to the HTML
├── index.html          # the single HTML file of the whole app
├── package.json        # project config and dependencies
└── vite.config.js      # Vite configuration
```

### The Two Most Important Files

**`main.jsx`** — This is where React "starts". It grabs the `<div id="root">` from `index.html` and renders your app into it.

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**`App.jsx`** — The root component. Everything you build goes inside here (or into components that App uses).

```jsx
// src/App.jsx
function App() {
  return <h1>Hello from App!</h1>
}

export default App
```

---

## 4. JSX Syntax

JSX stands for **JavaScript XML**. It lets you write HTML-like syntax directly inside JavaScript. It is **not** HTML — it gets compiled to regular JavaScript by Vite/Babel behind the scenes.

```jsx
// What you write (JSX)
const element = <h1 className="title">Hello World</h1>;

// What it actually becomes (compiled JS)
const element = React.createElement("h1", { className: "title" }, "Hello World");
```

You never have to write `React.createElement` yourself — JSX handles it. But it's good to know what's happening under the hood.

### JSX vs HTML — Key Differences

| HTML | JSX | Why? |
|---|---|---|
| `class="title"` | `className="title"` | `class` is a reserved word in JS |
| `for="input"` | `htmlFor="input"` | `for` is also reserved in JS |
| `<br>` | `<br />` | JSX tags must be self-closing |
| `<img>` | `<img />` | Same — every tag must close |
| inline style: `style="color:red"` | `style={{ color: 'red' }}` | Styles are JS objects in JSX |
| `<!-- comment -->` | `{/* comment */}` | Comments use JS syntax |

### Embedding JavaScript in JSX
Use **curly braces `{}`** to drop any JavaScript expression into JSX:

```jsx
const name = "Ada";
const age = 25;

return (
  <div>
    <h1>Hello, {name}!</h1>
    <p>She is {age} years old.</p>
    <p>Next year she'll be {age + 1}.</p>
    <p>Name in uppercase: {name.toUpperCase()}</p>
  </div>
);
```

### JSX Rules to Remember
1. **A component must return a single root element.** Wrap multiple elements in a `<div>` or a Fragment `<>...</>`.
2. **All tags must be closed.** `<input />`, `<br />`, `<img />`.
3. **Use `className` not `class`.**
4. **Expressions only inside `{}`** — you can't write `if` statements, but ternaries and `&&` work fine.

```jsx
// ✅ Valid
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// ❌ Invalid — two root elements with no wrapper
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);
```

---

## 5. Practice — "Hello World" Component

### Goal
Create a custom `Greeting` component and render it inside `App`.

### Step 1 — Create the component file
Create a new file: `src/components/Greeting.jsx`

```jsx
// src/components/Greeting.jsx

function Greeting() {
  const name = "Ada";
  const subject = "React";
  const year = new Date().getFullYear();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hello, {name}! 👋</h1>
      <p>Welcome to <strong>{subject}</strong>.</p>
      <p>Let's build something great in {year}.</p>
    </div>
  );
}

export default Greeting;
```

### Step 2 — Use it in App.jsx
```jsx
// src/App.jsx
import Greeting from './components/Greeting';

function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}

export default App;
```

### Step 3 — Run it
```bash
npm run dev
```
You should see your greeting rendered in the browser.

---

## ✅ Day 1 Checklist
- [ ] Can explain what React is and the problem it solves
- [ ] Created a Vite React project and ran it locally
- [ ] Know what `main.jsx` and `App.jsx` do
- [ ] Understand the difference between JSX and HTML
- [ ] Created and rendered a custom component

## 💡 Homework
Modify the `Greeting` component to:
1. Display your own name
2. Show today's date using `new Date().toLocaleDateString()`
3. Add a second component called `Footer` that displays "Made with React ❤️" and render it in `App.jsx`
