import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";
import App from "../app/App";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App/>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
