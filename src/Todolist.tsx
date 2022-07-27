import React, {useState} from "react";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId:number)=>void
    // filterTasks: (buttonName:string)=>void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {

    const [filter, setFilter] = useState("All")

    let colander = props.tasks

    if (filter === "Active") {
        colander = props.tasks.filter(el => !el.isDone)
    }
    if (filter === "Completed") {
        colander = props.tasks.filter(el => el.isDone)
    }

    const filterTasks = (filteredValue: string) => {
        setFilter(filteredValue)
        console.log(filteredValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {colander.map((el,index) => {
                        return (
                            <li key={index}>
                                <button onClick={()=>props.removeTask(el.id)}>X</button>
                                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <button onClick={()=>{filterTasks("All")}}>All</button>
                <button onClick={()=>{filterTasks("Active")}}>Active</button>
                <button onClick={()=>{filterTasks("Completed")}}>Completed</button>
            </div>
        </div>
    )
}