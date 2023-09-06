import PropTypes from "prop-types";
import { useState } from "react";

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
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
  );
}

FormTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default FormTodo;
