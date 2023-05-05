import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./state/store";
import {createRoot} from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement as HTMLElement)

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
