import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {AddBox} from "@material-ui/icons";

type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [itemName, setItemName] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    let onItemNameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setItemName(e.currentTarget.value)
        setError(null)
    }

    let onAddItemNameKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) addItem()
    }

    let addItem = () => {
        if (itemName.trim()) {
            props.addItem(itemName.trim())
            setItemName('')
        } else {
            setError('Title is required!')
        }
    }

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                value={itemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemNameKeyPressed}
                error={!!error}
                label={'Title'}
                helperText={error}
            />

            <IconButton color={'primary'} onClick={addItem}><AddBox/></IconButton>
        </div>
    )
}