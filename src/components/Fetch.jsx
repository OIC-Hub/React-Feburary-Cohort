import axios from "axios"
import { useEffect, useState } from "react"

function Fetch() {
    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(res => {
                setusers(res.data)
                setloading(false);
            })
            .catch(err => {
                seterror(err.message);
                setloading(false);
            })
    }, [])

    if (loading) {
        return <p>Loading users... ⏳</p>;
    }

    return (
        <div>
            <ul>
                {users.map((user) => (
                    <li><img src={user.images} alt="" /> {user.name} <span>{user.email}</span></li>
                ))}
            </ul>
            <p>{error}</p>
        </div>

    )

}

export default Fetch