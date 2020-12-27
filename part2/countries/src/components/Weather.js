import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherDisplay from './WeatherDisplay'

const Weather = ({ country, api_key }) => {
    const [weather, setWeather] = useState({})
    const [hasInfo, setHasInfo] = useState(false)
    const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`

    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            setWeather(response.data)
            console.log(response)
            setHasInfo(true)
        })
    }, [1])
    
    console.log(`weather is ${weather}`)
    return (
        <div>
            <h2>Weather in {country.name}</h2>
            {hasInfo && <WeatherDisplay weather={weather} />}
        </div>
    )
}



export default Weather