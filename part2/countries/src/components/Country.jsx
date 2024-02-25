import { useState, useEffect } from "react"
import axios from 'axios'
import { Card, CardContent, Typography } from "@mui/material"
import './Country.css'

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
            <Card variant="outlined" sx={{ maxWidth: "95%", backgroundColor: 'transparent', borderColor:'white' }}>
            <CardContent className="country-color">
            <div className="header-country">            
            <Typography id='country-name' variant="h4">{country.name.common} </Typography> 
            <div style={{ fontSize: '3em' }}>
                {country.flag}
            </div>
            </div>
            <div className="other-information">
            <box className='box-capital'>
                <p>Capital</p>
                <p>{country.capital}</p>
            </box>
            <box className='box-population'> 
            <p>Population</p> 
            <p>{country.population}</p>
            </box>
            <box className='box-languages'>
            <p>Languages</p>
                {Object.keys(country.languages).map(language => (
                    <p key={language}>{country.languages[language]} </p>
                ))}

            </box>
            </div>
           
            </CardContent>
            </Card>
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