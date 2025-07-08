import React from "react";

function OneTodo({ todo, deleteTodo, updateTodo }) {
  async function updateOneTodo(newTodo) {
    console.log(newTodo);
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

  async function handleDeleteTodo() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/todos/delete/${todo._id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        deleteTodo(todo._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <li className="mb-10 p-10 d-flex center">
      <span className="flex-fill mr-15">
        {todo.content} {todo.done ? "( 🗸 )" : ""}
      </span>
      <button
        onClick={() =>
          updateOneTodo({
            ...todo,
            done: !todo.done,
          })
        }
        className="btn btn-primary mr-15"
      >
        Valider
      </button>
      <button
        onClick={() =>
          updateOneTodo({
            ...todo,
            edit: !todo.edit,
          })
        }
        className="btn btn-primary mr-15"
      >
        Modifier
      </button>
      <button onClick={handleDeleteTodo} className="btn btn-primary mr-15">
        Supprimer
      </button>
    </li>
  );
}

export default OneTodo;
