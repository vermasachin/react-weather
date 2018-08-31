import React, { Component } from 'react';

class FutureWeatherItem extends Component {
  render() {
    return (
      <div className="column">
        <div className="box">
          <div className="content">
            <div className="title">
              <img
                src={require(`../assets/${this.props.icon}.svg`)}
                alt={this.props.icon}
              />
            </div>
            <div className="subtitle">
              {Math.round(this.props.temperatureHigh)}º
              <span className="slash">/</span>
              {Math.round(this.props.temperatureLow)}º
            </div>
            <span className="day">{this.props.day}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default FutureWeatherItem;
