import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./styles.css";

import generateId from "./helpers.js";

// import App from "./App";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

class Undone extends React.Component {
  render() {
    let undoneTasks = [];
    const setDone = this.props.setDone;
    const removeItem = this.props.removeItem;
    for (let task of this.props.tasks) {
      undoneTasks.push(
        <div key={task.id} className="undone">
          <div className="item">
            <p className="undone"> {task.title}</p>
            <div>
              <button onClick={() => setDone(task.id)}>Check</button>
              <button onClick={() => removeItem(task.id)}>Remove</button>
            </div>
          </div>
          <hr />
        </div>
      );
    }
    return undoneTasks;
  }
}

class Done extends React.Component {
  render() {
    let doneTasks = [];
    const setUndone = this.props.setUndone;
    const removeItem = this.props.removeItem;
    for (let task of this.props.tasks) {
      doneTasks.push(
        <div key={task.id}>
          <div className="item">
            <p className="done"> {task.title}</p>
            <div>
              <button onClick={() => setUndone(task.id)}>Uncheck</button>
              <button onClick={() => removeItem(task.id)}>Remove</button>
            </div>
          </div>
          <hr />
        </div>
      );
    }
    return doneTasks;
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.setDone = this.setDone.bind(this);
    this.setUndone = this.setUndone.bind(this);
    this.removeItem = this.removeItem.bind(this);
    const storage = localStorage.getItem("tasks");
    console.log(storage);

    if (storage) {
      this.state = {
        tasks: JSON.parse(storage),
      };
    } else {
      this.state = {
        tasks: [],
      };
    }
  }

  saveChanges(tasks) {
    this.setState({ tasks: tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addTodo() {
    const that = this;
    return function () {
      let tasks = JSON.parse(JSON.stringify(that.state.tasks));
      const value = document.querySelector(".todo-input").value;
      const newTodo = {
        title: value,
        status: false,
        id: generateId(),
      };

      tasks.push(newTodo);

      that.saveChanges(tasks);
    };
  }
  setDone(id) {
    let tasks = JSON.parse(JSON.stringify(this.state.tasks));
    let taskIndex = tasks.findIndex((el) => el.id === id);
    tasks[taskIndex].status = true;
    this.saveChanges(tasks);
  }
  setUndone(id) {
    let tasks = JSON.parse(JSON.stringify(this.state.tasks));
    let taskIndex = tasks.findIndex((el) => el.id === id);
    tasks[taskIndex].status = false;
    this.saveChanges(tasks);
  }
  removeItem(id) {
    let tasks = JSON.parse(JSON.stringify(this.state.tasks));
    let taskIndex = tasks.findIndex((el) => el.id === id);
    tasks.splice(taskIndex, 1);
    this.saveChanges(tasks);
  }

  render() {
    const undoneTasks = this.state.tasks.filter((el) => !el.status);
    const doneTasks = this.state.tasks.filter((el) => el.status);
    return (
      <div className="wrapper">
        <h1>Todo</h1>
        <div className="actions">
          <input className="todo-input" type="text" />
          <button onClick={this.addTodo()}>Add</button>
        </div>
        <div>
          <h2>Undone tasks</h2>
          <hr />
          <Undone
            setDone={this.setDone}
            removeItem={this.removeItem}
            tasks={undoneTasks}
          />
        </div>
        <div>
          <h2>Done tasks</h2>
          <hr />
          <Done
            setUndone={this.setUndone}
            removeItem={this.removeItem}
            tasks={doneTasks}
          />
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
