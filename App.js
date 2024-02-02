import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoTitle.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        title: newTodoTitle,
        description: newTodoDescription,
        status: 'Todo', // Default status set to "Todo"
        createDate: new Date().toLocaleString(),
        completedDate: null,
      };

      setTodos([...todos, newTodoItem]);
      setNewTodoTitle('');
      setNewTodoDescription('');
    }
  };

  const changeTodoStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
          ...todo,
          status: newStatus,
          completedDate: newStatus === 'Done' ? new Date().toLocaleString() : null,
        }
        : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filterByStatus = (status) => todos.filter((todo) => todo.status === status);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={addTodo}>
        Add Todo
      </button>

      <div className="row mt-4">
        <div className="col-md-4">
          <h3 className="text-center">Todo</h3>
          {filterByStatus('Todo').map((todo) => renderTodoCard(todo, 'orange'))}
        </div>
        <div className="col-md-4">
          <h3 className="text-center">In Progress</h3>
          {filterByStatus('In Progress').map((todo) => renderTodoCard(todo, 'blue'))}
        </div>
        <div className="col-md-4">
          <h3 className="text-center">Done</h3>
          {filterByStatus('Done').map((todo) => renderTodoCard(todo, 'green'))}
        </div>
      </div>
    </div>
  );

  function renderTodoCard(todo, bgColor) {
    const cardStyle = {
      backgroundColor: `${getBgColor(bgColor)}`,
    };

    return (
      <div key={todo.id} className="card mb-3" style={cardStyle}>
        <div className="card-body">
          <h5 className="card-title">Title:</h5>
          <p className="card-text">
            <strong>{todo.title}</strong>
          </p>
          <h5 className="card-title">Description:</h5>
          <p className="card-text">
            <strong>{todo.description}</strong>
          </p>
          <h5 className="card-title">Status:</h5>
          <p className="card-text">
            <strong>{todo.status}</strong>
          </p>
          <h5 className="card-title">Created:</h5>
          <p className="card-text">
            <strong>{todo.createDate}</strong>
          </p>
          {todo.status === 'Done' && (
            <>
              <h5 className="card-title">Completed:</h5>
              <p className="card-text">
                <strong>{todo.completedDate}</strong>
              </p>
            </>
          )}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-danger"
              onClick={() => removeTodo(todo.id)}
            >
              Remove
            </button>
            {todo.status !== 'Todo' && (
              <button
                className="btn btn-secondary"
                onClick={() => changeTodoStatus(todo.id, 'Todo')}
              >
                Todo
              </button>
            )}
            {todo.status !== 'In Progress' && (
              <button
                className="btn btn-secondary"
                onClick={() => changeTodoStatus(todo.id, 'In Progress')}
              >
                In Progress
              </button>
            )}
            {todo.status !== 'Done' && (
              <button
                className="btn btn-secondary"
                onClick={() => changeTodoStatus(todo.id, 'Done')}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Function to convert hex color to RGB
  function getBgColor(color) {
    if (color == 'green') {
      return 'rgba(0,255,0,0.2)';
    }
    if (color == 'orange') {
      return 'rgba(254,100,46,0.2)';
    }
    if (color == 'blue') {
      return 'rgba(0,0,255,0.2)';
    }
  }
};

export default TodoApp;
