import React, { Component } from 'react';

class CurrentWeather extends Component {
  render() {
    return (
      <div className="current-weather">
        <div className="box is-clearfix">
          <div className="content columns level">
            <div className="current-temp column level-item">
              {this.props.temparature}º
              <div className="current-city is-size-4">{this.props.city}</div>
              <div className="current-summary is-size-6">
                {this.props.summary}
              </div>
            </div>
            <div className="current-icon column level-item">
              <img
                src={require(`../assets/${this.props.icon}.svg`)}
                alt={this.props.icon}
              />
            </div>
            <div className="column" />
            <div className="column level-item">
              <form onSubmit={this.props.onSubmit}>
                <div className="field has-addons">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="New York"
                      onChange={this.props.onChange}
                    />
                  </div>
                  <div className="control">
                    <button className="button is-info" type="submit">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
