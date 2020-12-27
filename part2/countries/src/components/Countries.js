import React from 'react'
import Country from './Country'


const Countries = ({countries, onClick, api_key}) => {
    const oneCountry = countries.length === 1
    const fewCountries = countries.length > 1 && countries.length <= 10
    const countiresExceeded = countries.length > 10
    
    const listOfCountries = countries.map((country) => {
      return (
        <div key ={country.name}>
          <p>{country.name} <button id={country.name}onClick={onClick}>show</button></p>
        </div>
      )
    })

    return (
      <div>
        {countiresExceeded && "Too many matches, specify another filter"}
        {fewCountries && <div>{listOfCountries}</div>}
        {oneCountry && <Country country={countries.pop()} api_key={api_key} />}
      </div>
    )
  }

export default Countries;