import React from 'react';
import FutureWeatherItem from './FutureWeatherItem';
import 'bulma/css/bulma.css';

let FutureWeatherList = ({ data, DAYS }) => {
  let future = data.map((item, index) => {
    return (
      <FutureWeatherItem
        key={index}
        temperatureHigh={item.temperatureHigh}
        temperatureLow={item.temperatureLow}
        day={DAYS[new Date(item.time * 1000).getDay()]}
        icon={item.icon}
      />
    );
  });
  future.shift();
  return <div className="future-weather columns">{future}</div>;
};

export default FutureWeatherList;
