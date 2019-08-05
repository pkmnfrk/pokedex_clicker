import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as serviceWorker from './serviceWorker';
import reducer from './reducers';
import DynamicApp from './components/DynamicApp';


const store = createStore(reducer);

if(localStorage.pokeClicker) {
    store.dispatch({
        type: "load",
        data: localStorage.pokeClicker
    });
    store.dispatch({
        type: "save"
    });
}

ReactDOM.render(<Provider store={store}>
    <DynamicApp />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
