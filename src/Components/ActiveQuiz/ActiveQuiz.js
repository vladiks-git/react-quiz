import React from "react";
import './ActiveQuiz.sass'
import AnswersList from "./AnswersList/AnswersList";

export default props => {
    return(
        <div className={'ActiveQuiz'}>
            <p className={'Question'}>
                <span>
                    <strong>1.</strong>&nbsp;
                    {props.question}
                </span>
                <small>{props.answerNubmer}/{props.quizLength}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    )
}