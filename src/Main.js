import React, { Component } from 'react';
import {Doughnut, Bar, defaults} from 'react-chartjs-2';
import ContinueButton from './Components/ContinueButton';
import ShareButton from './Components/ShareButton';
import Container from './Components/Container';
import QuizButton from './Components/QuizButton';
import Quiz2Button from './Components/Quiz2Button';

import ProgressBarContainer from './Components/ProgressBarContainer';
import HorizontalLine from './Components/HorizontalLine';
import nl2br from 'react-newline-to-break';
import Color from './Themes/Color';
import Metric from './Themes/Metric';
import Image from './Themes/Image';
import { Button, ButtonToolbar,  ButtonGroup} from 'react-bootstrap';
import Snowf from 'react-snowf';


const DRYING_MACHINE_COST = 56;
const DAYS_IN_MONTH = 30;
const TELEVISION_COST = 3;
const WASHING_MACHINE_COST_COLD = 31;
const WASHING_MACHINE_COST_HOT = 48;
const CAR_COST = 23;
const HEATER_CONSTANT = 250;
const AC_CONSTANT = 50;

// const ELECTRICITY_COST_PER_BULB = 0.0084 // In dollars per bulb, assuming $0.14 per KWH
// 60 WH / bulb * 0.001 KWH / WH * 0.14 $ / KWH = 0.0084 $/bulb

const GLOBAL_ELECTRICITY_COST = 1270 // Billion $ / month
const GLOBAL_ELECTRICITY_USAGE = 152.25; // In trillion bulbs per month
const GLOBAL_CITIES_CONVERSION = 200; // Converts to billions of dollars

//Total estimated global monthly energy cost = $1.27 trillion


