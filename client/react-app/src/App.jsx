/*import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("/api/todos");
      const todos = await res.json();

      setMessage(todos.mssg);
    };

    getTodos();
  }, [])

  return (
    <main className="container">
      <h1>Awesome Todos</h1>
      {message && <p>{message}</p>}
    </main>
  );
}
*/
import { useEffect, useState } from "react";
import Todo from "./todo";
export default function App() {
const [todos, setTodos] = useState([]);
const [content, setContent] = useState("");
const createNewTodo = async (e) => {
    e.preventDefault();
    if (content.length > 3) {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ todo: content }),  
        headers: {
          "Content-Type": "application/json",
        },
      });
      const newTodo = await res.json();

			setContent("");
      setTodos([...todos, newTodo])
    }
  };

  // Fetch existing todos on page load
useEffect(() => {
    async function getTodos() {
        const res = await fetch("/api/todos");
        const todos = await res.json();
        setTodos(todos);
    }
    getTodos();
}, []); // Empty dependency array means this runs once on mount

  return (
    <main className="container">
      <h1 className="title">Awesome Todos</h1>
      <form className="form" onSubmit={createNewTodo}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter a new todo..."
          className="form__input"
          required 
        />
        <button type="submit">Create Todo</button>
      </form>

      <div className="todos">
        {(todos.length > 0) &&
          todos.map((todo) => (
            <Todo todo={todo} setTodos={setTodos} key={todo._id} />
          ))
        }
      </div>

    </main>
  );
}