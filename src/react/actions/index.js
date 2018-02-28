export const SET_ACTIVE = 'SET_ACTIVE';
export const INCREMENT_TIME = 'INCREMENT_TIME';
export const RESET_TIME = 'RESET_TIME';
export const ADD_PREVIOUS_TIME = 'ADD_PREVIOUS_TIME';


export function setActive(boolean) {
    return {
        type: SET_ACTIVE,
        payload: boolean
    };
}


export const incrementTime = () => ({
    type: INCREMENT_TIME
});

export const resetTime = () => ({
    type: RESET_TIME
});


export function addPreviousTime(time) {
    return {
        type: ADD_PREVIOUS_TIME,
        payload: time
    };
}
