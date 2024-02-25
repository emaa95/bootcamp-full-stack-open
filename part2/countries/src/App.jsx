import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
import {Card, CardContent, TextField, Typography} from '@mui/material'

import './App.css'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
function App() {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([]) 

  useEffect(() => {
    console.log('effect');
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled');
        setCountries(response.data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []); 

  useEffect(() => {
    handleFilterChange({ target: { value: '' } }); // Pasamos un valor vacío inicialmente
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    
    const country = filteredCountries.find(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );
  
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer._leaflet_id = null; // Destruye el mapa existente
    }
  
    const map = L.map('map').setView([0, 0], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    if (country) {
      L.marker([country.latlng[0], country.latlng[1]]).addTo(map);
      map.setView([country.latlng[0], country.latlng[1]], 5);
      console.log("country:", country);
    }
  }

  const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

  return (
  <div className='root'>
  <div style={{ display: 'flex' }}>
    <div style={{ flex: '1' }}>
      <Card variant="outlined" sx={{ maxWidth: "95%", backgroundColor: 'transparent', borderColor:'white' }}>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', alignItems: 'center'}}>
      <Typography variant='h2' color={'white'} style={{ marginRight: '50px', marginBottom: '20px' }}>
        Find countries
      </Typography>
      <div className="loader">
        <div className="loaderMiniContainer">
        <div className="barContainer">
          <span className="bar"></span>
          <span className="bar bar2"></span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 101 114"
          className="svgIcon"
        >
        <circle
          strokeWidth="7"
          stroke="black"
          transform="rotate(36.0692 46.1726 46.1727)"
          r="29.5497"
          cy="46.1727"
          cx="46.1726"
        ></circle>
        <line
          strokeWidth="7"
          stroke="black"
          y2="111.784"
          x2="97.7088"
          y1="67.7837"
          x1="61.7089"
        ></line>
      </svg>
    </div>
  </div>
  </div>
        <TextField 
          id="outlined-basic" 
          label="Search..." 
          variant="outlined" 
          size='small' 
          value={filter} 
          onChange={handleFilterChange} 
          className="white-textfield" 
        /> 
      </CardContent>
      </Card>
      <Content countries={filteredCountries}></Content>
      
    </div>
      <div id="map" style={{ flex: '1', height: '400px' }}></div>
    </div>
  </div>
  )
}

export default App
