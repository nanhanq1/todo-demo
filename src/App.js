import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import Todo from './Components/Todo';
import Form from './Components/Form';
import FilterButton from './Components/FilterButton';
import { nanoid } from "nanoid";
import OpenAI from "openai";


const tasks = [
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Reapeat", completed: false },
  { id: "todo-3", name: "Rep", completed: false }
];

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App() {

  const [newTasks, setTasks] = useState(tasks);

  const [filter, setFilter] = useState("All");

  let [editCount, setEditCount] = useState(0);

  const openai = new OpenAI({
    organization: "org-6f5f7TozKODWGZnODQOEb3ja",
    project: "$PROJECT_ID",
  });

  useEffect(() => {
    fetch("http://localhost:8080/todo/all")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      })
  }, [editCount])//当数组中为空时 只有开始加载界面的时候执行一次

  function toggleTaskCompleted(id) {
    const updatedTask = newTasks.filter((task) => task.id == id)[0];
    fetch("http://localhost:8080/todo/update?id=" + id + "&completed=" + !updatedTask.completed, { method: "POST" }).then(
      (res) => {
        console.log(res.text());
        setEditCount(++editCount);
      })
  }

  function deleteTask(id) {
    fetch("http://localhost:8080/todo/delete?id=" + id, { method: "POST" }).then(
      (res) => {
        console.log(res.text());
        setEditCount(++editCount);
      }
    )
  }

  function editTask(id, newName) {
    fetch("http://localhost:8080/todo/edit?id=" + id + "&newName=" + newName, { method: "POST" }).then(
      (res) => {
        console.log(res.text());
        setEditCount(++editCount);
      }
    )
  }

  const num = newTasks.filter(FILTER_MAP[filter]).length;

  const taskList = newTasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => {
      return <Todo
        name={task.name}
        completed={task.completed}
        id={task.id}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        isEditing={false} />
    });

  const filterList = FILTER_NAMES.map((name) =>
    <FilterButton
      name={name}
      key={name}
      setFilter={setFilter} />
  );

  function addTask(name) {
    //fetch 向后端发送请求  返回一个promise和repsonse response传入res
    fetch("http://localhost:8080/todo/add?name=" + name + "&completed=false", { method: "POST" }).then(
      (res) => {
        console.log(res.text());
        setEditCount(++editCount);
      })
  }


  return (
    <div className="todo-app">
      <h1>TodoMatic</h1>
      <div>
        <Form addTask={addTask} />
      </div>
      <div className="filters">
        {filterList}
      </div>
      <h2 className="task-count">{num} tasks remaining</h2>
      <ul className="task-list">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
