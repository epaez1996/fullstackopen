import React from 'react'
import Weather from './Weather'
const Country = ({country, api_key}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>languages</h2>
            <ul>
                {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
            </ul>
            <img src={country.flag} width={150} height={150} alt={'flag of country'}/>
            <Weather country={country} api_key={api_key} />
        </div>
    )
}

export default Country