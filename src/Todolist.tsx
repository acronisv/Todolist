import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (text: string) => void
}

type filteredValueType = "Active" | "Completed" | "All"

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    const [text, setText] = useState('')

    const [filter, setFilter] = useState<filteredValueType>("All")

    let colander = props.tasks

    if (filter === "Active") {
        colander = props.tasks.filter(el => !el.isDone)
    }
    if (filter === "Completed") {
        colander = props.tasks.filter(el => el.isDone)
    }

    const filterTasks = (filteredValue: filteredValueType) => {
        setFilter(filteredValue)
    }

    const onClickButtonHandler = () => {
        props.addTask(text)
        setText('')
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const onKeyPressInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickButtonHandler()
        }
    }

    const allChangeFilterHandler = (filterValue: filteredValueType) => {
        filterTasks(filterValue)
    }

    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={text} onChange={onChangeInputHandler} onKeyPress={onKeyPressInputHandler}/>
                {/*<button onClick={onClickButtonHandler}>+</button>*/}
                <Button callback={onClickButtonHandler} name={"+"}/>
            </div>
            <ul>
                {colander.map((el, index) => {
                        return (
                            <li key={index}>
                                <button onClick={() => removeTaskHandler(el.id)}>X</button>
                                <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <Button callback={() => allChangeFilterHandler('All')} name={"All"}/>
                <Button callback={() => allChangeFilterHandler('Active')} name={"Active"}/>
                <Button callback={() => allChangeFilterHandler('Completed')} name={"Completed"}/>
                {/*<button onClick={() => allChangeFilterHandler('All')}>All</button>*/}
                {/*<button onClick={() => allChangeFilterHandler('Active')}>Active</button>*/}
                {/*<button onClick={() => allChangeFilterHandler('Completed')}>Completed</button>*/}
            </div>
        </div>
    );
}