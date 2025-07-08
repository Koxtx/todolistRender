import React from "react";
import OneTodo from "./OneTodo";
import EditTodo from "./EditTodo";

const Todolist = ({ todolist, deleteTodo, updateTodo }) => {
  return todolist.length ? (
    <ul style={{ width: "700px" }}>
      {todolist.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        ) : (
          <OneTodo
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )
      )}
    </ul>
  ) : (
    <p>pas de todo pour le moment ...</p>
  );
};

export default Todolist;
