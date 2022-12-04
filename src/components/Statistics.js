import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { API_TRAININGS } from './constants'
import "../App.css";

function Statistics() {
  const [trainings, setTrainings] = useState([]);
  const _ = require("lodash");

  const getTrainings = () => {
    fetch(API_TRAININGS)
    .then(response => {
      if(response.ok){
          return response.json();
      }
      else
          alert('Trainings fetch error')
      }
    )
    .then(data => setTrainings(data))
    .catch(error => console.error(error))
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const groupActivities = _.groupBy(trainings, "activity");
  const groupTD = _.map(groupActivities, (value, key) => ({
    activity: key,
    duration: _.sumBy(value, "duration"),
    })
  );

  return (
    <div>
      <BarChart
        width={1000}
        height={550}
        data= {groupTD}
        margin={{top: 10, left: 10}} >
        <Tooltip />
        <Bar dataKey="duration" fill="#1769aa" />
        <XAxis dataKey="activity" />
        <YAxis label={{ value: 'Duration (in minutes)', angle: -90, position: 'insideLeft' }}/>
      </BarChart>
    </div>
  );         
};

export default Statistics;