import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
            <input className={error ? 'error' : ''}
                   type={'text'}
                   value={itemName}
                   onChange={onItemNameChanged}
                   onKeyPress={onAddItemNameKeyPressed}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}