const NEIGHBOUR = {
  LIGHTBULB: 3000,
  LAPTOP: 720,
  TELEVISION: 1080,
  WASHING_MACHINE: 775,
  DRYING_MACHINE: 1400,
  AIR_CONDITIONER: 20101,
  HEATER: 30000,
  CAR: 19320,
  TOTAL: 75856
}

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      shouldHide: true,
      total_co2: 99186.00,
      original_co2: 99186,
      current_source: {},

      zipcode: "",

      lightbulbQuantity: 20,
      lightbulbDuration: 5,
      lightbulbEnergy: 3000,

      dryingMachineQuantity: 25,
      dryingMachineEnergy: 1400,

      laptopQuantity: 3,
      laptopDuration: 8,
      laptopEnergy: 720,

      airConditionerDuration: 10,
      airConditionerTemperature: 68,
      airConditionerEnergy: 20101,

      televisionQuantity: 2,
      televisionDuration: 6,
      televisionEnergy: 1080,

      heaterTemperature: 20,
      heaterDuration: 8,
      heaterEnergy: 30000,

      washingMachineColdChecked: true,
      washingMachineHotChecked: false,
      washingMachineQuantity: 25,
      washingMachineWater: 31,
      washingMachineEnergy: 775,

      carMile: 28,
      carEnergy: 19320,

      totalHouseEnergy: 75856,

      city_energy_budget: 26.25,
      city_energy_cost: 26.25,

      cost_per_kwh: [.11, .12, .07, .09, .14, .08],

      co: [ 66, 1050, 443, 26, 13, 9],
      energy_data_details: [{
        Name: "Nuclear",
        Advantages: " - Domestic source of energy \n - Affordability \n - Cleaner than fossil fuels",
        Disadvantages: " - Risk of nuclear accidents \n - Nuclear waste \n - Radioactive explosion ",
        cost_per_kwh: "0.11",
        c_cost: "0.08",
        o_cost: "0.03",
        co: 66.
      }, {
          Name: "Coal",
          Advantages: " - Reliability \n - Affordability \n - Abundance",
          Disadvantages: "- Greenhouse gas emissions \n - Generation of millions of tons of waste \n - Emission of mercury, sulfur dioxide, carbon monoxide, mercury, selenium, and arsenic",
          cost_per_kwh: "0.12",
          c_cost: "0.08",
          o_cost: "0.04",
          co: 1050.
        }, {
          Name: "Natural Gas",
          Advantages: " - Reliability \n - Affordability \n - Abundance",
          Disadvantages: "- Greenhouse gas emissions \n - Susceptible to dangerous explosions \n - Emission of carbon monoxide",
          cost_per_kwh: "0.07",
          c_cost: "0.02",
          o_cost: "0.05",
          co: 443.
        }, {
          Name: "Hydropower, Biomass, Geothermal",
          Advantages: " - Domestic source of energy \n - Affordability \n - Cleaner than fossil fuels",
          Disadvantages: "",
          cost_per_kwh: "0.11",
          c_cost: "0.08",
          o_cost: "0.03",
          co: 26.
        }, {
          Name: "Solar" ,
          Advantages: " - Renewable  \n - Clean \n- Abundance \n - Excess power can be sold back to the power company \n - Safer for energy workers \n - Domestic source of energy",
          Disadvantages: " - Risk of nuclear accidents \n - Nuclear waste \n - Radioactive explosion ",
          cost_per_kwh: "0.14",
          c_cost: "0.13",
          o_cost: "0.01",
          co: 13.
        }, {
          Name: "Wind",
          Advantages: "- Affordable \n - Renewable \n - Clean \n - Domestic source of energy \n - Excess power can be sold back to the power company \n - Safer for energy workers",
          Disadvantages: " - Turbines might cause noise and aesthetic pollution \n - Weather Dependent \n - Uses a Lot of Space",
          cost_per_kwh: "0.08",
          c_cost: "0.07",
          o_cost: "0.01",
          co: 9.
        }],

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
              '#a8ccdb',
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

        data1: {
          labels: [
            'New York',
            'East North Central',
            'West North Central',
            'South Atlantic',
            'East South Central',
            'West South Central',
            'Mountain North',
            'Mountain South',
            'Pacific',
          ],

          datasets: [{
            label: "Millions of Dollars in Energy Spending",
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [
              (50.7), (33.36/12*100),
              (31.88/12*100),
              (14.54/12*100),
              (46.09/12*100),
              (13.72/12*100),
              (25.38/12*100),
              (6.74/12*100),
              (7.2/12*100),
              (26.12/12*100)
            ]
          }]
        },




        lightbulb: {
          quantity: 0
        },

        solarPanelCheckbox: false,
        upgradeApplianceCheckbox: false,
        energySavingTipsCheckbox: false,
        publicTransitCheckbox: false
    };

    this.zipcodeOnChange = this.zipcodeOnChange.bind(this);
    this.lightbulbQuantityOnChange = this.lightbulbQuantityOnChange.bind(this);
    this.lightbulbDurationOnChange = this.lightbulbDurationOnChange.bind(this);
    this.dryingMachineQuantityOnChange = this.dryingMachineQuantityOnChange.bind(this);
    this.laptopQuantityOnChange = this.laptopQuantityOnChange.bind(this);
    this.laptopDurationOnChange = this.laptopDurationOnChange.bind(this);
    this.airConditionerTemperatureOnChange = this.airConditionerTemperatureOnChange.bind(this);
    this.airConditionerDurationOnChange = this.airConditionerDurationOnChange.bind(this);
    this.televisionQuantityOnChange = this.televisionQuantityOnChange.bind(this);
    this.televisionDurationOnChange = this.televisionDurationOnChange.bind(this);
    this.heaterTemperatureOnChange = this.heaterTemperatureOnChange.bind(this);
    this.heaterDurationOnChange = this.heaterDurationOnChange.bind(this);
    this.washingMachineQuantityOnChange = this.washingMachineQuantityOnChange.bind(this);
    this.washingMachineWaterOnChange = this.washingMachineWaterOnChange.bind(this);
    this.carMileOnChange = this.carMileOnChange.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.increment(),
      500
    )

    this.addDoughnutHover("section2Doughnut");
    this.addDoughnutHover("section2DoughnutEco");
    this.addDoughnutHover("section2EnergySources");

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

  addDoughnutHover(donutRef) {
    var doughnut = this.refs[donutRef].chartInstance;
    doughnut.options.hover.onHover = this.mouseoverWrapper(doughnut);
    doughnut.options.events = ["touchstart", "click"] 
    doughnut.options.tooltips.titleFontSize =50
    doughnut.options.tooltips.bodyFontSize =30


  }

  zipcodeOnChange(event) {
    this.setState({zipcode: event.target.value});
  }

  lightbulbQuantityOnChange(event) {
    var newLightBulbEnergy = event.target.value * this.state.lightbulbDuration * DAYS_IN_MONTH;
    this.setState({
      lightbulbQuantity: event.target.value,
      lightbulbEnergy: newLightBulbEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newLightBulbEnergy - this.state.lightbulbEnergy
    })
  }

  lightbulbDurationOnChange(event) {
    var newLightBulbEnergy = event.target.value * this.state.lightbulbQuantity * DAYS_IN_MONTH;
    this.setState({
      lightbulbDuration: event.target.value,
      lightbulbEnergy: newLightBulbEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newLightBulbEnergy - this.state.lightbulbEnergy
    })
  }

  dryingMachineQuantityOnChange(event) {
    var newDryingMachineEnergy = event.target.value * DRYING_MACHINE_COST;
    this.setState({
      dryingMachineQuantity: event.target.value,
      dryingMachineEnergy: newDryingMachineEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newDryingMachineEnergy - this.state.dryingMachineEnergy
    })
  }

  laptopQuantityOnChange(event) {
    var newLaptopEnergy = event.target.value * this.state.laptopDuration * DAYS_IN_MONTH;
    this.setState({
      laptopQuantity: event.target.value,
      laptopEnergy: newLaptopEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newLaptopEnergy - this.state.laptopEnergy
    })
  }

  laptopDurationOnChange(event) {
    var newLaptopEnergy = event.target.value * this.state.laptopQuantity * DAYS_IN_MONTH;
    this.setState({
      laptopDuration: event.target.value,
      laptopEnergy: newLaptopEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newLaptopEnergy - this.state.laptopEnergy
    })
  }

  airConditionerTemperatureOnChange(event) {
    var newAirConditionerEnergy = parseInt(Math.pow(1.05, 74 - event.target.value) * AC_CONSTANT * this.state.airConditionerDuration * DAYS_IN_MONTH, 10);
    this.setState({
      airConditionerTemperature: event.target.value,
      airConditionerEnergy: newAirConditionerEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newAirConditionerEnergy - this.state.airConditionerEnergy
    })
  }

  airConditionerDurationOnChange(event) {
    var newAirConditionerEnergy = parseInt(Math.pow(1.05, 74 - this.state.airConditionerTemperature) * AC_CONSTANT * event.target.value * DAYS_IN_MONTH, 10);
    this.setState({
      airConditionerDuration: event.target.value,
      airConditionerEnergy: newAirConditionerEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newAirConditionerEnergy - this.state.airConditionerEnergy
    })
  }

  televisionQuantityOnChange(event) {
    var newTelevisionEnergy = event.target.value * this.state.televisionDuration * DAYS_IN_MONTH * TELEVISION_COST;
    this.setState({
      televisionQuantity: event.target.value,
      televisionEnergy: newTelevisionEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newTelevisionEnergy - this.state.televisionEnergy
    })
  }

  televisionDurationOnChange(event) {
    var newTelevisionEnergy = event.target.value * this.state.televisionQuantity * DAYS_IN_MONTH * TELEVISION_COST;
    this.setState({
      televisionDuration: event.target.value,
      televisionEnergy: newTelevisionEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + (newTelevisionEnergy - this.state.televisionEnergy)
    })
  }

  heaterTemperatureOnChange(event) {
    var temperature = event.target.value;
    var newHeaterEnergy;
    if (event.target.value < 10) newHeaterEnergy = parseInt(Math.round(temperature/30 * HEATER_CONSTANT * this.state.heaterDuration * DAYS_IN_MONTH), 10);
    else newHeaterEnergy = parseInt(Math.round((2*(temperature - 10)/120 + 1/3) * HEATER_CONSTANT * this.state.heaterDuration * DAYS_IN_MONTH), 10);
    this.setState({
      heaterTemperature: temperature,
      heaterEnergy: newHeaterEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newHeaterEnergy - this.state.heaterEnergy
    });
  }

  heaterDurationOnChange(event) {
    var duration = event.target.value;
    var newHeaterEnergy;
    if (this.state.heaterTemperature < 10) newHeaterEnergy = parseInt(Math.round(this.state.heaterTemperature/30 * HEATER_CONSTANT * duration * DAYS_IN_MONTH), 10);
    else newHeaterEnergy = parseInt(Math.round((2*(this.state.heaterTemperature - 10)/120 + 1/3) * HEATER_CONSTANT * duration * DAYS_IN_MONTH), 10);
    this.setState({
      heaterDuration: duration,
      heaterEnergy: newHeaterEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newHeaterEnergy - this.state.heaterEnergy
    })
  }

  washingMachineQuantityOnChange(event) {
    var newWashingMachineEnergy = this.state.washingMachineWater * event.target.value;
    this.setState({
      washingMachineQuantity: event.target.value,
      washingMachineEnergy: newWashingMachineEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newWashingMachineEnergy - this.state.washingMachineEnergy,
    });
  }

  washingMachineWaterOnChange(event) {
    var washing_constant = (event.target.value === "cold" ? WASHING_MACHINE_COST_COLD : WASHING_MACHINE_COST_HOT);
    var newWashingMachineEnergy = washing_constant * this.state.washingMachineQuantity;
    this.setState({
      washingMachineWater: washing_constant,
      washingMachineEnergy: newWashingMachineEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newWashingMachineEnergy - this.state.washingMachineEnergy,
      washingMachineColdChecked: (washing_constant == WASHING_MACHINE_COST_COLD) ? true : false,
      washingMachineHotChecked: (washing_constant == WASHING_MACHINE_COST_HOT) ? true : false
    });
  }

  carMileOnChange(event) {
    var newCarMileEnergy = event.target.value * CAR_COST * DAYS_IN_MONTH;
    this.setState({
      carMile: event.target.value,
      carEnergy: newCarMileEnergy,
      totalHouseEnergy: this.state.totalHouseEnergy + newCarMileEnergy - this.state.carEnergy
    });
  }

  calculateHouseholdGlobalImpact() {
    return Math.abs(GLOBAL_ELECTRICITY_USAGE * (1 - (parseFloat(this.state.totalHouseEnergy) / NEIGHBOUR.TOTAL))).toFixed(2); // TODO: unit convert
  }

  householdSavedText() {
    if(this.state.totalHouseEnergy < NEIGHBOUR.TOTAL) {
      return "saved";
    } else {
      return "more consumed";
    }
  }

  householdPercentDifferenceText() {
    if(this.state.totalHouseEnergy < NEIGHBOUR.TOTAL) {
      return "reduced";
    } else {
      return "increased";
    }
  }

  calculateCityGlobalImpact() {
    return (this.state.city_energy_cost * GLOBAL_CITIES_CONVERSION * Math.abs(1 - (this.state.city_energy_cost / this.state.city_energy_budget))).toFixed(1); // in billions
  }

  citySavedText() {
    if(this.state.city_energy_cost < this.state.city_energy_budget) {
      return " electricty costs saved ";
    } else {
      return " extra electricty costs paid ";
    }
  }

  householdSavedMoneyText() {
    if(this.state.totalHouseEnergy < NEIGHBOUR.TOTAL) {
      return "saved";
    } else {
      return "more spent";
    }
  }

  calculateNeighborDifference() {
    return(Math.abs(1 - parseFloat(this.state.totalHouseEnergy) / NEIGHBOUR.TOTAL));
  }

  calculateHouseholdGlobalElectricityCost() {
    return((this.calculateNeighborDifference() * GLOBAL_ELECTRICITY_COST).toFixed(1)); // In trillions of dollars per month
  }

  mouseoverWrapper(chartInstance) {
    let context = this;
    return((event) => {
    console.log('onHover Called', event);
    let elem = chartInstance.getElementAtEvent(event);
    if(elem.length > 0) {
      context.setState({current_source: Object.assign({}, context.state.energy_data_details[elem[0]["_index"]])});
      context.state.shouldHide = false;
    }
    });
  }



  // Assume 200,000 cites with same budget

  renderLightbulb() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Lightbulb</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Quantity</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="100" value={this.state.lightbulbQuantity}
                onChange={this.lightbulbQuantityOnChange}
              />
            </div>
            <div>&nbsp; {this.state.lightbulbQuantity} lightbulbs</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Duration</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="24"
                value={this.state.lightbulbDuration}
                onChange={this.lightbulbDurationOnChange} />
            </div>
            <div>&nbsp; {this.state.lightbulbDuration} hours/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.lightbulbEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            (1 <img alt=""src={Image.whiteLightbulb.tiny} /> per lightbulb per hour)
          </div>
        </span>
      </div>
    );
  }

  renderDryingMachine() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Dryer</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Quantity</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="100" value={this.state.dryingMachineQuantity}
                onChange={this.dryingMachineQuantityOnChange}
              /></div>
            <div>&nbsp; {this.state.dryingMachineQuantity} loads/month</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.dryingMachineEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            (56 <img alt=""src={Image.whiteLightbulb.tiny} /> per laundry load)
          </div>
        </span>
      </div>
    );
  }

  renderLaptop() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Laptop</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Quantity</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="15" value={this.state.laptopQuantity}
                onChange={this.laptopQuantityOnChange}
              /></div>
            <div>&nbsp; {this.state.laptopQuantity} laptop</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Duration</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="24"
                value={this.state.laptopDuration}
                onChange={this.laptopDurationOnChange} />
            </div>
            <div>&nbsp; {this.state.laptopDuration} hours/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.laptopEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            (1 <img alt=""src={Image.whiteLightbulb.tiny} /> per laptop per hour)
          </div>
        </span>
      </div>
    );
  }

  renderAirConditioner() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Air Conditioner</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Temp</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="40"
                max="100"
                value={this.state.airConditionerTemperature}
                onChange={this.airConditionerTemperatureOnChange}
              /></div>
            <div>&nbsp; {this.state.airConditionerTemperature} <sup>o</sup>F</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Duration</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="24"
                value={this.state.airConditionerDuration}
                onChange={this.airConditionerDurationOnChange} />
            </div>
            <div>&nbsp; {this.state.airConditionerDuration} hours/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.airConditionerEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            (involving equations)
          </div>
        </span>
      </div>
    );
  }

  renderTelevision() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Television</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Quantity</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="20" value={this.state.televisionQuantity}
                onChange={this.televisionQuantityOnChange}
              /></div>
            <div>&nbsp; {this.state.televisionQuantity} televisions</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Duration</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="24"
                value={this.state.televisionDuration}
                onChange={this.televisionDurationOnChange} />
            </div>
            <div>&nbsp; {this.state.televisionDuration} hours/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.televisionEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            ({TELEVISION_COST} <img alt=""src={Image.whiteLightbulb.tiny} /> per TV per hour)
          </div>
        </span>
      </div>
    );
  }

  renderHeater() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Heater <span style={{fontWeight: Metric.font.weight.light, fontSize: Metric.font.size.small}}>(ΔTemp = Temperature Different From Outside)</span></div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>ΔTemp</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="100"
                value={this.state.heaterTemperature}
                onChange={this.heaterTemperatureOnChange}
              /></div>
            <div>&nbsp; {this.state.heaterTemperature} <sup>o</sup>F</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Duration</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="24"
                value={this.state.heaterDuration}
                onChange={this.heaterDurationOnChange} />
            </div>
            <div>&nbsp; {this.state.heaterDuration} hours/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.heaterEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            (involving equations)
          </div>
        </span>
      </div>
    );
  }

  renderWashingMachine() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Washing Machine</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Quantity</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="100"
                value={this.state.washingMachineQuantity}
                onChange={this.washingMachineQuantityOnChange}
              />
            </div>
            <div>&nbsp; {this.state.washingMachineQuantity} loads/month</div>
          </div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Water</div>
            <div>
              <input
                style={styles.section1Utility.inputRadio}
                type="radio"
                value="cold"
                onChange={this.washingMachineWaterOnChange}
                name="water"
                checked={this.state.washingMachineColdChecked}
              />
              <label>Cold Water &nbsp;</label>
              <input
                style={styles.section1Utility.inputRadio}
                type="radio"
                value="hot"
                onChange={this.washingMachineWaterOnChange}
                checked={this.state.washingMachineHotChecked}
                name="water"
              />
              <label>Hot Water</label>
            </div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.washingMachineEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            ({this.state.washingMachineWater} <img alt=""src={Image.whiteLightbulb.tiny} /> per laundry load)
          </div>
        </span>
      </div>
    );
  }

  renderCar() {
    return (
      <div style={styles.section1Utility.utilityContainer} className="row">
        <span className="col-sm-9" style={{padding: "5px 10px"}}>
          <div style={styles.section1Utility.utilityHeader}>Car</div>
          <div style={styles.section1Utility.utilitySliderContainer}>
            <div style={styles.section1Utility.utilityFactor}>Mile</div>
            <div>
              <input
                style={styles.section1Utility.inputRange}
                type="range"
                min="0"
                max="300"
                value={this.state.carMile}
                onChange={this.carMileOnChange}
              />
            </div>
            <div>&nbsp; {this.state.carMile} miles/day</div>
          </div>
        </span>
        <span className="col-sm-3" style={styles.section1Utility.utilityEnergyContainer}>
          <div style={styles.section1Utility.utilityEnergyHeader}>
            Energy Used
          </div>
          <div style={styles.section1Utility.utilityEnergyNumber}>
            {this.state.carEnergy} <img alt=""src={Image.whiteLightbulb.small} />
          </div>
          <div style={styles.section1Utility.utilityEnergyInform}>
            ({CAR_COST} <img alt=""src={Image.whiteLightbulb.tiny} /> per mile)
          </div>
        </span>
      </div>
    );
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
          <div style={styles.unitIntroduction.normalTextContainer}>So we're all on the same page, we define a new unit of energy called a Lightbulb (<img alt=""src={Image.lightbulb.small} />) </div>
          <div style={styles.unitIntroduction.emphasizedText}>1 <img alt=""src={Image.lightbulb.medium} /></div>
          <div style={styles.unitIntroduction.normalTextContainer}>is equivalent to</div>
          <div style={styles.unitIntroduction.emphasizedText}>The amount of energy consumed by<br /> a lightbulb for an hour</div>
        </div>
        <ContinueButton href="#section1Introduction" />
      </Container>
    )
  }

  renderSection1Introduction() {
    return (
      <ProgressBarContainer section="section1Introduction" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Section 1: My House
        </div>
        <HorizontalLine section />
        <div style={styles.universal.mediumFont}>
          We'll start by exploring the energy choices you make in your own home.
        </div>        

        <div style={styles.universal.mediumFont}>
          Please fill in your zip code for a personalized experience
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

        <div style={styles.universal.smallFont}>
          Your house will start with the average energy use for your area. You can then change the sliders to reflect your own habits. 
        </div>        
        <div style={{visibility: this.state.zipcode.length > 4 ? "visible": "hidden"}}>
          <div style={styles.universal.mediumFont}>Did You Know That</div>
          <div style={styles.universal.smallFont}>On average, a single family house in your area uses energy</div>
          <div style={styles.universal.largeFont}>80K <img alt=""src={Image.lightbulb.medium} /> per month</div>
          <ContinueButton href="#section1Utility" narration="Click 'Continue' To Learn More About Your House" />
        </div>
      </ProgressBarContainer>
    );
  }

  renderSection1Utility() {
    return (
      <ProgressBarContainer section="section1Utility" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Calculate Your Monthly Energy Usage
        </div>
        <HorizontalLine section />
        <div style={styles.universal.smallFont}>Please Tune Your Daily Routine to Calculate <b>Your Monthly Energy Usage</b></div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderLightbulb()}
          {this.renderDryingMachine()}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderLaptop()}
          {this.renderAirConditioner()}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderTelevision()}
          {this.renderHeater()}
        </div>
        <div style={styles.section1Utility.utilityRow}>
          {this.renderWashingMachine()}
          {this.renderCar()}
        </div>
        <div style={styles.section1Utility.totalEnergy}>
          Your Estimated Total Monthly Energy Usage = {this.state.totalHouseEnergy} <img alt=""src={Image.lightbulb.medium} />
        </div>
        <ContinueButton href="#section1CompareResult" narration="Click 'Continue' To Compare Your Result With Your Neighbour "/>
      </ProgressBarContainer>
    );
  }

  renderSection1CompareResult() {
    return (
      <ProgressBarContainer section="section1CompareResult" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Compare With Your Neighbour
        </div>
        <HorizontalLine section />
        <div style={styles.universal.smallFont}>Compare <b>Your Monthly Energy Usage</b> with Your Neighbours</div>
        <table align="center" style={{width: "90%", textAlign: "center"}}>
          <thead>
            <tr style={styles.universal.mediumFont}>
              <td style={{paddingBottom: "15px", textAlign: "left", paddingLeft: "50px"}}>Utilities</td>
              <td style={{paddingBottom: "15px"}}>Your House</td>
              <td style={{paddingBottom: "15px"}}>Your Neighbours</td>
              <td style={{paddingBottom: "15px"}}>Result</td>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Lightbulb</td>
              <td style={{paddingBottom: "10px"}}>{this.state.lightbulbEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.LIGHTBULB}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.lightbulbEnergy <= NEIGHBOUR.LIGHTBULB ? Color.green : Color.red
                }}>
                {this.state.lightbulbEnergy <= NEIGHBOUR.LIGHTBULB ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Laptop</td>
              <td style={{paddingBottom: "10px"}}>{this.state.laptopEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.LAPTOP}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.laptopEnergy <= NEIGHBOUR.LAPTOP ? Color.green : Color.red
                }}>
                {this.state.laptopEnergy <= NEIGHBOUR.LAPTOP ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Television</td>
              <td style={{paddingBottom: "10px"}}>{this.state.televisionEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.TELEVISION}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.televisionEnergy <= NEIGHBOUR.TELEVISION ? Color.green : Color.red
                }}>
                {this.state.televisionEnergy <= NEIGHBOUR.TELEVISION ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Washing Machine</td>
              <td style={{paddingBottom: "10px"}}>{this.state.washingMachineEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.WASHING_MACHINE}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.washingMachineEnergy <= NEIGHBOUR.WASHING_MACHINE ? Color.green : Color.red
                }}>
                {this.state.washingMachineEnergy <= NEIGHBOUR.WASHING_MACHINE ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Dryer</td>
              <td style={{paddingBottom: "10px"}}>{this.state.dryingMachineEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.DRYING_MACHINE}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.dryingMachineEnergy <= NEIGHBOUR.DRYING_MACHINE ? Color.green : Color.red
                }}>
                {this.state.dryingMachineEnergy <= NEIGHBOUR.DRYING_MACHINE ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Air Conditioner</td>
              <td style={{paddingBottom: "10px"}}>{this.state.airConditionerEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.AIR_CONDITIONER}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.airConditionerEnergy <= NEIGHBOUR.AIR_CONDITIONER ? Color.green : Color.red
                }}>
                {this.state.airConditionerEnergy <= NEIGHBOUR.AIR_CONDITIONER ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Heater</td>
              <td style={{paddingBottom: "10px"}}>{this.state.heaterEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.HEATER}&nbsp;<img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.heaterEnergy <= NEIGHBOUR.HEATER ? Color.green : Color.red
                }}>
                {this.state.heaterEnergy <= NEIGHBOUR.HEATER ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.smallFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Car</td>
              <td style={{paddingBottom: "10px"}}>{this.state.carEnergy} <img alt=""src={Image.lightbulb.small} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.CAR} <img alt=""src={Image.lightbulb.small} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.carEnergy <= NEIGHBOUR.CAR ? Color.green : Color.red
                }}>
                {this.state.carEnergy <= NEIGHBOUR.CAR ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
            <tr style={styles.universal.mediumFont}>
              <td style={{paddingBottom: "10px", textAlign: "left", paddingLeft: "50px"}}>Total Energy</td>
              <td style={{paddingBottom: "10px"}}>{this.state.totalHouseEnergy} <img alt=""src={Image.lightbulb.medium} /></td>
              <td style={{paddingBottom: "10px"}}>{NEIGHBOUR.TOTAL}&nbsp;<img alt=""src={Image.lightbulb.medium} /></td>
              <td
                style={{
                  paddingBottom: "10px",
                  color: this.state.totalHouseEnergy <= NEIGHBOUR.TOTAL ? Color.green : Color.red
                }}>
                {this.state.totalHouseEnergy <= NEIGHBOUR.TOTAL ? "Less Than Average" : "More Than Average"}
              </td>
            </tr>
          </tbody>
        </table>
        <ContinueButton href="#section1Suggestion" narration="Click 'Continue' to Learn How Can You Save More Energy"/>
      </ProgressBarContainer>
    );
  }

  renderSection1Suggestion() {
    return (
      <ProgressBarContainer section="section1Suggestion" progress="home">
        <div style={styles.universal.sectionHeadline}>
          Energy Saving Tips
        </div>
        <HorizontalLine section />
        <div style={styles.universal.mediumFont}>
          Would you like to save by reducing your energy consumption? Here are some tips to get started.
        </div>     
        <div style={{fontSize: Metric.font.size.small, fontWeight: Metric.font.weight.medium, color: Color.red, padding: "5px 0"}}>
          Focus your improvements on the red areas.
        </div>
        <div style={styles.section1Suggestion.utilityRow}>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.lightbulbEnergy <= NEIGHBOUR.LIGHTBULB ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Lightbulb</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li>Use sunlight during the daytime</li>
                <li>Choose <b>Compact Fluorescent Lights (CFL) Lighbulbs over Incandescent Lightbulbs</b>. CFL is about a dollar more per bulb but it uses 70% less electricity and last much longer than traditional lightbulbs.</li>
              </ol>
            </div>
          </div>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.dryingMachineEnergy <= NEIGHBOUR.DRYING_MACHINE ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Dryer</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li>The best way to save energy with your dryer is <b>not to use it</b>. If the weather outside is <b>dry, sunny and windy</b>, You should <b>hang out your clothes outside instead of using a dryer</b>.</li>
                <li>Use your dryer with a full load of laundry</li>
              </ol>
            </div>
          </div>
        </div>
        <div style={styles.section1Suggestion.utilityRow}>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.laptopEnergy <= NEIGHBOUR.LAPTOP ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Laptop</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li>Activate <b>your laptop's Battery Saver or Eco mode</b></li>
                <li>Disable <b>all unused devices and ports</b> such as your keyboard, mouse, and speaker</li>
                <li>Turn Off Apps and Processes that you don't use</li>
              </ol>
            </div>
          </div>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.airConditionerEnergy <= NEIGHBOUR.AIR_CONDITIONER ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Air Conditioner</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li><b>Use an A/C Programmable Thermostat</b> to increase the temperature when you leave or asleep</li>
                <li><b>Use an Electric Fan</b> if necessary. The cost and energy consumed by an air conditioner is <b>36 times more than an electric ceiling fan</b>.</li>
              </ol>
            </div>
          </div>
        </div>
        <div style={styles.section1Suggestion.utilityRow}>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.televisionEnergy <= NEIGHBOUR.TELEVISION ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Television</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li><b>Watching TV on your laptop is 3 times cheaper than watching on a TV itself.</b></li>
                <li>Get the family to watch TV together.</li>
                <li>Lower the contrast and brightness on your set and watch TV in low light.</li>
              </ol>
            </div>
          </div>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.heaterEnergy <= NEIGHBOUR.HEATER ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Heater</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li><b>Use a Programmable Thermostat</b> to optimize the energy usage. This can save up 15% of your normal energy.</li>
                <li>Use a heater for a small part of your house instead of heating up the entire house.</li>
              </ol>
            </div>
          </div>
        </div>
        <div style={styles.section1Suggestion.utilityRow}>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.washingMachineEnergy <= NEIGHBOUR.WASHING_MACHINE ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Washing Machine</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li>You can save a lot of energy by <b>simply washing your clothes in cold water</b>, which is a perfectly efficient way to clean most clothes. </li>
                <li>Use your washing machine with a full load of laundry</li>
              </ol>
            </div>
          </div>
          <div style={{
            width: "45%",
            height: "150px",
            textAlign: "left",
            border: "2px solid " + ( this.state.carEnergy <= NEIGHBOUR.CAR ? Color.green : Color.red ),
            borderRadius: "3px",
            borderShadow: "2px",
            padding: "5px 10px"
          }}>
            <div style={styles.section1Suggestion.utilityHeader}>Car</div>
            <div style={styles.section1Suggestion.utilitySliderContainer}>
              <ol>
                <li><b>Use public transportation</b> such as buses and trains</li>
                <li>Drive sensibly. According to US Department of Energy, <b>rapid acceleration and hard braking are the quickest way to waste gas</b>.</li>
                <li><b>Avoid idling.</b> It can consume up to half a gallon of fuel per hour. </li>
              </ol>
            </div>
          </div>
        </div>
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
        <div style={{fontSize: Metric.font.size.extraLarge, fontWeight: Metric.font.weight.medium}}>
          We have seen how energy choices effect your home, <br />what happens when we make energy choices for our city?
        </div>
        <img alt="" src={Image.city.city_full} />
        <div style={styles.universal.mediumFont}>
          How much energy do you think your city (with 280,000 housholds) uses per month?
        </div>

        <div style={{fontSize: Metric.font.size.medium, fontWeight: Metric.font.weight.regular}}>
          Hint: Your household total was {this.state.totalHouseEnergy} <img alt=""src={Image.lightbulb.small} />
        </div>
        <div className="row h-40">
          <span className="col-sm-4">
            <QuizButton href="#section2Quiz" text="Less than 1 Billion "/>
          </span>
          <span className="col-sm-4">
            <QuizButton href="#section2Quiz" text="Between 1 and 5 Billion"/>
          </span>
          <span className="col-sm-4">
            <QuizButton href="#section2Quiz" text="More than 5 Billion" />
          </span >
        </div>
        </ProgressBarContainer>
    );
  }




    renderSection2Quiz() {
    return (
      <ProgressBarContainer section="section2Quiz" progress="city">
        <div style={styles.universal.sectionHeadline}>
          Energy Intuition
        </div>
        <HorizontalLine section />

        <div style={styles.universal.largeFont_reg}>
          On average, your city uses an estimated 4.4 Billion <img alt=""src={Image.lightbulb.medium} /> of energy per month for a total cost of ${ this.state.city_energy_budget }M
        </div>

        <div className="row ">
          <span className="col-sm-6">
            <Bar data={this.state.data1} />
          </span>

          <span className="col-sm-6">
            <div style={{fontSize: Metric.font.size.large, fontWeight: Metric.font.weight.medium, textAlign: "justify"}}>
              Average monthy energy spending in the U.S. is ${(219.34/12).toFixed(2)} Billion. This graph shows the geographic breakdown of that spending.
            </div>
          </span>
        </div>

        <ContinueButton href="#section2EnergySources" />
      </ProgressBarContainer>
    );
  }


