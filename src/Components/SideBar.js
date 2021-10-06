import React, { useState ,useEffect} from 'react';


const SideBar = ({countries}) => {    

    const [casesByCountry , setCasesByCountries]= useState([]);
    
    const sortCountries = () => {
            const array = countries.sort((a,b) => (a.cases < b.cases) ? 1 : -1)
            setCasesByCountries(array);
    }

    useEffect( () => {
        sortCountries();
    });

    return (
        <div className="sidebar">
            <p>Cases By Country</p>
            <table>
                {casesByCountry.slice(0,12).map( (country, idx) => (
                    <tr key={idx}>
                    <td>{country.country}</td>
                    <td>{country.cases}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default SideBar;