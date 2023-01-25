import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const {id, task, completed, priority } = todo;

    const handleTodoClick = () =>{
        toggleTodo(id);
    };

    return <li>
        <input type="checkbox" checked={completed} onChange= {handleTodoClick} />
        <label></label>
        {task}
        <label> (</label>
        {priority}
        <label>)</label>
    </li>;

}
