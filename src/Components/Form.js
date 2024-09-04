import { useState } from "react";

export default function Form(props) {

    const [name, setName] = useState("");

    function handleChange(event) {
        setName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addTask(name);
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>
                <label htmlFor="new-todo" className="input-label">
                    What needs to be done?
                </label>
            </h2>
            <input type="text"
                id="new-todo"
                onChange={handleChange}
                value={name} />
            <button type="submit" className="add-button">Add</button>
        </form>
    );
}