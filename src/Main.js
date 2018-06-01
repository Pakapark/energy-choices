import React, { Component } from 'react';
import ContinueButton from './Components/ContinueButton';
import Container from './Components/Container';
import ProgressBarContainer from './Components/ProgressBarContainer';
import HorizontalLine from './Components/HorizontalLine';
import Color from './Themes/Color';
import Metric from './Themes/Metric';
import Image from './Themes/Image';

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      zipcode: ""
    };

    this.zipcodeOnChange = this.zipcodeOnChange.bind(this);
  }

  zipcodeOnChange(event) {
    this.setState({zipcode: event.target.value});
  }

  renderHomePage() {
    return (
      <Container section="home">
          <div style={styles.homepage.headerContainer}>
            Energy Choices
          </div>
          <HorizontalLine />
          <div style={styles.homepage.subtitleContainer}>
            An explorable explanation of how to be<br/>
            an energy ninja
          </div>
        <ContinueButton href="#unit-introduction" />
      </Container>
    )
  }

  renderUnitIntroduction() {
    return (
      <Container section="unit-introduction">
        <div style={styles.unitIntroduction.headerContainer}>
          Introduction: Lightbulb Unit
        </div>
        <HorizontalLine />
        <div style={styles.unitIntroduction.descriptionContainer}>
          <div style={styles.unitIntroduction.normalTextContainer}>We define a super cool new unit of energy called Lightbulb (<img src={Image.lightbulb.small} />) </div>
          <div style={styles.unitIntroduction.emphasizedText}>1 <img src={Image.lightbulb.medium} /></div>
          <div style={styles.unitIntroduction.normalTextContainer}>is equivalent to</div>
          <div style={styles.unitIntroduction.emphasizedText}>The amount of energy consumed by<br /> a lightbulb for an hour</div>
        </div>
        <ContinueButton href="#section1Introduction" />
      </Container>
    )
  }

  renderSection1Introduction() {

    const renderEnergyData = () => {
      if (this.state.zipcode.length > 4) {
        return (
          <div>
            <div style={styles.universal.mediumFont}>Did You Know That</div>
            <div style={styles.universal.smallFont}>On average, a single family house in your area uses energy</div>
            <div style={styles.universal.largeFont}>80K <img src={Image.lightbulb.medium} /> per month</div>
            <ContinueButton href="#section1Utility" narration="Click Continue To Learn More About Your House" />
          </div>
        )
      }
    }

    return (
      <ProgressBarContainer section="section1Introduction" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        <div style={styles.universal.mediumFont}>
          Please Fill in Your Zip Code For a Personalized Experience
        </div>
        <div style={styles.section1Introduction.zipCodeInputContainer}>
          <input
            type="number"
            className="no-spinner"
            style={styles.section1Introduction.zipCodeInput}
            value={this.state.zipcode}
            onChange={this.zipcodeOnChange}
            placeholder="e.g. 94305"
          />
        </div>
        {renderEnergyData()}
      </ProgressBarContainer>
    );
  }

  renderSection1Utility() {
    return (
      <ProgressBarContainer section="section1Utility" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        Utility
        <ContinueButton href="#section1CompareResult" />
      </ProgressBarContainer>
    );
  }

  renderSection1CompareResult() {
    return (
      <ProgressBarContainer section="section1CompareResult" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        Compare Result
        <ContinueButton href="#section1Suggestion" />
      </ProgressBarContainer>
    );
  }

  renderSection1Suggestion() {
    return (
      <ProgressBarContainer section="section1Suggestion" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        Suggestion
        <ContinueButton href="#section1Summary" />
      </ProgressBarContainer>
    );
  }

  renderSection1Summary() {
    return (
      <ProgressBarContainer section="section1Summary" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        Summary
        <ContinueButton href="#section2Introduction" />
      </ProgressBarContainer>
    );
  }

  renderSection2Introduction() {
    return (
      <ProgressBarContainer section="section2Introduction" progress="city">
        <div style={styles.universal.sectionHeadline}>
          Section 2: My City
        </div>
        <HorizontalLine section />
        Introduction
        <ContinueButton href="#section3Introduction" />
      </ProgressBarContainer>
    );
  }


  renderSection3Introduction() {
    return (
      <ProgressBarContainer section="section3Introduction" progress="world">
        <div style={styles.universal.sectionHeadline}>
          Section 3: My World
        </div>
        <HorizontalLine section />
        Introduction
        <ContinueButton href="#lastPage" />
      </ProgressBarContainer>
    );
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        {this.renderHomePage()}
        {this.renderUnitIntroduction()}
        {this.renderSection1Introduction()}
        {this.renderSection1Utility()}
        {this.renderSection1CompareResult()}
        {this.renderSection1Suggestion()}
        {this.renderSection1Summary()}
        {this.renderSection2Introduction()}
        {this.renderSection3Introduction()}
      </div>
    );
  }
}

const styles = {

  // Universal Styles
  universal: {
    sectionHeadline: {
      fontFamily: Metric.font.family.headline,
      fontSize: Metric.font.size.headline,
      color: Color.headline,
      textAlign: "center"
    },
    smallFont: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.regular,
      margin: "30px 0"
    },
    mediumFont: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.medium,
      margin: "30px 0"
    },
    largeFont: {
      fontSize: Metric.font.size.extraLarge,
      fontWeight: Metric.font.weight.bold,
      margin: "30px 0"
    },
  },

  // Home Page
  homepage: {
    headerContainer: {
      fontFamily: Metric.font.family.headline,
      fontSize: Metric.font.size.headline,
      color: Color.headline,
      paddingTop: "15%" // Bad Style
    },
    subtitleContainer: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.medium,
    }
  },

  // Unit Introduction
  unitIntroduction: {
    headerContainer: {
      color: Color.headline,
      fontFamily: Metric.font.family.headline,
      fontSize: Metric.font.size.headline,
      fontWeight: Metric.font.weight.medium,
    },
    descriptionContainer: {
      fontSize: Metric.font.size.medium,
    },
    emphasizedText: {
      fontSize: Metric.font.size.extraLarge,
      fontWeight: Metric.font.weight.bold
    },
    normalTextContainer: {
      margin: "50px 0"
    },
  },

  section1Introduction: {
    mediumText: {
      fontSize: Metric.font.size.medium,
      weight: Metric.font.weight.medium,
      margin: "30px 0"
    },
    zipCodeInputContainer: {
      display: "block",
      width: "400px",
      margin: "30px auto 60px auto"
    },
    zipCodeInput: {
      textAlign: "center",
      fontSize: Metric.font.size.large,
      border: "0",
      borderBottom: "2px solid " + Color.normalText
    }
  }
}


export default Main;
