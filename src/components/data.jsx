import {useState} from "react"
import DeleteData from "./delete";

export function Data() {

    const[items, setItems] = useState(["Ade", "Sade", "Kola"]);

    function handleDelete(itemToRemove) {
       setItems(items.filter(item => item !== itemToRemove));
    }

    return (
        <div>
           {items.map((item, index) => (
            <div>
                <li key={index}>{item}</li> <DeleteData onDelete={() => handleDelete(item)} />
            </div>
           ))}
        </div>
    )
}
