import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from 'redux';
import reduxLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import Stopwatch from "./components/Stopwatch";
import { initialState, rootSaga, stopWatchReducer } from "./store";

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = createStore(stopWatchReducer, initialState, applyMiddleware(sagaMiddleware, reduxLogger));
const store = Object.assign({}, createStoreWithMiddleware, { runSaga: sagaMiddleware.run });

store.runSaga(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h1>React</h1>
            <Stopwatch  />
        </div>
    </Provider>,
  document.getElementById('react')
);
