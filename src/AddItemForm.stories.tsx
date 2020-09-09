import {Meta} from "@storybook/react/types-6-0";
import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/AddItemFormStories',
    component: AddItemForm,
} as Meta;

const callback = action("Button clicked")

export const AddItemFormStories = (props: any) => {
    return <AddItemForm addItem={callback}/>
}