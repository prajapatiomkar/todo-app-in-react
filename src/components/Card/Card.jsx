import React from 'react'
import "./Card.css"
export default function Card(props) {
    function handleChange(event) {
        event.preventDefault()
    }
    const styled = {
        textDecoration: props.status ? "line-through" : ""
    }
    return (
        <div className='todo-lists'>
            <p style={styled} className="task">{props.task}</p>
            <div className='buttons'>
                <form onSubmit={handleChange}>
                    <button onClick={() => props.done(props.id)}>Done</button>
                    <button onClick={() => props.undo(props.id)}>Undo</button>
                    <button onClick={() => props.deleteOne(props.id)}>Delete</button>
                </form>
            </div>

        </div>
    )
}
