import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import styles from "./Todolist.module.css"

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (text: string) => void
    changeIsDone: (id: string, event: boolean) => void
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

    const [error, setError] = useState<null | string>(null)

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
        if (text.trim() !== '') {
            props.addTask(text.trim())
            setText('')
        } else {
            setError("Title is required")
        }
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
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
                <input value={text}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressInputHandler}
                       className={error ? styles.error : ''}
                />
                <Button callback={onClickButtonHandler} name={"+"}/>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <ul>
                {colander.map((el, index) => {
                        const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(el.id, event.currentTarget.checked)
                        }
                        return (
                            <li className={el.isDone ? styles.inactive: ''} key={index}>
                                <button onClick={() => removeTaskHandler(el.id)}>X</button>
                                <input onChange={changeIsDoneHandler} type="checkbox" checked={el.isDone}/>
                                <span>{el.title}</span>
                            </li>
                        )
                    }
                )}
            </ul>

            <div>
                <Button callback={() => allChangeFilterHandler('All')} name={"All"} status={filter}/>
                <Button callback={() => allChangeFilterHandler('Active')} name={"Active"} status={filter}/>
                <Button callback={() => allChangeFilterHandler('Completed')} name={"Completed"} status={filter}/>
                {/*<button className={filter==='All' ? styles.activeFilter : ''} onClick={() => allChangeFilterHandler('All')}>All</button>*/}
                {/*<button className={filter==='Active' ? styles.activeFilter : ''} onClick={() => allChangeFilterHandler('Active')}>Active</button>*/}
                {/*<button className={filter==='Completed' ? styles.activeFilter : ''} onClick={() => allChangeFilterHandler('Completed')}>Completed</button>*/}
            </div>
        </div>
    );
}