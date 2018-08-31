import React, { Component } from 'react';
import './App.css';
import WeatherBar from './components/WeatherBar';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div className="app container">
        <WeatherBar />
        <Footer />
      </div>
    );
  }
}

export default App;
