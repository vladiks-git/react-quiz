import React from 'react'
import './Input.sass'

export default props => {


    function isInvalid({valid, touched, shouldValidate}) {
        return !valid && shouldValidate && touched
    }

    const inputType = props.type || 'text'
    const cls = ['Input']
    const htmlFor = `${inputType} - ${Math.random()}`

    if(isInvalid(props)){
        cls.push('Invalid')
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) ? <small>{props.errorMessage || 'Error'}</small> : null}
        </div>
    )
}