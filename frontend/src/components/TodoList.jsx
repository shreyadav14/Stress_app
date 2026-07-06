import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { getTodos, saveTodos } from "./todoStorage";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const persist = (next) => {
    setTodos(next);
    saveTodos(next);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const next = [...todos, { id: Date.now(), text: text.trim(), done: false }];
    persist(next);
    setText("");
  };

  const toggleTodo = (id) => {
    const next = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    persist(next);
  };

  const deleteTodo = (id) => {
    persist(todos.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="relax-panel">
      <form className="relax-todo-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add a task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" aria-label="Add task">
          <FaPlus />
        </button>
      </form>

      {todos.length === 0 ? (
        <p className="relax-empty">Nothing here yet — add your first task.</p>
      ) : (
        <>
          <ul className="relax-todo-list">
            {todos.map((t) => (
              <li key={t.id} className={t.done ? "relax-todo-done" : ""}>
                <label>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => toggleTodo(t.id)}
                  />
                  <span>{t.text}</span>
                </label>
                <button
                  className="relax-todo-delete"
                  onClick={() => deleteTodo(t.id)}
                  aria-label="Delete task"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <p className="relax-todo-count">{remaining} task{remaining !== 1 ? "s" : ""} remaining</p>
        </>
      )}
    </div>
  );
}