import React, { useState } from "react";
import { createRef } from "react";

export default function AddTodo({ addTodo }) {
  // variable d'état pour stocker la saisie de l'inout initialisée avec une chaine de caractère vide
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  async function createTodo() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/todos/addTodo", {
        method: "POST",
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const todo = await response.json();
        addTodo(todo);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setValue("");
  }

  function handleClick() {
    if (value.length) {
      createTodo();
    }
  }
  function handleKeyDown(e) {
    if (value.length && e.code === "Enter") {
      createTodo();
    }
  }
  return (
    <div className="d-flex center mb-20">
      <input
        value={value}
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Add a todo ..."
        className="flex-fill mr-15"
      />
      <button onClick={handleClick} className="btn btn-primary">
        Add
      </button>
      {loading && <p>Chargement en cours ...</p>}
    </div>
  );
}
