import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [editTodo, setEditTodo] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const editHandler = (index) => {
    setIsEditing(true);
    setCurrentTodo({ ...todos[index], index });
    setEditTodo(todos[index].text);
  };

  const updateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === currentTodo.index ? { ...todo, text: editTodo } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTodo({});
    setEditTodo('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">To-Do List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        {isEditing && (
          <div className="flex mb-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              placeholder="Edit task"
            />
            <button
              className="ml-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              onClick={updateTodo}
            >
              Update
            </button>
          </div>
        )}
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-4 rounded-lg shadow-sm transition duration-300 ease-in-out transform ${
                todo.completed ? 'bg-gray-200 line-through' : 'bg-gray-100'
              }`}
            >
              <span
                className={`flex-1 cursor-pointer ${todo.completed ? 'text-gray-500' : 'text-gray-800'}`}
                onClick={() => toggleTodo(index)}
              >
                {todo.text}
              </span>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onClick={() => editHandler(index)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
