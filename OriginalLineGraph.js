import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral'
const HISTORY = `https://disease.sh/v3/covid-19/historical/all?lastdays=120`

const options = {
    legend: {
        display:false
    },
    elements: {
        point: {
            radius:0
        }
    },
    maintainAspectRatio:false,
    tooltips: {
        mode:"index",
        intersect: false,
        callbacks: {
            label: function (tooltips, data){
                return numeral(tooltips.value).format("+0.0")
            }
        }
    },
    scales: {
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipformat:"ll",
                }
            }
        ],
        yAxes: [
            {
                gridLines: {
                    display:false
                },
                ticks: {
                    //Include a dollar sign in tips
                    callback: function(value , index , values) {
                        return numeral(value).format("0a")
                    }
                }
            }
        ]
    }
}

const buildCharData = (data , casesType) => {
    const chartData = [];
    let LastDataPoint;
//ForEach doesnt work for arrays inside objects
    for(let date in data.cases){
        if(LastDataPoint){
            const newDataPoint = {
            //getting difference of today and last day cases to get todays new cases
            //set that data to X, Y axis    
                x:date,
                y:data[casesType][date] - LastDataPoint
            }
            chartData.push(newDataPoint);
        }
        LastDataPoint = data[casesType][data]
    }
    return chartData;
}

const LineGraph = ( {casesType= "cases"}) => {

    const [data, setData] = useState({});

useEffect(()=> {
    const fetchData = async () => {
         await fetch(`${HISTORY}`)
        .then(response => response.json())
        .then( data => {
            let chartData = buildCharData(data , casesType);
            setData(chartData);
        });
    };
    
        fetchData();    
    }, [casesType]);

    

    return ( 
        <div>
            <h4>I am a graph</h4>
            {data?.length > 0 && (
                  <Line
                 options={options} 
                 data={{
                     datasets: [{
                         backgroundColor:"#323232",
                         borderColor: "#fff",
                         data:data
                     }]
                 }}
                 />
            )} 
            
        </div>
     );
}
 
export default LineGraph;