import React, {Component} from 'react'
import './Quiz.sass'
import ActiveQuiz from "../../Components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../Components/FinishedQuiz/FinishedQuiz";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick} from '../../store/actions/quizActions'

class Quiz extends Component {


    onAnswerClickHandler = (id) => {
        this.props.quizAnswerClick(id)
}

    async componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'Wrapper'}>
                    <h1>test</h1>
                    {
                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            :
                        this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            :
                            <ActiveQuiz
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNubmer={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        isFinished: state.quizReducer.isFinished,
        results: state.quizReducer.results,
        activeQuestion: state.quizReducer.activeQuestion,
        answerState: state.quizReducer.answerState,
        quiz: state.quizReducer.quiz,
        loading: state.quizReducer.loading
    }
}
function mapDispatchToProps(dispatch) {
    return{
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)