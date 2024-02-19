import Country from "./Country";

const Content = ({countries}) => {

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
      
                <li key={country.cca3}> {country.name.common} </li>
      
              )}
            </ul>
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