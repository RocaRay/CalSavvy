import React, { Component } from 'react';

const FoodDisplay = props => {
  let foodArray = [];
  let amountsArray = [];
  let caloriesArray = [];

  // build food array and amounts array
  Object.entries(props.eaten).forEach( (foodCountPair, index) => {
    foodArray.push(<p key={index + 'food'}>{foodCountPair[0]}</p>)
    amountsArray.push(<p key={index + 'amount'}>{foodCountPair[1]}</p>)
  })

  //build calories array
  Object.values(props.detailedCalories).forEach((calories, index) => {
    caloriesArray.push(<p key={index + 'calories'}>{calories}</p>)
  })
    
  return (
    <div className="topContainer">
      <div id="FoodDisplay">
        <div>
          <h3>Food</h3>
          <div>{foodArray}</div>
        </div>

        <div>
          <h3>Amount</h3>
          <div>{amountsArray}</div>
        </div>
        
        <div>
          <h3>Calories</h3>
          <div>{caloriesArray}</div>
        </div>
      </div>
      <p id="TotalCaloriesDisplay">Total Calories: {props.totalCalories}</p>
    </div>
    
  )
}

export default FoodDisplay