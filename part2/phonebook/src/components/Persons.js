import React from 'react'

const Persons = ({ person, handleDeleteButton }) => {
    return (
        <p>{person.name} {person.number} {' '}<button onClick={handleDeleteButton}>delete</button></p>
    )
}

export default Persons