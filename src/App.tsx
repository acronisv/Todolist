import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


function App() {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "RestAPI", isDone: false},
    ])


    const removeTask = (taskId: string) => {
        setTasks(tasks = tasks.filter((el, index) => el.id !== taskId))
        console.log(tasks)
    }

    const addTask = (text: string) => {
        const newTask = {id: v1(), title: text, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeIsDone = (taskId: string, isDoneValue: boolean) => {
        // let currentTask = tasks.find((el)=>el.id===taskId)
        // if(currentTask) {
        //     currentTask.isDone=isDoneValue
        //     setTasks([...tasks])
        // }

        setTasks(tasks.map(el=>el.id===taskId? {...el,isDone: isDoneValue} : el))
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
