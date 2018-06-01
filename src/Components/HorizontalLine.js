/*
  Component: HorizontalLine
  Basic Functionality:
    <HorizontalLine />

  In case that there is a progress bar on the left side, you should use
    <HorizontalLine section />
*/

import React, { Component } from 'react';
import Color from '../Themes/Color';
import Metric from '../Themes/Metric';

class HorizontalLine extends Component {

  render() {
    return (
      <hr style={{
        ...Metric.horizontalLine,
        backgroundColor: Color.horizontalLine,
        margin: this.props.section ? "20px 5%": "30px 15%"
      }}/>
    );
  }
}

export default HorizontalLine;
