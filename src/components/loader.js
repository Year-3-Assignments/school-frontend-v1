import React, { Component } from 'react';
import loadingGif from '../assets/loader.gif';

export default class Loader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <img src={loadingGif} alt="loading" width={this.props.size} />
      </div>
    );
  }
}
