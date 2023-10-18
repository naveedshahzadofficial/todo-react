import { useEffect, useState } from "react";
import FormTodo from "./FormTodo";

function App() {
  let BASE_URL = "http://127.0.0.1:8000";
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    loadTodos();
  }, []);
  const loadTodos = async () => {
    try {
      const resp = await fetch(BASE_URL + "/todos");
      const data = await resp.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (title) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, completed: false }),
    };

    try {
      const resp = await fetch(BASE_URL + "/todos/", options);
      const todo = await resp.json();
      setTodos([...todos, todo]);
    } catch (error) {
      console.log(error);
    }
  };

  const markTodo = async (id) => {
    const newTodos = [...todos];
    const newTodo = newTodos.find((todo) => todo.id === id);
    newTodo.completed = !newTodo.completed;
    setTodos(newTodos);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    };

    try {
      const resp = await fetch(BASE_URL + "/todos/" + id, options);
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    /* setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    ); */
  };

  const removeTodo = async (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const resp = await fetch(BASE_URL + "/todos/" + id, options);
      const data = await resp.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="font-bold text-4xl text-center my-6">Todo List</h1>
        <div className="max-w-screen-sm mx-auto">
          <FormTodo addTodo={addTodo} />

          <div className="mt-4">
            {todos.map((todo) => (
              <div
                className="flex mb-4 items-center"
                key={todo.id}
              >
                <p
                  className={`w-full ${
                    todo.completed
                      ? "line-through text-green-600"
                      : "text-grey-darkest"
                  }`}
                >
                  {todo.title}
                </p>

                <button
                  onClick={() => markTodo(todo.id)}
                  className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white ${
                    todo.completed
                      ? "text-green-600 border-green-600 hover:bg-green-600"
                      : "text-gray-400 border-gray-400 hover:bg-gray-400"
                  }`}
                >
                  {todo.completed ? "Done" : "Not Done"}
                </button>

                <button
                  onClick={() => removeTodo(todo.id)}
                  className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
