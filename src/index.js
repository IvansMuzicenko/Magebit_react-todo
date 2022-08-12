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
    for (let task of this.props.tasks) {
      undoneTasks.push(
        <div key={task.id} className="undone">
          <button onClick={this.props.setReady(task.id)}>Check</button>
          {/* <button onClick={this.props.remove(task.id)}>Delete</button> */}
          <p> {task.title}</p>
        </div>
      );
    }
    return undoneTasks;
  }
}

class Done extends React.Component {
  render() {
    let doneTasks = [];
    for (let task of this.props.tasks) {
      doneTasks.push(
        <div key={task.id} className="done">
          <button onClick={this.props.setReady(task.id)}>Check</button>
          {/* <button onClick={this.props.remove(task.id)}>Delete</button> */}
          <p> {task.title}</p>
        </div>
      );
    }
    return doneTasks;
  }
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  addTodo() {
    const that = this;
    return function () {
      let tasks = JSON.parse(JSON.stringify(that.state.tasks));
      const value = document.querySelector(".todo-input").value;
      const newTodo = {
        title: value,
        status: false,
        id: generateId()
      };

      tasks.push(newTodo);

      that.setState({ tasks: tasks });
    };
  }
  setReady(id) {
    let tasks = JSON.parse(JSON.stringify(this.state.tasks)); //error
    let taskIndex = tasks.findIndex((el) => el.id === id);
    console.log(taskIndex);
    tasks[taskIndex].status = true;
    this.setState({ tasks: tasks });
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
        <div className="undone">
          <Undone setReady={this.setReady} tasks={undoneTasks} />
        </div>
        <div className="done">
          <Done tasks={doneTasks} />
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
