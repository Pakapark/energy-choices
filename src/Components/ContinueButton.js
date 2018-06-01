/*
  Component: ContinueButton
  Basic Funtionality:
    <ContinueButton href="#id" />

  Note that #id must match the id of other containers

  You can add narration to tell user what to be expected next by using
    <ContainerButton href="#id" narration="some narration" />
*/

import React, { Component } from 'react';
import Color from '../Themes/Color';
import Metric from '../Themes/Metric';

class ContinueButton extends Component {

  renderNarration() {
    if (this.props.narration) {
      return (
        <div style={styles.narrationContainer}>
          {this.props.narration}
        </div>
      )
    }
  }

  render() {
    return (
      <div style={styles.continueButtonContainer}>
        {this.renderNarration()}
        <div style={styles.buttonContainer}>
          <a href={this.props.href}>
            <button style={styles.buttonStyle} className="hover">
              Continue
            </button>
          </a>
        </div>
      </div>
    );
  }
}

const styles = {
  continueButtonContainer: {
    display: "block",
    margin: Metric.continueButtonContainer.margin
  },
  buttonContainer: {
    display: "block",
    width: Metric.continueButton.width,
    margin: Metric.continueButton.margin
  },
  buttonStyle: {
    ...Metric.continueButton,
    margin: "0",
    display: "block",
    fontFamily: Metric.font.family.headline,
    fontSize: Metric.font.size.medium,
    backgroundColor: Color.continueButton,
    color: Color.white,
  },
  narrationContainer: {
    fontSize: Metric.font.size.small,
    color: Color.normalText,
    textAlign: "center"
  }
}

export default ContinueButton;
