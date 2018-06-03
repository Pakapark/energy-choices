/*
  Component: ProgressBarContainer
  Basic Functionality:
    <ProgressBarContainer section="some id" progress="some progess in progress bar">
      content
    </ProgressBarContainer />

  progress = "home" | "city" | "world" | "complete"

  Default CSS:
    padding vertical = 30px
    padding horizontal = 50px
    text align = center
    color = #4F4F4F
    font size = 24px
    font family = Roboto
    font weight = 300

  Note that this function uses grid bootstrap to separate progress bar from content.
  If time allows, I will change the progress bar to be sticky with constant width instead.
*/

import React, { Component } from 'react';
import windowSize from 'react-window-size';
import Metric from '../Themes/Metric';
import Color from '../Themes/Color';
import Image from '../Themes/Image';

class ProgressBarContainer extends Component {
  render() {

    return (
      <div
        id={this.props.section}
        style={{
          height: this.props.windowHeight,
          width: this.props.windowWidth,
          padding: Metric.container.padding,
          fontFamily: Metric.font.family.normal,
        }}
        className="row"
      >
        <span className="col-sm-2" style={styles.progressBarContainer}>
          <img src={Image.progressBar[this.props.progress]} alt=""/>
        </span>
        <span className="col-sm-10" style={styles.contentContainer}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

const styles = {
  progressBarContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    color: Color.normalText,
    fontSize: Metric.font.size.normalText,
    fontFamily: Metric.font.family.normalText,
    fontWeight: Metric.font.weight.regular,
    textAlign: "center"
  }
}


export default windowSize(ProgressBarContainer);
