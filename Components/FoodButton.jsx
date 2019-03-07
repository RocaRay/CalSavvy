import React, { Component } from 'react';

const FoodButton = props => {
    return (
      <button className="FoodButtonClass" onClick={(event) => props.addItemAndCalories(props.name, props.calorieAmount) }>{props.name}<img className="FoodImage" src={props.src}></img></button>
    )
}
// <img src={props.src}></img>
// {props.name}
export default FoodButton;