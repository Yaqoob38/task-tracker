import React, { useState } from 'react';
import './DesignCard.css';

const DesignCard = ({ card, onChange, onDelete }) => {
  const [title, setTitle] = useState(card.title);
  const [tasks, setTasks] = useState(card.tasks);
  const [priority, setPriority] = useState(card.priority);
  const [status, setStatus] = useState(card.status);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [people, setPeople] = useState(card.people || []);

  const updateCard = (updatedTasks = tasks, updatedTitle = title, updatedPriority = priority, updatedStatus = status, updatedPeople = people) => {
    onChange({
      title: updatedTitle,
      tasks: updatedTasks,
      priority: updatedPriority,
      status: updatedStatus,
      people: updatedPeople
    });
  };

  const handleCheck = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    updateCard(updated);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...tasks, { name: newTask.trim(), done: false }];
    setTasks(updated);
    setNewTask('');
    updateCard(updated);
  };

  const handleEdit = (index, value) => {
    const updated = [...tasks];
    updated[index].name = value;
    setTasks(updated);
    updateCard(updated);
  };

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
    updateCard(updated);
  };

  const handlePeopleChange = (index, value) => {
    const updated = [...people];
    updated[index] = value;
    setPeople(updated);
    updateCard(tasks, title, priority, status, updated);
  };

  const completedCount = tasks.filter(t => t.done).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="card">
      <div className="card-header">
        <span className="icon">⚙️</span>
        <input
          className="title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateCard(tasks, e.target.value);
          }}
        />
        <div className="menu-wrapper">
          <span className="menu" onClick={() => setMenuOpen(!menuOpen)}>⋯</span>
          {menuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => console.log('Saved:', { title, tasks, priority, status, people })}>💾 Save</button>
              <button onClick={onDelete}>🗑️ Delete</button>
            </div>
          )}
        </div>
      </div>

      <div className="progress-wrapper">
        <span className="progress-count">✔ {completedCount} of {tasks.length}</span>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="percent">{progress}%</span>
      </div>

      <div className="subtask-line">
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li key={index} onClick={() => setEditingIndex(index)}>
              <span className={`circle ${task.done ? 'done' : ''}`} onClick={() => handleCheck(index)}></span>
              <input
                className="task-input"
                value={task.name}
                onChange={(e) => handleEdit(index, e.target.value)}
                onBlur={() => setTimeout(() => setEditingIndex(null), 200)}
              />
              {editingIndex === index && (
                <button className="delete-task" onClick={() => deleteTask(index)}>❌</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-task">
        <input
          type="text"
          placeholder="Add subtask..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="meta-info">
        <div className="meta-pills">
          <span className="meta-label">🚩 Priority</span>
          <select
            className={`pill ${priority.toLowerCase()}`}
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              updateCard(tasks, title, e.target.value);
            }}
          >
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="meta-pills">
          <span className="meta-label">⏳ Status</span>
          <select
            className={`pill ${status.toLowerCase().replace(" ", "-")}`}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              updateCard(tasks, title, priority, e.target.value);
            }}
          >
            <option>In Progress</option>
            <option>Completed</option>
            <option>Paused</option>
          </select>
        </div>
      </div>

      <div className="avatars">
        {people.map((person, index) => (
          <input
            key={index}
            className="avatar editable"
            value={person}
            onChange={(e) => handlePeopleChange(index, e.target.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default DesignCard;
