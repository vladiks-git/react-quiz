import {CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: []
}

export default function createReducer(state = initialState, actions) {
    switch (actions.type) {
        case CREATE_QUIZ_ACTION:
            return {
                ...state,
                quiz: [...state, actions.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                ...state,
                quiz: []
            }
        default:
            return{
                ...state
            }
    }
}