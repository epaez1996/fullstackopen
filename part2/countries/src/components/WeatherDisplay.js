import React from 'react'

const WeatherDisplay = ({ weather }) => {
    return (
        <div>
            <p><b>temperature: </b> {weather.current.temperature}</p>
            <img src={weather.current.weather_icons} />
            <p><b>wind: </b> {`${weather.current.wind_degree} mph direction ${weather.current.wind_dir}`}</p>
        </div>
    )
}

export default WeatherDisplay