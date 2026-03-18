import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

export function PageNavigate(){
    const Navigate = useNavigate();

    // function handleSubmit(){
    //     // e.preventDefault();
    //      Navigate("/users")
    // }

    return(
        <div>
            <button className="border-2" onClick={() => Navigate(-1)}><IoIosArrowBack/></button>
        </div>
    )
}