import Country from "./Country";
import { useState } from "react";

const Content = ({countries}) => {

    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleShowDetails = (country) => {
      setSelectedCountry(country);
    };

    if (!countries || countries.length === 0) {
        return <p>No countries found</p>;
    }
    else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    else if (countries.length > 2 && countries.length < 10) {
        return (
            <div>
            <ul>
              {countries.map((country) => 
      
                <li key={country.cca3}> {country.name.common}
                  <button onClick={() => handleShowDetails(country)}>show</button>
                </li>
              )}
            </ul>
            {selectedCountry && <Country country={selectedCountry} />}
          </div>
        )
    }

    else {
        return(
        <Country country={countries[0]}/>
        )
      }
}

export default Content