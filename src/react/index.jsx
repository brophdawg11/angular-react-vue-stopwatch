import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Stopwatch from "./components/Stopwatch";
import { initialState, stopWatchReducer } from "./store"

const store = createStore(stopWatchReducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h1>React</h1>
            <Stopwatch  />
        </div>
    </Provider>,
  document.getElementById('react')
);
