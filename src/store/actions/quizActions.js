import Axios from "axios";
import {
    FETCH_ONEQUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_SET_STATE
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await Axios.get('https://quiz-8a0d6.firebaseio.com/quiz.json')
            let quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        }catch (e) {
            console.log(e)
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try {
            const response = await Axios.get(`https://quiz-8a0d6.firebaseio.com/quiz/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchOneQuizSuccess(quiz))

        }catch (e) {
            dispatch(fetchQuizesError(e))
        }

    }
}

export function fetchOneQuizSuccess(quiz) {
    return{
        type: FETCH_ONEQUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizesStart() {
    return{
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return{
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return{
        type: QUIZ_SET_STATE,
        answerState,
        results,
    }
}

export function finishQuiz() {
    return{
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return{
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quizReducer

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            dispatch(quizSetState({[answerId]: 'success'}, results))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}