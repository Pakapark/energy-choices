/*
  Component: Container
  Basic Functionality:
    <Container section="some id">
      Content
    </Container>

  Default CSS:
    padding vertical = 30px
    padding horizontal = 50px
    text align = center
    color = #4F4F4F
    font size = 24px
    font family = Roboto
    font weight = 300

  You can set no padding by using
    <Container section="some id" noPadding>
      Content
    </Container>

  If you need to change any other style, simply override the CSS style in content,
*/

import React, { Component } from 'react';
import windowSize from 'react-window-size';
import Metric from "../Themes/Metric";
import Color from "../Themes/Color";

class Container extends Component {
  render() {
    return (
      <div
        id={this.props.section}
        style={{
          height: this.props.windowHeight,
          width: "100%",
          padding: this.props.noPadding ? "0" : Metric.container.padding,
          fontFamily: Metric.font.family.normal,
          color: Color.normalText,
          fontSize: Metric.font.size.normalText,
          fontFamily: Metric.font.family.normalText,
          fontWeight: Metric.font.weight.regular,
          textAlign: "center"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default windowSize(Container);
