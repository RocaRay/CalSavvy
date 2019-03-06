import React, { Component } from 'react';

const FoodButton = props => {
    return (
      <button onClick={(event) => props.addItemAndCalories(event.target.innerHTML, props.calorieAmount) }>{props.name}</button>
    )
}

export default FoodButton;