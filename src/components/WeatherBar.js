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

// TODO
// Set endpoint = api call, then fetch endpoint inside searchCity

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
    //const API_KEY = 'Your Dark Sky API key here';
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
    //we have city here
  };

  searchCity = city => {
    const API =
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    fetch('https://cors-anywhere.herokuapp.com/' + API)
      .then(response => response.json())
      .then(data =>
        this.setState(
          {
            city: data.results[0].address_components[0].long_name,
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
          },
          () => {
            console.log(data.results[0].address_components[0].long_name);
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