renderSection2EnergySources() {
    return (
      <ProgressBarContainer section="section2EnergySources"  progress="city" >
        <div style={styles.universal.sectionHeadline}>
          Energy Intuition
        </div>
        <HorizontalLine section />

        <div style={styles.universal.largeFont_reg}>
        Let's explore the Energy source percentage breakdown for your city:
        </div>

                    <Doughnut data={this.state.energy_source_data} ref='section2EnergySources'/>
            <div style={{fontSize: Metric.font.size.smallFont, fontWeight: Metric.font.weight.medium, textAlign: "justify"}}>
            Each sclice represents the percentage of the 4.4 Billion <img alt=""src={Image.lightbulb.medium}/> generated by that energy source.
            </div>

        <ContinueButton href="#section2Quiz2" />
      </ProgressBarContainer>
    );
  }


    renderSection2Quiz2() {
    return (
      <ProgressBarContainer section="section2Quiz2" progress="city">
        <div style={styles.universal.sectionHeadline}>
          Energy Intuition
        </div>
        <HorizontalLine section />

        <div style={styles.universal.largeFont_reg}>
          Now imagine the mayor of your city asks you to find the optimal energy source portfolio to save the city the most money possible. What would you choose?
        </div>

        <div className="row h-40">
          <span className="col-sm-4">
            <Quiz2Button href="#section2Doughnut" text="Increase Wind  by 50% (reducing everything else equally)"/>
          </span>
          <span className="col-sm-4">
            <Quiz2Button href="#section2Doughnut" text="Increase Coal by 50% (reducing everything else equally)"/>
          </span>
          <span className="col-sm-4">
            <Quiz2Button href="#section2Doughnut" text="Increase Nuclear by 50% (reducing everything else equally)" />
          </span >
        </div>

      </ProgressBarContainer>
    );
  }







  renderSection2Doughnut() {

    var res =
    <ProgressBarContainer section="section2Doughnut" progress="city">
      <div style={styles.universal.sectionHeadlineSub}>
        $5 Million Energy Challenge:
      </div>
      <HorizontalLine section />
      <div className="row ">
        <span className="col-sm-4">
          <div className="row">
            <Doughnut
              ref='section2Doughnut'
              data={this.state.energy_source_data}
              width="80%"
              height="80%"
              onElementsClick={(elem) =>
              { if (elem.length > 0) {
                var updated_cost = 0
                console.log()
                var energySourceDataCopy = this.state.energy_source_data;
                energySourceDataCopy.datasets[0]["data"][elem[0]["_index"]] *= 1.1;
                var total = 0
                for (var i = 0; i < energySourceDataCopy.datasets[0]["data"].length; i++) {
                  total+= energySourceDataCopy.datasets[0]["data"][i];
                }
                for (var j = 0; j < energySourceDataCopy.datasets[0]["data"].length; j++) {
                  energySourceDataCopy.datasets[0]["data"][j]/= total;
                  energySourceDataCopy.datasets[0]["data"][j] = energySourceDataCopy.datasets[0]["data"][j].toFixed(4)*100
                  updated_cost+=this.state.cost_per_kwh[j]*energySourceDataCopy.datasets[0]["data"][j]*265/100
                }
                this.setState({city_energy_cost: updated_cost.toFixed(2)})
                this.setState({current_source: Object.assign({}, this.state.energy_data_details[elem[0]["_index"]])});
                this.state.shouldHide = false
                this.setState({energy_source_data: Object.assign({}, energySourceDataCopy)});
              }
            }} />
          </div>
    <div className="row">
      <div style={styles.universal.grey_box}>
       Hover over the energy sources in this graph to learn the facts about each source. Click on a source to increase it.
      </div>
    </div>
  </span>
  <span className="col-sm-8 ">

    <div style={styles.universal.mediumFont}>
       Is it possible to save your city $5M per month simply by adjusting its energy portfolio? <div style={styles.universal.smallFont}>Click on a section of the graph to use more of that energy source and see how it affects your Total Savings. </div>
    </div>         
    <div style={{fontSize: Metric.font.size.large, fontWeight: Metric.font.weight.bold}}>Monthly Energy Consumption:</div>
    <div style={{fontSize: Metric.font.size.medium, fontWeight: Metric.font.weight.regular}}>
      City Budget: ${ this.state.city_energy_budget }M
      | Total Cost: ${ this.state.city_energy_cost }M
      <div style={styles.universal.smallFont}> Total Savings:
        <p style={this.state.city_energy_budget - this.state.city_energy_cost >=0 ? styles.universal.smallFont_positive : styles.universal.smallFont_negative}> ${ (this.state.city_energy_budget - this.state.city_energy_cost).toFixed(2) }M
        </p></div>

        <div style={this.state.shouldHide ? {display: 'none'} : styles.universal.grey_box }>
          <p style={{fontSize: Metric.font.size.large, fontWeight: Metric.font.weight.regular, marginBottom: "0"}}> {this.state.current_source["Name"]} </p>
          <div className="row ">
            <span className="col-sm-4" style={{padding: "0 10px"}}>
              <p style={styles.universal.smallFont_left}>         <p style={styles.universal.smallFont_positive}>
              Advantages:  </p>{nl2br(this.state.current_source["Advantages"])}
            </p></span>
           <span className="col-sm-4" style={{padding: "0 10px"}}>
            <p style={styles.universal.smallFont_left}>
              <p style={styles.universal.smallFont_negative}>
              Disadvantages:
              </p>
              {nl2br(this.state.current_source["Disadvantages"])}
            </p>
          </span>
           <span className="col-sm-4" style={{padding: "0 10px"}}>
             <p style={styles.universal.smallFont_left}>
              <p style={styles.universal.smallFont_bold}>
              Total Cost: ${this.state.current_source["cost_per_kwh"]}/KWH</p>
              Infrastructure Cost: ${this.state.current_source["c_cost"]}/KWH
              <br/>
              Fuel Generation Cost: ${this.state.current_source["o_cost"]} /KWH
            </p>
          </span>
        </div>

      </div>
    </div>
  </span>
</div>
<ContinueButton href="#section2Eco" />
</ProgressBarContainer>;

    return(res);
  }

  renderSection2Eco() {
    return (
      <ProgressBarContainer section="section2Eco" progress="city">
        <div style={styles.universal.sectionHeadline}>
          My City: Environmental Impacts
        </div>
        <HorizontalLine section />
        <div style={styles.universal.largeFont_reg}>
          What happens when we factor environmental impacts into the energy decisions for our city?
        </div>
        <img alt="" src={Image.city.city_full} />
        <div style={styles.universal.mediumFont}>
            Energy sources contribute differently to harmful emissions. Let's explore.
        </div>
        <ContinueButton href="#section2DoughnutEco" />
      </ProgressBarContainer>
    );
  }

  renderSection2DoughnutEco() {

    return (
      <ProgressBarContainer section="section2DoughnutEco" progress="city">
        <div style={styles.universal.sectionHeadlineSub}>
          $5M Energy Challenge: Round 2
        </div>
        <HorizontalLine section />
        <div className="row ">
          <span className="col-sm-4">
            <div className="row">
              <Doughnut
                ref="section2DoughnutEco"
                data={this.state.energy_source_data}
                width="80%"
                height="80%"
                onElementsClick={(elem) => {
                  if (elem.length > 0) {
                    var s = false
                    var updated_cost = 0
                    var updated_co2 = 0
                    var energySourceDataCopy = this.state.energy_source_data;
                    energySourceDataCopy.datasets[0]["data"][elem[0]["_index"]] *= 1.1;
                    var total = 0
                    for (var i = 0; i < energySourceDataCopy.datasets[0]["data"].length; i++) {
                      total+= energySourceDataCopy.datasets[0]["data"][i];
                    }

                    for (var j = 0; j < energySourceDataCopy.datasets[0]["data"].length; j++) {
                      energySourceDataCopy.datasets[0]["data"][j]/= total;
                      
                      energySourceDataCopy.datasets[0]["data"][j] = energySourceDataCopy.datasets[0]["data"][j].toFixed(3)*100

                      updated_cost+=this.state.cost_per_kwh[j]*energySourceDataCopy.datasets[0]["data"][j]*265/100
                      updated_co2 +=this.state.co[j]*energySourceDataCopy.datasets[0]["data"][j]*265/100
                    }
                  this.setState({
                    city_energy_cost: updated_cost.toFixed(2),
                    current_source: Object.assign({}, this.state.energy_data_details[elem[0]["_index"]]),
                    shouldHide: false,
                    energy_source_data: Object.assign({}, energySourceDataCopy),
                    shouldHide: s,
                    total_co2: updated_co2
                  });
                }
              }} />
            </div>
            <div className="row">
              <div style={styles.universal.grey_box}>
                Hover over the energy sources in this graph to learn the facts about each source. Click on a source to increase it.
              </div>
            </div>
          </span>
          <span className="col-sm-8">
            <div style={{fontSize: Metric.font.size.large, fontWeight: Metric.font.weight.bold}}>Can you save your city $5M AND save 50,000 tons of CO<sub>2</sub> from being emitted?</div>
            <div style={{fontSize: Metric.font.size.medium, fontWeight: Metric.font.weight.regular}}>
              City Budget: ${ this.state.city_energy_budget }M
              | Total Cost: ${ this.state.city_energy_cost }M
              <div style={styles.universal.smallFont}> Total Savings:
                <p style={this.state.city_energy_budget - this.state.city_energy_cost >=0 ? styles.universal.smallFont_positive : styles.universal.smallFont_negative}>
                  ${ (this.state.city_energy_budget - this.state.city_energy_cost).toFixed(2) }M
                </p>
              </div>

              <p style={(this.state.total_co2 - this.state.original_co2) >=0 ?  styles.universal.smallFont_negative : styles.universal.smallFont_positive}>
                Additional CO<sub>2</sub>: {(this.state.total_co2 - this.state.original_co2).toFixed(2)} Tons
              </p>

              <div style={this.state.shouldHide ? {display: 'none'} : {
                fontSize: Metric.font.size.medium,
                fontWeight: Metric.font.weight.regular,
                margin: "0 0",
                backgroundColor: "#C9DAE1",
                padding: "30px",
                borderRadius: "25px"
              } }>
                <p style={{fontSize: Metric.font.size.large, fontWeight: Metric.font.weight.regular, marginBottom: "0"}}> {this.state.current_source["Name"]} </p>
                <div className="row ">
                  <span className="col-sm-4" style={{padding: "0 10px"}}>
                    <p style={styles.universal.smallFont_left}>
                      <p style={styles.universal.smallFont_positive}>
                        Advantages:
                      </p>
                      {nl2br(this.state.current_source["Advantages"])}
                    </p>
                  </span>

                  <span className="col-sm-4" style={{padding: "0 10px"}}>
                   <p style={styles.universal.smallFont_left}>
                     <p style={styles.universal.smallFont_negative}>
                     Disadvantages:
                     </p>
                     {nl2br(this.state.current_source["Disadvantages"])}
                   </p>
                 </span>

                 <span className="col-sm-4" style={{padding: "0 10px"}}>
                   <p style={styles.universal.smallFont_left}>
                    <p style={styles.universal.smallFont_bold}>
                      Total Cost: ${this.state.current_source["cost_per_kwh"]}/KWH
                    </p>
                    Infrastructure Cost: ${this.state.current_source["c_cost"]}/KWH
                    <br/>
                    Fuel Generation Cost: ${this.state.current_source["o_cost"]} /KWH
                    <br/>
                  </p>
                </span>


                
            </div>

   CO<sub>2</sub> emissions: {this.state.current_source["co"]} g/KWH


          </div>


        </div>

      </span>
    </div>
    <ContinueButton href="#section3Comparison" />
    </ProgressBarContainer>
    );
  }


  renderSection3Comparison() {
    return (
      <ProgressBarContainer section="section3Comparison" progress="world">
        <div style={styles.universal.sectionHeadline}>
          Section 3: My World
        </div>
        <HorizontalLine section />
        <div style={styles.universal.largeFont}>
          So, what does this mean for the planet?
        </div>
        <div className="row" style={styles.universal.mediumFont}>
         <span className="col-sm-6" style={styles.section3Comparison.listText}>
          If every house were like my house...
          <ul style={{fontWeight: Metric.font.weight.regular, fontSize: Metric.font.size.medium}}>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>0.5° C</b> of temperature increase prevented by 2050</li>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>{(100 * this.calculateNeighborDifference()).toFixed(1)}%</b> <img alt=""src={Image.lightbulb.small} /> {this.householdPercentDifferenceText()} energy consumption per month</li>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>{this.calculateHouseholdGlobalImpact()} trillion</b> <img alt=""src={Image.lightbulb.medium} /> {this.householdSavedText()} per month</li>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>${this.calculateHouseholdGlobalElectricityCost()} billion</b> {this.householdSavedMoneyText()} per month</li>
          </ul>
         </span>
         <span className="col-sm-6" style={styles.section3Comparison.listText}>
          If every city were like my city...
          <div>
            <Doughnut data={this.state.energy_source_data}/>
          </div>
          <ul style={{fontWeight: Metric.font.weight.regular, fontSize: Metric.font.size.medium}}>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>1° C</b> of temperature increase prevented by 2050</li>
            <li style={{marginTop: "20px"}}><b style={{fontSize: Metric.font.size.large}}>${this.calculateCityGlobalImpact()} billion</b> in {this.citySavedText()} monthly</li>
          </ul>
         </span>
        </div>
        <ContinueButton href="#lastPage" />
      </ProgressBarContainer>
    );
  }


  renderSection3Choices() { 
    // Note: unused
      return (
      <ProgressBarContainer section="section3Choices" progress="world">
        <div style={styles.universal.sectionHeadline}>
          Section 3: My World
        </div>
        <HorizontalLine section />
        <div style={styles.universal.largeFont}>
          What will you do to save?
        </div>
        <div style={styles.section3Choices.checkboxContainer}>
          <img
            style={styles.section3Choices.checkbox}
            alt=""
            src={this.state.solarPanelCheckbox ? Image.checkbox.checked : Image.checkbox.unchecked}
            onClick={() => {this.setState({solarPanelCheckbox: !this.state.solarPanelCheckbox});}}
          />
          <a
            style={styles.section3Choices.checkboxText}
            href="https://news.energysage.com/compare-solar-panel-prices-california/"
            target="_blank"
          >
            Install solar panels
          </a>
        </div>
        <div style={styles.section3Choices.checkboxContainer}>
          <img
            style={styles.section3Choices.checkbox}
            alt=""
            src={this.state.upgradeApplianceCheckbox ? Image.checkbox.checked : Image.checkbox.unchecked}
            onClick={() => {this.setState({upgradeApplianceCheckbox: !this.state.upgradeApplianceCheckbox});}}
          />
          <a
            style={styles.section3Choices.checkboxText}
            href="https://www.energyupgradeca.org/home-energy-efficiency/appliances/"
            target="_blank"
          >
            Upgrade my appliances
          </a>
        </div>
          <div style={styles.section3Choices.checkboxContainer}>
          <img
            style={styles.section3Choices.checkbox}
            alt=""
            src={this.state.energySavingTipsCheckbox ? Image.checkbox.checked : Image.checkbox.unchecked}
            onClick={() => {this.setState({energySavingTipsCheckbox: !this.state.energySavingTipsCheckbox});}}
          />
          <a
            style={styles.section3Choices.checkboxText}
            href="https://www.energyupgradeca.org/home-energy-efficiency/upgrading-your-home/"
            target="_blank"
          >
            Follow energy saving tips
          </a>
          </div>
          <div style={styles.section3Choices.checkboxContainer}>
          <img
            style={styles.section3Choices.checkbox}
            alt=""
            src={this.state.publicTransitCheckbox ? Image.checkbox.checked : Image.checkbox.unchecked}
            onClick={() => {this.setState({publicTransitCheckbox: !this.state.publicTransitCheckbox});}}
          />
          <a
            style={styles.section3Choices.checkboxText}
            href="http://www.iliveinthebayarea.com/knowledge-center/transit/"
            target="_blank"
          >
            Take more public transit
          </a>
          </div>
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
        <div style={{height: "20px"}} />
        <div style={styles.motivatingQuestion.subtitleContainer}>
          We can! You can.
        </div>
        <div style={{height: "20px"}} />
        <div style={styles.motivatingQuestion.descriptionContainer}>
          What’s good for the Earth can also be good for our wallets. You can save
          money by making choices in your home that also help keep the
          environment pure. The ideas here are only the beginning.
        </div>
        <div style={styles.motivatingQuestion.shareContainer}>
          Share your choice to save
        </div>
        <span>
          <ShareButton src={Image.share.facebook} href="https://facebook.com" alt="Facebook"/>
          <ShareButton src={Image.share.twitter} href="https://twitter.com" alt="Twitter"/>
          <ShareButton src={Image.share.email} href="https://www.google.com/gmail/" alt="Email"/>
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
      {this.renderSection2Introduction()}
      {this.renderSection2Quiz()}
      
      {this.renderSection2EnergySources()}
      {this.renderSection2Quiz2()}
      {this.renderSection2Doughnut()}
      {this.renderSection2Eco()}
      {this.renderSection2DoughnutEco()}
      {this.renderSection3Comparison()}
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
    sectionHeadlineSub: {
      fontFamily: Metric.font.family.headline,
      fontSize: Metric.font.size.extraLarge,
      color: Color.headline,
      textAlign: "center"
    },
    smallFont: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.regular,
      margin: "30px 0"
    },
    smallFont_left: {
      fontSize: Metric.font.size.small,
      fontWeight: Metric.font.weight.regular,
      margin: "30px 0",
      textAlign: "left",
    },
    mediumFont: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.medium,
      margin: "30px 0"
    },
    mediumFont_bold: {
      fontSize: Metric.font.size.large,
      fontWeight: Metric.font.weight.bold,
      margin: "30px 0"
    },
    largeFont: {
      fontSize: Metric.font.size.extraLarge,
      fontWeight: Metric.font.weight.bold,
      margin: "30px 0"
    },
    largeFont_reg: {
      fontSize: Metric.font.size.extraLarge,
      fontWeight: Metric.font.weight.regular,
      margin: "30px 0",
    },
    smallFont_negative: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.bold,
      color: "#E85349",
    },
    smallFont_positive: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.bold,
      color: "#3CB371"
    },
    smallFont_bold: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.bold,
    },
    grey_box: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.regular,
      margin: "20px 0",
      backgroundColor: "#C9DAE1",
      padding: "30px",
      borderRadius: "25px"
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
      width: "50%",
      textAlign: "justify",
      display: "block",
      margin: "0 auto",
      fontSize: Metric.font.size.medium,
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
      // bacskgroundColor: Color.sand,
      textAlign: "left",
      border: "1px solid grey",
      borderRadius: "3px"
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
      fontWeight: Metric.font.weight.light,
      width: "60px"
    },
    inputRange: {
      width: "200px",
      height: "5px",
      margin: "0 5px"
    },
    utilitySliderContainer: {
      display: "flex",
      flexDirection: "row"
    },
    utilityEnergyContainer: {
      padding: 0,
      backgroundColor: Color.oceanBlue,
      color: Color.white
    },
    utilityEnergyHeader: {
      fontSize: Metric.font.size.small,
      fontWeight: Metric.font.weight.medium,
      textAlign: "center",
      margin: "5px 0",
    },
    utilityEnergyNumber: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.medium,
      textAlign: "center"
    },
    utilityEnergyInform: {
      textAlign: "center",
      fontSize: Metric.font.size.tiny,
      fontWeight: Metric.font.weight.light,
      marginTop: "5px",
      color: Color.white
    },
    inputRadio: {
      margin: "0 5px"
    },
    whiteLightbulb: {
      tintColor: Color.white
    }
  },
  section1CompareResult: {
    mediumFont: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.medium
    }
  },
  section1Suggestion: {
    utilityRow: {
      width: "100%",
      height: "150px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      margin: "8px 0"
    },
    utilityContainer: {
      width: "45%",
      height: "100px",
      textAlign: "left",
      border: "1px solid grey",
      borderRadius: "3px",
      padding: "5px 10px"
    },
    utilityHeader: {
      fontSize: Metric.font.size.medium,
      fontWeight: Metric.font.weight.medium
    }
  },
  section3Comparison: {
    listText: {
      textAlign: "left"
    }
  },
  section3Choices: {
    checkboxContainer: {
      marginTop: "50px",
      paddingLeft: "50px",
      textAlign: "left"
    },
    checkbox: {
      width: "50px",
      height: "50px"
    },
    checkboxText: {
      paddingLeft: "40px",
      fontSize: Metric.font.size.medium,
      weight: Metric.font.weight.medium,
      textDecoration: "underline"
    }
  }
}


export default Main;
