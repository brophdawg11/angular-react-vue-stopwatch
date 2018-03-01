import {
    SET_ACTIVE,
    INCREMENT_TIME,
    ADD_PREVIOUS_TIME,
    RESET_TIME
} from '../actions'

const stopWatchReducer = (state = {}, action) => {
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

export default stopWatchReducer
