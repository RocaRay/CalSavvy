import React from 'react';
const { Component } = require('react');
import ReactDOM from 'react-dom';
require('./index.css');
import FoodDisplay from '../Components/FoodDisplay.jsx';
import ButtonsContainer from '../Containers/ButtonsContainer.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      eaten: {},
      totalCalories: 0,
      detailedCalories: {}
    };
    this.addItemAndCalories = this.addItemAndCalories.bind(this);
    this.logDay = this.logDay.bind(this);
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
      eaten: newEaten,
      totalCalories: newCalories,
      detailedCalories: newDetailedCalories
    })
  }

  logDay() {
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
      eaten: {},
      totalCalories: 0,
      detailedCalories: {}
    })
  }
  
  render() {
    return (
      <div>
        <div className="container">
          <FoodDisplay eaten={this.state.eaten} totalCalories={this.state.totalCalories} detailedCalories={this.state.detailedCalories}/>
        </div>
        <div id="ButtonsContainer">
          <ButtonsContainer addItemAndCalories={this.addItemAndCalories} logDay={this.logDay}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));