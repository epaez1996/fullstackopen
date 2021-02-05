import React, { useState } from 'react'

const Toggable = (props) => {
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisible = { display: visibility ? 'hide' : ''}
    const showWhenVisible = { display: visibility ? '' : 'hide'}

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Toggable