import React from "react";
import './Button.sass'

export default props => {

    const cls = [
        'Button',
        props.type
    ]

    return(
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}