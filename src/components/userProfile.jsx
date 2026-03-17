
import { useParams, Link } from "react-router-dom";

const users = [
  { id: 1, name: 'Ada Lovelace',  role: 'Engineer' },
  { id: 2, name: 'Alan Turing',   role: 'Mathematician' },
  { id: 3, name: 'Grace Hopper',  role: 'Admiral & Developer' },
];


export function UserProfile(){
    const {id} = useParams();

   const user = users.find(u => u.id === Number(id));

  if (!user) return <p>User not found! <Link to="/users">Go back</Link></p>;

    return(
        <>
       <h1>Name {user.name}</h1>
       <h2>Role {user.role}</h2>
        </>
    )
}