import React from "react";
import './AnswersList.sass'
import AnswerItem from "./AnswerItem/AnswerItem";

export default props => {
    return(
        <ul className={'AnswersList'}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        answer={answer}
                        key={index}
                        onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id] : null}
                    />
                )
            })}
        </ul>
    )
}