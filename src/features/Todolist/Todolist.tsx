import React, {ChangeEvent, FC, useCallback, useEffect} from 'react';
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {BackspaceOutlined, DeleteForeverOutlined} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../app/store";

import {
    changeTaskTitleTC,
    createTaskTC,
    deleteTaskTC,
    getTasksTC,
    updateTaskStatusTC
} from "../../reducers/tasks-reducer";
import {
    changeTodolistFilterAC, deleteTodoTC,
    TodolistDomainType, updateTodoTitleTC
} from "../../reducers/todolists-reducer";
import {FilterValuesType} from "../../app/App";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

type TodoListPropsType = {
    todolist: TodolistDomainType
}


const Todolist: FC<TodoListPropsType> = React.memo((props) => {
    // console.log('Todolist')
    let {id, title, filter} = props.todolist
    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useAppDispatch()
    if (filter === "active") {
        tasks = tasks.filter(t => !t.status);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status);
    }

    const tasksItems = tasks?.length

        ? tasks.map((task: TaskType) => {
            return <Task key={task.id} task={task} id={id}/>
        })
        : <span>TaskList is empty</span>

    const addTask = useCallback((title: string) => {
        dispatch(createTaskTC(id, title))
    }, [dispatch])

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const changeTodoListTitle = useCallback((title: string) => {
        dispatch(updateTodoTitleTC(id, title))
    }, [dispatch])

    useEffect(()=>{
        dispatch(getTasksTC(id))
    },[])

    return (
        <div>
            <h2>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size='small'
                    onClick={() => dispatch(deleteTodoTC(id))}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </h2>
            <AddItemForm addItem={addTask} errorColor={"hotpink"}/>
            <List>
                {tasksItems}
            </List>
            <div>
                <ButtonGroup
                    variant='contained'
                    size='small'
                    disableElevation>
                    <Button
                        color={filter === "all" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
});

export default Todolist;

type TaskPropsType = {
    task: TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    let {task, id} = props
    const dispatch = useAppDispatch()
    const changeTaskStatus = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatusTC(id, task.id, e.currentTarget.checked? TaskStatuses.Completed : TaskStatuses.New))
    },[id, task.id])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleTC(id, task.id, title))
    }, [dispatch])
    const removeTask = () => {
        dispatch(deleteTaskTC(id, task.id))
    }
    return (
        <ListItem key={task.id} className={task.status ? "isDone" : ""}>
            <Checkbox
                onChange={changeTaskStatus}
                checked={task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
            <IconButton size='small' onClick={removeTask}>
                <BackspaceOutlined/>
            </IconButton>
        </ListItem>
    )
})