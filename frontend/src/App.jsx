import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/Todolist";
import { url } from "./url";

function App() {
  // variable d'état pour stocker nos todos initialisée avec un tableau vide
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(`${url}api/todos`);
        if (response.ok) {
          const todos = await response.json();
          setTodolist(todos);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getTodos();
  }, []);

  // fonction pour ajout de todo
  function addTodo(todo) {
    setTodolist([...todolist, todo]);
  }

  // fonction pour supprimer une todo
  function deleteTodo(id) {
    setTodolist(todolist.filter((todo) => todo._id !== id));
  }

  // méthode pour modifier une todo
  function updateTodo(newTodo) {
    setTodolist(todolist.map((t) => (t._id === newTodo._id ? newTodo : t)));
  }

  return (
    <div className="d-flex center" style={{ minHeight: "100vh" }}>
      <div className="card p-20">
        <h1 className="mb-20">Todo List</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todolist={todolist}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </div>
  );
}

export default App;
