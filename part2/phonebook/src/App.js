import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import ErrorNoti from './components/ErrorNoti'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterName, setFilterName ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  } , [])
 
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()) )

  const addPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newPerson.name)
    
    if(found) {
      const result = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`)
      if(result) {
        personService
          .updateNumber(newPerson, found.id)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Added ${returnedPerson.name}`)
          })
          .catch(error => {
            console.log('error occured')
          })

          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        return
      }
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)

        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('error occured')
      })
  }

  const handlePersonChange = (event) => {
    persons.forEach((person) => {

      if (person.name === event.target.value) {
        alert(`${person.name} is already added to phonebook`)
      }
    })

    setNewName(event.target.value)
  }

  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleFilterChange = event => setFilterName(event.target.value)
  const handleDeleteButton = (person, id) => {
    const result = window.confirm(`Delete ${person.name} ?`)
    if(result) {
      personService
        .remove(person, id)
        .then(setPersons(persons.filter((p) => p.id !== id)))
        .catch(error => {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} />
      <ErrorNoti errorMessage={errorMessage} />
      <Filter value={filterName} onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm onSubmit = {addPerson} nameValue={newName} numberValue={newNumber} 
        onNameChange={handlePersonChange} onNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      {personsToShow.map((person) => 
        <Persons
          key={person.id} 
          person={person}
          handleDeleteButton={() => handleDeleteButton(person, person.id)}
        />
      )}
    </div>
  )
}

export default App