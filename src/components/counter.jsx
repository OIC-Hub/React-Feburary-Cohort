import { useState } from "react";

export default function Counter() {
  const [counter, setcounter] = useState(0);

  const [items, setitems] = useState(["Kola", "Goodnew", "Sade"]);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");

  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Score: {counter}</h1>

      <button onClick={() => setcounter(counter - 1)}>Decrease</button>
      <button onClick={() => setcounter(0)}>Reset</button>
      <br />
      <br />

      <div>
        <p>{counter}</p>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button
          onClick={() => {
            setitems([...items, inputValue]);
            setcounter(counter + 1);
          }}
        >
          Add Item
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <input
        type="text"
        value={name} // controlled by state
        onChange={(e) => setName(e.target.value)} // updates state on every keystroke
        placeholder="Type your name..."
      />
      <p>Hello, {name}!</p>

      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="lagos">Lagos</option>
        <option value="abuja">Abuja</option>
        <option value="Port Harcourt">Port Harcourt</option>
      </select>

      <p>You selected: {city}</p>
    </div>
  );
}
