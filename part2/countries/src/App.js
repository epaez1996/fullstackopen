import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = ({api_key}) => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }

  const handleShowButton = (event) => setFilter(event.target.id)

  const filteredCountries = countries.filter((country) => {
    return country.name.toLowerCase().includes(filter.toLowerCase())
  })

 
  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  } , [])
  
  return (
    <div>
      find countries <input value={filter} onChange={handleFilterInput}/>
      <Countries countries={filteredCountries} onClick={(event) => handleShowButton(event)} api_key={api_key}/>
    </div>
  )
}



export default App;
