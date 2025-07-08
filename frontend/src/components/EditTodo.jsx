import React, { useState } from "react";

function EditTodo({ todo, updateTodo }) {
  const [valueTodo, setValueTodo] = useState(todo.content);

  async function editOneTodo(newTodo) {
    try {
      const response = await fetch("http://localhost:5000/api/todos/update", {
        method: "PATCH",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        // const updatedTodo = await response.json();
        // console.log({ updatedTodo });
        updateTodo(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setValueTodo(e.target.value);
  }

  function handleClick() {
    if (valueTodo.length) {
      editOneTodo({
        ...todo,
        content: valueTodo,
        edit: false,
      });
    }
  }
  return (
    <li className="mb-10 p-10 d-flex center">
      <input
        onChange={handleChange}
        value={valueTodo}
        type="text"
        className="flex-fill mr-15"
      />
      <button
        onClick={() => editOneTodo({ ...todo, edit: false })}
        className="btn btn-primary mr-15"
      >
        Annuler
      </button>
      <button onClick={handleClick} className="btn btn-primary mr-15">
        Sauvegarder
      </button>
    </li>
  );
}

export default EditTodo;
