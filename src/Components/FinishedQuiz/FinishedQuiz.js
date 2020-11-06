import React from "react";
import './FinishedQuiz.sass'
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";

export default props => {
    let rightAnswerCounter = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success')
            total ++
        return total
    },0)
    return(
        <div className={'finishedQuiz'}>
            <ul>

                {props.quiz.map((quizItem,index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check'
                    ]
                    return(
                        <li key={index}>
                            <strong>{index+1}</strong>. &nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>Правильно {rightAnswerCounter}/{props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type={'primary'}>Повторить</Button>
                <Link to={'/'}>
                    <Button onClick={props.onRetry} type={'success'}>Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    )
}