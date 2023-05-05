import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "../TodolistWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {TaskType} from "../api/todolist-api";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const TaskCopy = () => {
    const task = useSelector<AppRootState, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} id={'todolistId1'}/>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskCopy/>;

export const TaskStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

