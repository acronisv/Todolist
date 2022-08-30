import React, {FC, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {BackspaceOutlined, DeleteForeverOutlined} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}


const TodoList: FC<TodoListPropsType> = (props) => {
    const tasksItems = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
            }
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListID)
            }
            const removeTask = () => {
                props.removeTask(task.id, props.todoListID)
            }
            return (
                <ListItem key={task.id} className={task.isDone ? "isDone" : ""}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton size='small' onClick={removeTask}>
                        <BackspaceOutlined/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>TaskList is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const onClickSetFilterCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListID)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return (
        <div>
            <Typography variant={'h5'} align={"center"} paragraph={true}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size='small'
                    onClick={() => props.removeTodoList(props.todoListID)}>
                    <DeleteForeverOutlined/>
                </IconButton>
            </Typography>
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
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("all")}
                    >All
                    </Button>
                    <Button
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("active")}
                    >Active
                    </Button>
                    <Button
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={onClickSetFilterCreator("completed")}
                    >Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
};

export default TodoList;