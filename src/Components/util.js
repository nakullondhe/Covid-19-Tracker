import React from 'react';
import {Circle , Popup} from 'react-leaflet';
import numeral from 'numeral'

const casesTypeColors = {
    cases: {
        hex: "#cc1034",
        multiplier:800
    },
    recovered: {
        hex: "#7dd71d",
        multiplier:1200
    },
    deaths: {
        hex: "#f85002",
        multiplier:2000
    }
}

//Draw Circles On Map with interactive ToolTip
export const showDataOnMap = (data, casesType='cases') => (
    data.map((country, idx) => (
        <Circle key={idx} center={[country.countryInfo.lat,country.countryInfo.long]} fillOpacity={0.1} 
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag" style={{backgroundImage: `url(${country.countryInfo.flag})`}} />
                    <div className="info-name">{country.country}</div>
                    <div className="info-confirmed">Cases :{numeral(country.cases).format("0,0")}</div>
                    <div className="info-recovered">Recovered :{numeral(country.recovered).format("0,0")}</div>
                    <div className="info-deaths">Deaths :{numeral(country.deaths).format("0,0")}</div>
                </div>
            </Popup>
        </Circle>
    ))
)

