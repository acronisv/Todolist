import React from "react";
import styles from "./Todolist.module.css"

type ButtonPropsType = {
    callback: () => void
    name: string,
    status?: string
}
export const Button = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.callback()
    }


    let className = props.status===props.name ? styles.activeFilter : ''

    return (
        <button className={className} onClick={onClickButtonHandler}>{props.name}</button>
    )
}