import {useState} from 'react';

export default function Counter() {
    const [counter, setcounter] = useState(0);

    const [items, setitems] = useState(["Kola", "Goodnew", "Sade"]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }



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
                <button onClick={() => {setitems([...items, inputValue]); setcounter(counter + 1);}}>Add Item</button>
            </div>

            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}