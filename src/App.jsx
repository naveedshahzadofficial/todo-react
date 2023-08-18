import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    loadTodos();
  }, []);
  const loadTodos = () => {
    setTodos([
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        completed: true,
      },
      {
        userId: 1,
        id: 3,
        title: "fugiat veniam minus",
        completed: false,
      },
    ]);
  };

  const addTodo = (title) => {
    const newTodos = [
      ...todos,
      {
        title,
        completed: false,
        user_id: 1,
        id: Math.floor(Math.random() * 10),
      },
    ];
    setTodos(newTodos);
  };

  const markTodo = (id) => {
    const newTodos = [...todos];
    const newTodo = newTodos.find((todo) => todo.id === id);
    newTodo.completed = !newTodo.completed;
    setTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <>
      <div className="container">
        <h1 className="font-bold text-4xl text-center my-6">Todo List</h1>
        <div className="max-w-screen-sm mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-row"
          >
            <input
              type="text"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white "
              placeholder="Enter your new task..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className="flex-shrink-0 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add
            </button>
          </form>
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
