import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBoxOutlined} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    errorColor: string
    disabled?: boolean
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    // console.log('Add item form')
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddItem = (e: { key: string }) => e.key === "Enter" && onClickAddItem()
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <TextField
                variant='outlined'
                size='small'
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddItem}
                label='Title'
                error={error}
                helperText={error && 'Title is required!'}
                disabled={props.disabled}
            />
            <IconButton size='small' onClick={onClickAddItem} disabled={props.disabled}>
                <AddBoxOutlined fontSize='large'/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;