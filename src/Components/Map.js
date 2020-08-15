import React from 'react';
import {Map as LeafletMap,TileLayer } from "react-leaflet"
import "./map.css";
import { showDataOnMap } from './util';

const Map = ({countries,lat,lon,zoom, casesType}) => {
    // const lat = props.lat;
    // const lon = props.lon;

    return (
        <LeafletMap className="map_container"center={[lat , lon]} zoom={zoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        {/* mapbox://styles/nakul27/ckcz8dh1f0c1q1imvmx1a8zpi

           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            pk.eyJ1IjoibmFrdWwyNyIsImEiOiJja2N6OGppcjkwaGFsMnVwNDdxZWg0YXpwIn0.sM935d_fMYPHlpReZZ53xw

            https://api.mapbox.com/styles/v1/nakul27/ckcz8dh1f0c1q1imvmx1a8zpi/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmFrdWwyNyIsImEiOiJja2N6OGppcjkwaGFsMnVwNDdxZWg0YXpwIn0.sM935d_fMYPHlpReZZ53xw

            © <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>
        */}
        {showDataOnMap(countries , casesType)}
        </LeafletMap>
    )
}

export default Map;