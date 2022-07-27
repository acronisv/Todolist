import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "RestAPI", isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks = tasks.filter((el, index) => el.id !== taskId))
        console.log(tasks)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      // filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
