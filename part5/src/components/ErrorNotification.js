import React from 'react'

const ErrorNotification = ({ errMsg }) => {
    if (errMsg=== null) {
        return null;
    }

    return (
        <div className="error-msg">
            {errMsg}
        </div>
    )
}



export default ErrorNotification