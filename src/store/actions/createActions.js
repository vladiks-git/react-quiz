import {CREATE_QUIZ_ACTION, RESET_QUIZ_CREATION} from "./actionTypes";
import Axios from "axios";

export function createQuizQuestion(item) {
    return{
        type: CREATE_QUIZ_ACTION,
        item
    }
}

export function resetQuizCreation() {
    return{
        type: RESET_QUIZ_CREATION
    }
}

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        try {
            await Axios.post('https://quiz-8a0d6.firebaseio.com/quiz.json',getState().createReducer.quiz)
            dispatch(resetQuizCreation())
        }catch (e) {
            console.log(e)
        }
    }
}