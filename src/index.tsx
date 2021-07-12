import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {store} from './redux/state';


export let rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <React.StrictMode>
                <App
                    dispatch={store.dispatch.bind(store)}
                    state={store.getState()}/>
            </React.StrictMode>
        </BrowserRouter>,
        document.getElementById('root')
    );
};

rerenderEntireTree();

store.subscriber(rerenderEntireTree)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

