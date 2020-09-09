import AppWithRedux from "./AppWithRedux";
import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";
import {Meta} from "@storybook/react";

export default {
    title: 'TodoList/AppWithReduxStories',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

export const AppWithReduxStories = () => {
    return (<AppWithRedux/>)
}