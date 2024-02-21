import { useState, useEffect } from "react"
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => { 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`).then(response =>{
        const apiResponse = response.data;
        console.log(apiResponse)
        setWeather(apiResponse)
      })
      
    }, [country.capital])
    
    if (weather) {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>languages</h3>
            <ul>
                {Object.keys(country.languages).map(language => (
                    <li key={language}>{country.languages[language]} </li>
                ))}
            </ul>
            {country.flag}
            {weather && ( 
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>temperature: {weather.main && weather.main.temp}° Celcius</p>
                    {weather.weather && weather.weather[0] && (
                        <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
                    )}
                    <p>wind: {weather.wind && weather.wind.speed} mph direction {weather.wind && weather.wind.deg}</p>
                </div>
            )}
        </div>
    )
    } else {
        return(
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>languages</h3>
            <ul>
                {Object.keys(country.languages).map(language => (
                    <li key={language}>{country.languages[language]} </li>
                ))}
            </ul>
            {country.flag}
        </div>
        )
    }
}

export default Country