import Country from "./Country";
import { useState } from "react";
import './Content.css'
import { Button, Typography } from "@mui/material";
import Weather from "./Weather";

const Content = ({countries}) => {

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleShowDetails = (country) => {
      setSelectedCountry(country);
    };

    if (!countries || countries.length === 0) {
        return <Typography variant="h4" style={{marginTop:"10px", color:"white"}}>No countries found</Typography>
    }
    else if (countries.length > 10) {
        return <Typography variant="h4" style={{marginTop:"10px", color:"white"}}>Too many matches, specify another filter</Typography>
    }
    else if (countries.length > 2 && countries.length < 10) {
        return (
            <div>
            <div className="content-container">
            <ul>
              {countries.map((country) => 
                <li key={country.cca3}> 
                  <div className="country-header">
                  <Typography variant="h4" style={{marginRight:"10px"}}>{country.name.common}</Typography>
                  <Button variant="outlined" onClick={() => handleShowDetails(country)}>show</Button>
                  </div>
                </li>
              )}
            </ul>
            </div>
            {selectedCountry && (
              <div className="selected-country">
                <Country country={selectedCountry} />
                <Weather country={selectedCountry} />
              </div>
            )}

          
          </div>
        )
    }

    else {
        return(
        <div>
        <Country country={countries[0]}/>
        <Weather country={countries[0]}/>
        </div>
        )
      }
}

export default Content