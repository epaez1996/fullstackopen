import React from 'react'

const ErrorNoti = ({ errorMessage }) => {
    if(errorMessage === null) {
        return null
    }

    return (
        <div className="error">
            {errorMessage}
        </div>
    )
}



export default ErrorNoti