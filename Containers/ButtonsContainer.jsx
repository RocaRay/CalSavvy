import React, { Component } from 'react';
import FoodButton from '../Components/FoodButton';

class ButtonsContainer extends Component {
  render() {
    return (
      <div>
        <FoodButton name="Bagel" calorieAmount={240} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton name="Apple" calorieAmount={80} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton name="Banana" calorieAmount={105} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton name="Cup Noodles" calorieAmount={290} addItemAndCalories={this.props.addItemAndCalories}/>
        <button id="LogDayButton" onClick={this.props.logDay}>Log Day</button>
        <button>Show All Days</button>
      </div>
    )
  }
}

export default ButtonsContainer;