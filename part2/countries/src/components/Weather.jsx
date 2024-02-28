import { useState, useEffect } from "react"
import axios from 'axios'
import { Card, CardContent, Typography } from "@mui/material"
import AirIcon from '@mui/icons-material/Air';
import humidityIcon from '../assets/humidity.png'
import './Weather.css'

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => { 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${import.meta.env.VITE_REACT_APP_API_KEY}&units=metric`).then(response =>{
        const apiResponse = response.data;
        console.log(apiResponse)
        setWeather(apiResponse)
      })
      
    }, [country.capital])

    return (
    <div>
    <Card variant="outlined" sx={{ backgroundColor: 'transparent', borderColor:'white', marginTop:'10px'}}>
    <CardContent>
    {weather && ( 
        <div className='weather-container'>
            <div className="weather-header">
            <Typography variant="h4">Weather in {weather.name} </Typography> 
            <div>
            {weather.weather && weather.weather[0] && (
                <img src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather Icon" />
            )}
            </div>
            </div>
            <div className="weather-information">
            <div className="weather-temperature">
            <Typography id='weather-temperature' variant="h5">Temperature  <ion-icon name="thermometer-outline"></ion-icon></Typography> 
            <p>{weather.main && weather.main.temp}° C</p>
            </div>
            <div className="weather-wind">
            <Typography id='weather-wind' variant="h5">Wind  <AirIcon></AirIcon></Typography> 
            <p>{weather.wind && weather.wind.speed} mph direction {weather.wind && weather.wind.deg}</p>
            </div>
            <div className="weather-humidity">
                <Typography id='weather-humidity' variant="h5">Humidity <img src={humidityIcon} alt="Icono de Humedad" width="20" height="20" style={{ filter: 'invert(100%)' }}></img></Typography>
                
                <p>
                    {weather.main.humidity} %
                </p>
            </div>
            </div>
        </div>
    )}
    </CardContent>
    </Card>
    </div>
    )
}

export default Weather