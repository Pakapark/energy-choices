/*
  Component: shareButton
  Basic Funtionality:
    <shareButton href="#id" />

  Note that #id must match the id of other containers

  You can add narration to tell user what to be expected next by using
    <ContainerButton href="#id" narration="some narration" />
*/

import React, { Component } from 'react';
import Color from '../Themes/Color';
import Metric from '../Themes/Metric';

class ShareButton extends Component {

  render() {
    return (
      <div style={styles.buttonContainer}>
        <a href={this.props.href}  target="_blank">
          <img src={this.props.src} alt={this.props.alt}/>
        </a>
      </div>
    );
  }
}

const styles = {
  buttonContainer: {
    display: "inline-block",
    width: Metric.shareButton.width,
    margin: Metric.shareButton.margin
  },
  buttonStyle: {
    ...Metric.shareButton,
    margin: "0",
    fontFamily: Metric.font.family.headline,
    fontSize: Metric.font.size.medium,
    color: Color.white,
  }
}

export default ShareButton;
