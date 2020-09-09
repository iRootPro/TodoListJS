import {EditableSpan} from "./EditableSpan";
import {Meta} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'TodoList/EditableSpanStories',
    component: EditableSpan
} as Meta

const callback = action('Save new Title')

export const EditableSpanStories = (props: any) => {
    return <EditableSpan title={'Title'} saveNewTitle={callback}/>
}