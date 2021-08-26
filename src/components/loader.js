import React, { Component } from 'react';
import loadingGif from '../assets/loader.gif';

export default class Loader extends Component {
  render() {
    return (
      <div>
        <img src={loadingGif} alt="loading" width={this.props.size} />
      </div>
    );
  }
}
