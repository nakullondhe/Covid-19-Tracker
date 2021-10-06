import React, { useState, useEffect } from 'react';
import './grid.css';
import Map from './Map';
import SideBar from './SideBar';
import LineGraph from './LineGraph';

const ALL_COUNTRIES = "https://disease.sh/v3/covid-19/countries";
const WORLD = "https://disease.sh/v3/covid-19/all"
const BY_COUNTRY = "https://disease.sh/v3/covid-19/countries"


const Grid = () => {
    
    const [countries , setCountries] = useState([]);
    const [world , setWorld] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({})
    const [geo, setGeo] = useState({lat:"",lon:"",zoom:"",olat:"",olon:""})
    const { cases,todayCases , deaths,todayDeaths, recovered,active} = selectedCountry;
    const [mapCountries , setMapCountries] = useState([]);
    const [casesType , setCasesType] = useState("");
   
    

    useEffect( () => {
        const getCountriesData = () => {
             fetch(`${ALL_COUNTRIES}`)
             .then( (response) => response.json())
             .then((data) => {
                 const countries_data = data.map( (country) => (
                     {
                         name:country.country,
                         value:country.countryInfo.iso2
                     }));
                     setMapCountries(data);
                     setCountries(countries_data);
            })}   
        const getLocation = () => {
                    navigator.geolocation.getCurrentPosition( (position) => {
                        const positionCoords = position.coords
                        setGeo({
                            ...geo, 
                            lat:positionCoords.latitude ,
                            lon:positionCoords.longitude,
                            olat:positionCoords.latitude ,
                            olon:positionCoords.longitude,
                            zoom:2
                        })
            });}

            const getWorldData = () => {
                fetch(`${WORLD}`)
                .then( (response) => response.json())
                .then((data) => {
                        const worldData = {
                            cases: data.cases,
                            todayCases: data.todayCases,
                            deaths: data.deaths,
                            todayDeaths: data.todayDeaths,
                            recovered: data.recovered,
                            active: data.active,
                        };
                        setWorld(worldData);
                        setSelectedCountry(worldData);
            })}  
            getWorldData();
            getCountriesData();
            getLocation();
            setCasesType("cases")
  }, [])

  //BY COUNTRY-----------------------------
  const dataByCountry = (iso) => {
    if(iso !== "world")
        fetch(`${BY_COUNTRY}/${iso}`)
    .then( (response) => response.json())
    .then((data) => {
        const countryData = {
            cases: data.cases,
            todayCases: data.todayCases,
            deaths: data.deaths,
            todayDeaths: data.todayDeaths,
            recovered: data.recovered,
            active: data.active,
        };
        setGeo({
            ...geo, 
            lat:data.countryInfo.lat ,
            lon:data.countryInfo.long,
            zoom:5
        })
        setSelectedCountry(countryData)
    }) 
}
  
    const changeSelect = (e) => {
        if(e.target.value !== "world") { dataByCountry(e.target.value); }
        else {
            setSelectedCountry(world);
            setGeo({...geo, lat:geo.olat, lon:geo.olon ,zoom:2})
        }
    }

const changeCaseType = (caseType) => {
    setCasesType(caseType);
}

    return (
        <div id="container">
            <header className="grid_header">
                <h1>Covid19 Tracker</h1>

                <select  className="dropdown"  onChange={changeSelect}>
                    <option value="world">Worldwide</option>
                         {countries.map((country, idx) => {
                            return (
                                <option key={idx} value={country.value}>{country.name}</option>
                            )})}  
                </select>
                    
            </header>

            <section className="cases_outer">
                <div className={(casesType === "cases") ? "cases_internal cases" : "cases_internal"} id="cases" onClick={() => changeCaseType("cases")}>
                        <h5>Total Cases</h5>
                            <p className="today cases_color">{todayCases} +</p>
                            <p className="total">{cases}</p>   
                </div>
                <div className={(casesType === "deaths") ? "cases_internal deaths" : "cases_internal"} id="deaths" onClick={() => changeCaseType("deaths")}>
                        <h5>Deaths</h5>
                        <p className="today deaths_color">{todayDeaths} +</p>
                        <p className="total">{deaths}</p>
                </div>
                <div className={(casesType === "recovered") ? "cases_internal recovered" : "cases_internal"} id="recovered" onClick={() => changeCaseType("recovered")}>
                        <h6>Recovered</h6>
                        <p className="recovered_color">{recovered}</p>
                        <h6>Active</h6>
                        <p>{active}</p>
                </div>

            </section>

            <section className="right_box">
                <SideBar countries={mapCountries}/>
                <LineGraph />
            </section>
            
            <div className="map">
                <Map countries={mapCountries}lat={geo.lat} lon={geo.lon} zoom={geo.zoom} casesType={casesType}/>
            </div>
        </div>
    )
}

export default Grid;