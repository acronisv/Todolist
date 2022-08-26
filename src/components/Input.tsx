import React, {ChangeEvent} from "react";

type InputPropsType = {
    checked: boolean,
    callback: (checked:boolean)=>void
}

export const Input = (props: InputPropsType) => {

    const inputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        props.callback(event.currentTarget.checked)
    }

    return (
        <input onChange={inputHandler} checked={props.checked} type="checkbox"/>
    )
}