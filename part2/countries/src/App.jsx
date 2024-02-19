import { useState, useEffect } from 'react'
import axios from 'axios'
import Content from './components/Content'
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )

  return (
    <>
      <p>find countries <input value={filter} onChange={handleFilterChange} /></p>
      <Content countries={filteredCountries}></Content>
    </>
  )
}

export default App
