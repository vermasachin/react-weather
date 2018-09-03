import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';
import FutureWeatherList from './FutureWeatherList';

const DAYS_MAP = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

class WeatherBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      city: 'Chandigarh',
      latitude: '30.7333',
      longitude: '76.7794',
      data: '',
      temperature: '',
      summary: '',
      icon: '',
      future: ''
    };
  }

  getWeather(lat, lng) {
    const API = 'https://api.darksky.net/forecast/';
    // const API_KEY = Your Dark Sky API key;
    const SI_UNITS = '?units=si';
    fetch(
      'https://cors-anywhere.herokuapp.com/' +
        API +
        API_KEY +
        '/' +
        lat +
        ',' +
        lng +
        SI_UNITS
    )
      .then(response => response.json())
      .then(data =>
        this.setState({
          isLoaded: true,
          data: data,
          temparature: Math.round(data.currently.temperature),
          summary: data.currently.summary,
          icon: data.currently.icon,
          future: data.daily.data
        })
      );
  }
  handleChange = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    this.searchCity(this.state.city);
  };

  searchCity = city => {
    // const HERE_APP_ID = Your HERE maps APP ID;
    // const HERE_API_KEY = Your HERE maps API key;
    const API = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${HERE_APP_ID}&app_code=${HERE_API_KEY}&searchtext=${city}&language=en`;
    fetch(API)
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            city: data.Response.View[0].Result[0].Location.Address.City,
            latitude:
              data.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
            longitude:
              data.Response.View[0].Result[0].Location.DisplayPosition.Longitude
          },
          () => {
            console.log(data.Response.View[0].Result[0].Location.Address.City);
            this.getWeather(this.state.latitude, this.state.longitude);
          }
        )
      );
  };

  componentDidMount() {
    this.getWeather(this.state.latitude, this.state.longitude);
  }

  render() {
    const { error, isLoaded } = this.state;
    if (error) {
      return <div>error</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="weather-bar">
          <CurrentWeather
            city={this.state.city}
            temparature={this.state.temparature}
            summary={this.state.summary}
            icon={this.state.icon}
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
          <FutureWeatherList data={this.state.future} DAYS={DAYS_MAP} />
        </div>
      );
    }
  }
}

export default WeatherBar;
