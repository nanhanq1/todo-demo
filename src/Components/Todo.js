import { useState } from "react"

export default function Todo(props) {

    const [isEditing, setIsEditing] = useState(false);

    const [newName, setNewName] = useState(props.name);

    function handleChange(event) {
        setNewName(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setIsEditing(false);
    }
    const editingTemplate = (
        <li>
            <form className="stack-small" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="todo-label" htmlFor={props.id}>
                        New name for {props.name}
                    </label>
                    <input id={props.id}
                        className="todo-text"
                        type="text"
                        onChange={handleChange} />
                </div>
                <div className="btn-group">
                    <button type="button"
                        className="btn todo-cancel"
                        onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                    <button type="submit"
                        className="btn btn__primary todo-edit">
                        Save
                    </button>
                </div>
            </form>
        </li>
    )
    const viewTemplate = (
        <li>
            <div>
                <input type="checkbox"
                    id={props.id}
                    className="task-checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label htmlFor={props.id}>{props.name}</label>
            </div>
            <div>
                <button type="button"
                    className="edit-button"
                    onClick={() => setIsEditing(true)} >
                    Edit
                </button>
                <button type="button"
                    className="delete-button"
                    onClick={() => props.deleteTask(props.id)}>
                    Delete
                </button>
            </div>
        </li>
    )
    return (isEditing ? editingTemplate : viewTemplate)

}