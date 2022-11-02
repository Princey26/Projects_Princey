import { useState } from "react";
import "./Search.css";

export default function Search(props) {

    const [input , setInput] = useState("");

    const submitEvent = (e) =>{
        e.preventDefault();
        props.handleSearch(input)
        setInput("")
    }
    return (
        <>
            <div className="align-items-center change__position__search">
                <form onSubmit={submitEvent}>
                    <input
                        type="text"
                        placeholder="Enter Auther Name , book Name etc.." name="firstName"
                        value={input}
                        className="input"
                        onChange={(event) =>{setInput(event.target.value)}}
                    />
                    <button className="button" type="submit">Search</button>
                </form>
            </div>
        </>
    )
}