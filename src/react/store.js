// Dispatchable actions
const SET_ACTIVE = 'SET_ACTIVE';
const INCREMENT_TIME = 'INCREMENT_TIME';
const RESET_TIME = 'RESET_TIME';
const ADD_PREVIOUS_TIME = 'ADD_PREVIOUS_TIME';

export const setActive = (isActive) => ({
  type: SET_ACTIVE,
  payload: isActive
});

export const incrementTime = () => ({
  type: INCREMENT_TIME
});

export const resetTime = () => ({
  type: RESET_TIME
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

// Reducers to synchronously modify the state (immutably)
export const stopWatchReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_ACTIVE:
            return Object.assign({}, state, {
                active: action.payload
            });

        case INCREMENT_TIME:
            return Object.assign({}, state, {
                time: state.time + 0.01
            });

        case RESET_TIME:
            return Object.assign({}, state, {
                time: 0.00
            });

        case ADD_PREVIOUS_TIME:
            return Object.assign({}, state, {
                previousTimes: [ ...state.previousTimes, action.payload ]
            });
        default:
            return state;
    }
}
