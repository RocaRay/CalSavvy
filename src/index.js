import React from 'react';
const { Component } = require('react');
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
Modal.setAppElement('#app');
require('./index.css');
import FoodDisplay from '../Components/FoodDisplay.jsx';
import ButtonsContainer from '../Containers/ButtonsContainer.jsx';
import LogDisplay from '../Components/LogDisplay.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      eaten: {},
      totalCalories: 0,
      detailedCalories: {},
      mode: "track" 
    };
    this.addItemAndCalories = this.addItemAndCalories.bind(this);
    this.logDay = this.logDay.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  addItemAndCalories(item, amount) {
    let newEaten = {...this.state.eaten};
    let newCalories = this.state.totalCalories + amount;
    let newDetailedCalories = {...this.state.detailedCalories};
    if (!newEaten[item]) newEaten[item] = 1;
    else newEaten[item] += 1;
    if (!newDetailedCalories[item]) newDetailedCalories[item] = amount;
    else newDetailedCalories[item] += amount;
    
    this.setState({
      ...this.state,
      eaten: newEaten,
      totalCalories: newCalories,
      detailedCalories: newDetailedCalories
    })
  }

  logDay() {
    if (this.state.totalCalories == 0) return ; 
    fetch('/', {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        //create data object to post to MDB
        date: Date(Date.now()),
        eaten: {...this.state.eaten},
        totalCalories: this.state.totalCalories
      })
    }).then(response => response.json());

    this.setState({
      ...this.state,
      eaten: {},
      totalCalories: 0,
      detailedCalories: {}
    })
  }

  toggleDisplay() {
    let mode = this.state.mode;
    let buttonsCollection = document.getElementsByClassName('FoodButtonClass');
    if (this.state.mode === "track") {
      mode = "log";
      for (let i = 0; i < buttonsCollection.length; i++){ //enable food btns
        buttonsCollection[i].disabled = true;
      }
      document.getElementById('LogDayButton').disabled = true;
      document.getElementById('foodinput').disabled = true;
      document.getElementById('calorieinput').disabled = true;
      document.getElementById('customsubmit').disabled = true;
    }
    else {
      mode = "track";
      for (let i = 0; i < buttonsCollection.length; i++){ //disable food btns
        buttonsCollection[i].disabled = false;
      }
      document.getElementById('LogDayButton').disabled = false;
      document.getElementById('foodinput').disabled = false;
      document.getElementById('calorieinput').disabled = false;
      document.getElementById('customsubmit').disabled = false;
    }
    this.setState({
      ...this.state,
      mode
    })
  }
  
  render() {
    let topContainer;
    if (this.state.mode === "track") {
      topContainer = (<div className="container">
      <FoodDisplay eaten={this.state.eaten} totalCalories={this.state.totalCalories} detailedCalories={this.state.detailedCalories}/>
    </div>)
    }
    if (this.state.mode === "log") {
      topContainer = (
        <div className="container"><LogDisplay/></div>
      )
    }

    return (
      <div>
        <h2 id="title">CodeSmith Calorie Tracker</h2>
          {topContainer}
        <div id="ButtonsContainer">
          <ButtonsContainer addItemAndCalories={this.addItemAndCalories} logDay={this.logDay} toggleDisplay={this.toggleDisplay}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));