import { delay } from 'redux-saga'
import { put, cancel, all, fork, take, takeEvery } from 'redux-saga/effects';

// Dispatchable actions
const SET_ACTIVE = 'SET_ACTIVE';
const SET_INACTIVE = 'SET_INACTIVE';
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';
const ADD_PREVIOUS_TIME = 'ADD_PREVIOUS_TIME';

export const setActive = () => ({
  type: SET_ACTIVE,
});

export const setInactive = () => ({
  type: SET_INACTIVE,
});

export const incrementTime = () => ({
  type: INCREMENT_TIME
});

export const resetTime = (time) => ({
  type: RESET_TIME,
  payload: time
});

export const addPreviousTime = (time) => ({
  type: ADD_PREVIOUS_TIME,
  payload: time
});

// Initial State
export const initialState = {
    active: false,
    time: 0.00,
    previousTimes: []
};

// Sagas
function* tick() {
  while(true) {
    yield delay(10);
    yield put(incrementTime());
  }
}

function* watchTimerActivity() {
  while(yield take('SET_ACTIVE')) {
    const bgSyncTask = yield fork(tick)
    yield take('SET_INACTIVE');
    yield cancel(bgSyncTask)
  }
}

function* resetTimerSaga(action) {
  yield put(setInactive());
  yield put(addPreviousTime(action.payload));
}

function* watchResetTimer() {
  yield takeEvery(RESET_TIME, resetTimerSaga);
}

export function* rootSaga() {
  yield all([
    watchTimerActivity(),
    watchResetTimer()
  ])
}

// Reducers to synchronously modify the state (immutably)
export const stopWatchReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_ACTIVE:
            return Object.assign({}, state, {
                active: true
            });

        case SET_INACTIVE:
            return Object.assign({}, state, {
                active: false
            });

        case INCREMENT_TIME:
            return Object.assign({}, state, {
                time: state.time + 0.01
            });

        case ADD_PREVIOUS_TIME:
            return Object.assign({}, state, {
                previousTimes: [ ...state.previousTimes, action.payload ],
                time: 0.00
            });
        default:
            return state;
    }
}
