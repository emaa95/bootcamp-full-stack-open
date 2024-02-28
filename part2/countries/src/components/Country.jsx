import { Card, CardContent, Typography } from "@mui/material"
import './Country.css'


const Country = ({country}) => {    
    return (
        <div>
            <Card variant="outlined" sx={{ backgroundColor: 'transparent', borderColor:'white', marginTop:'10px'}}>
            <CardContent className="country-color">
            <div className="header-country">            
            <Typography id='country-name' variant="h4">{country.name.common} </Typography> 
            <div style={{ fontSize: '3em' }}>
                {country.flag}
            </div>
            </div>
            <div className="other-information">
                <div className='box-capital'>
                    <Typography id='country-capital' variant="h5">Capital </Typography> 
                    <p>{country.capital}</p>
                </div>
                <div className='box-population'> 
                    <Typography id='country-population' variant="h5">Population </Typography> 
                    <p>{country.population}</p>
                </div>
                <div className='box-languages'>
                    <Typography id='country-languages' variant="h5">Languages </Typography> 
                    {Object.keys(country.languages).map(language => (
                    <p key={language}>{country.languages[language]} </p>
                    ))}

                </div>
            </div>
           
            </CardContent>
            </Card>
            
        </div>
    )
}

export default Country