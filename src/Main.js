import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import ContinueButton from './Components/ContinueButton';
import ShareButton from './Components/ShareButton';
import Container from './Components/Container';
import ProgressBarContainer from './Components/ProgressBarContainer';
import HorizontalLine from './Components/HorizontalLine';
import Color from './Themes/Color';
import Metric from './Themes/Metric';
import Image from './Themes/Image';
import {Doughnut, defaults} from 'react-chartjs-2';


class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      zipcode: "",
      city_energy_budget: 26.25,
      city_energy_cost: 26.25,
      
      cost_per_kwh: [.11, .12, .08, .09, .14, .08],
      energy_source_data: {
        labels: [
          

          'Nuclear',
          'Coal',
          'Natural Gas',
          "Hydropower, Biomass, Geothermal",
          'Solar',
          'Wind',
        ],
        datasets: [{
          data: [33.1, 19.5, 32.7, 10, .6, 4.1],
          backgroundColor: [
            
            '#E85349',
            '#ED6472',
            '#E58E97',
            '#C9DAE1',
            '#29ABC9',
            '#218DA7',
          ],
          hoverBackgroundColor: [
            '#c9473e',
            '#ba4e59',
            '#b57077',
            '#9eacb2',
            '#2088a0',
            '#1a7084',


          ]
        }]
    },

      lightbulb: {
        quantity: 0
      } 
    };


    this.zipcodeOnChange = this.zipcodeOnChange.bind(this);
    
  }


  componentDidMount() {
    this.timer = setInterval(
      () => this.increment(),
      500
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


increment() {
    const datasetsCopy = this.state.energy_source_data.datasets.slice(0);
    const dataCopy = datasetsCopy[0].data.slice(0);
    datasetsCopy[0].data = dataCopy;

    this.setState({
        data: Object.assign({}, this.state.energy_source_data, {
            datasets: datasetsCopy
        })
    });
}


  renderUtility(utility) {
    return (
      <div style={styles.section1Utility.utilityContainer}>
        <div style={styles.section1Utility.utilityHeader}>{utility}</div>
        <div>
          <span style={styles.section1Utility.utilityFactor}>Quantity</span>
          <span><input style={styles.section1Utility.inputRange} type="range" min="0" max="100" value={this.state.lightbulb.quantity} onChange={(e)=>this.setState({lightbulb: {quantity: e.target.value}})} /></span>
          <span>{this.state.lightbulb.quantity}</span>
        </div>
      </div>
    );
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
        <ContinueButton href="#question-introduction" />
      </Container>
    )
  }

  renderQuestionIntroduction() {
    return (
      <Container section="question-introduction">
        <div style={styles.motivatingQuestion.headerContainer}>
          What if we could save energy and the environment?
        </div>
        <HorizontalLine />
        <div style={styles.motivatingQuestion.descriptionContainer}>
          <p>
            We often think there’s a <span style={styles.motivatingQuestion.boldContainer}>tradeoff </span> 
            between what’s good for the Earth and good for our wallets. After all, buying a Tesla or installing 
            solar panels seems pretty expensive. And no one wants to crank the thermostat up to 80 degrees in the summer 
            just to save a bit of electricity.
          </p>
          <p>
            But there are lots of choices that make both 
            <span style={styles.motivatingQuestion.boldContainer}> economic</span> and 
            <span style={styles.motivatingQuestion.boldContainer}> environmental</span> sense.
          </p>
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
            <ContinueButton href="#section1Utility" narration="Click 'Continue' To Learn More About Your House" />
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
        <div style={styles.universal.smallFont}>Please Select Your Daily Energy Usage</div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderUtility("Lightbulb")}
          {this.renderUtility("Lightbulb")}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderUtility("Lightbulb")}
          {this.renderUtility("Lightbulb")}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderUtility("Lightbulb")}
          {this.renderUtility("Lightbulb")}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderUtility("Lightbulb")}
          {this.renderUtility("Lightbulb")}
        </div>
        <div style={styles.section1Utility.totalEnergy}>
          Your Estimated Total Monthly Energy Usage = XX.XXX <img src={Image.lightbulb.small} />
        </div>
        <ContinueButton href="#section1CompareResult" narration="Click 'Continue' To Compare Your Result With Your Neighbour "/>
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
         <div style={styles.universal.mediumFont}>
        We have seen how energy choices effect your home, what happens when we make energy choices for our city?

        </div>
        <ContinueButton href="#section3Introduction" />
      </ProgressBarContainer>
    );
  }



  renderSection2Quiz() {
    return (
      <ProgressBarContainer section="section1Summary" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Energy Intuition 
        </div>
        <HorizontalLine section />
        
        <ContinueButton href="#section2Introduction" />
      </ProgressBarContainer>
    );
  }




  renderSection2Doughnut() {
    
    return (
      <ProgressBarContainer section="section1Summary" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Energy Sources 
        </div>
        <HorizontalLine section />
        <div className="row">
          <span className="col-sm-6">

            <Doughnut data={this.state.energy_source_data}
            width="100%"
            height="100%"
              onElementsClick={(elem) => 
                { if (elem.length > 0) {
                    var updated_cost = 0
                    console.log(elem[0]["_index"])
                    var energySourceDataCopy = this.state.energy_source_data;
                    energySourceDataCopy.datasets[0]["data"][elem[0]["_index"]] *= 1.1;
                    var total = 0
                    for (var i = 0; i < energySourceDataCopy.datasets[0]["data"].length; i++) {
                      total+= energySourceDataCopy.datasets[0]["data"][i];
                    }
                    for (var j = 0; j < energySourceDataCopy.datasets[0]["data"].length; j++) {
                      energySourceDataCopy.datasets[0]["data"][j]/= total;
                      updated_cost+=this.state.cost_per_kwh[j]*energySourceDataCopy.datasets[0]["data"][j]*265
                      console.log(this.state.cost_per_kwh[j])
                      console.log(energySourceDataCopy.datasets[0]["data"][j])




                    }
                    this.setState({city_energy_cost: updated_cost.toFixed(2)})

                    console.log(energySourceDataCopy.datasets[0]["data"][elem[0]["_index"]])
                    this.setState({energy_source_data: Object.assign({}, energySourceDataCopy)});
                  }
              }} />
            </span>
            <span className="col-sm-6">
            <div style={styles.universal.mediumFont}>Monthy Energy Consuption:</div>
          <div style={styles.universal.smallFont}>
        City Budget: ${ this.state.city_energy_budget }M
      </div>

        <div style={styles.universal.smallFont}>
        Total Cost: ${ this.state.city_energy_cost }M
        </div>
            </span>
        </div>

        
        <ContinueButton href="#section2Introduction" />
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

  renderConclusion() {
    return (
      <Container section="lastPage">
        <div style={styles.motivatingQuestion.headerContainer}>
          What if we could save energy and the environment?
        </div>
        <HorizontalLine />
        <div style={styles.motivatingQuestion.subtitleContainer}>
          We can! You can.
        </div>
        <div style={styles.motivatingQuestion.descriptionContainer}>
          What’s good for the Earth can also be good for our wallets. You can save<br/>
          money by making choices in your home that also help keep the<br/>
          environment pure. The ideas here are only the beginning.
        </div>
        <div style={styles.motivatingQuestion.shareContainer}>
          Share your choice to save
        </div>
        <span>
          <ShareButton src={Image.share.facebook} href="https://facebook.com"/>
          <ShareButton src={Image.share.twitter} href="https://twitter.com"/>
          <ShareButton src={Image.share.email} href="https://www.google.com/gmail/"/>
        </span>
      </Container>
    )
  }

  render() {
    return (
      <div style={{height: "100%"}}>
        {this.renderHomePage()}
        {this.renderQuestionIntroduction()}
        {this.renderUnitIntroduction()}
        {this.renderSection1Introduction()}
        {this.renderSection1Utility()}
        {this.renderSection1CompareResult()}
        {this.renderSection1Suggestion()}
        {this.renderSection1Summary()}
        {this.renderSection2Introduction()}
        {this.renderSection2Quiz()}
        {this.renderSection2Doughnut()}
        {this.renderSection3Introduction()}
        {this.renderConclusion()}
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

  motivatingQuestion: {
    headerContainer: {
      fontSize: Metric.font.size.extraLarge,
      fontWeight: Metric.font.weight.bold
    },
    subtitleContainer: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.medium,
    },
    descriptionContainer: {
      fontSize: Metric.font.size.medium
    },
    boldContainer: {
      fontWeight: Metric.font.weight.bold
    },
    shareContainer: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.medium,
      margin: "50px 0 0 0"
    }
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
  },

  section1Utility: {
    utilityRow: {
      width: "100%",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      margin: "20px 0"
    },
    utilityContainer: {
      width: "45%",
      height: "100px",
      backgroundColor: Color.sand,
      padding: "5px 10px",
      textAlign: "left"
    },
    totalEnergy: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.bold,
      margin: "20px 0"
    },
    utilityHeader: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.medium
    },
    utilityFactor: {
      fontSize: Metric.font.size.small,
      fontWeight: Metric.font.weight.light
    },
    inputRange: {
      width: "200px",
      height: "5px",
      margin: "0 5px"
    }
  }
}


export default Main;
