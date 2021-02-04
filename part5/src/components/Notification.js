import React from 'react'

const Notification = ({ successMessage }) => {
    if (successMessage === null) {
        return null
    }

    return (
        <div className="success-msg">
            { successMessage }
        </div>
    )
}

export default Notification