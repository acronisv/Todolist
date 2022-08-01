import React from "react";

type ButtonPropsType = {
    callback: () => void
    name: string
}
export const Button = (props: ButtonPropsType) => {
    const onClickButtonHandler = () => {
        props.callback()
    }

    return (
        <button onClick={onClickButtonHandler}>{props.name}</button>
    )
}