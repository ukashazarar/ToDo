import { useEffect, useState } from 'react';
import todoLogo from './assets/todo.png';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import './App.css';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // to track editing

  // ✅ Load todos from localStorage on page load
  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);
  // ✅ Save todos to localStorage when todos array changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addHandler = () => {
    if (todo.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex] = { todo };
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { todo }]);
    }
    setTodo('');
  };

  const editHandler = (index) => {
    setTodo(todos[index].todo);
    setEditIndex(index);
  };

  const deleteHandler = (index) => {
    const updated = todos.filter((_, idx) => idx !== index);
    setTodos(updated);
  };

  const changeHandler = (e) => {
    setTodo(e.target.value);
  };

  const changeBoxHandler = (e, idx) => {
    // Optional: you can toggle a done state or strike-through
    const updated = [...todos];
    updated[idx].done = !updated[idx].done;
    setTodos(updated);
  };

  return (
    <>
      <div className="logo bg-green-100 flex justify-center h-15 items-center">
        <img className="w-40 h-40" src={todoLogo} alt="Todo Logo" />
      </div>

      <div className="w-full min-h-[89.5vh] bg-green-50">
        <div className="flex justify-center items-center">
          <input
            className="w-96 bg-green-300 p-3 m-5 rounded-4xl"
            type="text"
            onChange={changeHandler}
            value={todo}
            name="name"
            placeholder="What do you want to do today?"
          />
          <button
            className="bg-blue-400 p-3 hover:cursor-pointer rounded-2xl"
            onClick={addHandler}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="todos bg-green-300 w-[80vw] min-h-[50vh] m-auto rounded-3xl p-3">
          {todos.map((item, idx) => (
            <div className="flex items-center justify-between m-2" key={idx}>
              <div className="flex gap-3 items-center">
                <input
                  onChange={(e) => changeBoxHandler(e, idx)}
                  className="w-4 h-4 border"
                  checked={item.done || false}
                  type="checkbox"
                />
                <div className={`todo ${item.done ? 'line-through' : ''}`}>
                  {item.todo}
                </div>
              </div>
              <div className="flex flex-row mx-1 gap-1.5">
                <button
                  className="hover:cursor-pointer mx-1.5 p-1.5 bg-blue-400  rounded-lg"
                  onClick={() => editHandler(idx)}
                >
                  <FaRegEdit />
                </button>
                <button
                  className="hover:cursor-pointer mx-1.5 p-1.5 bg-blue-400  rounded-lg"
                  onClick={() => deleteHandler(idx)}
                >
                  <MdDeleteForever />
                </button>
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
