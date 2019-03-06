import React, { Component } from 'react';

const LogDisplay = props => {
  let datesArray = [], ateArray = [], totalCaloriesArray = [];
  let superTotalCalories = 0;
  //Use lifecycle method: this code is not finishing before the render (?)
  fetch('/showAllDays')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach(dayObj => {
        datesArray.push(dayObj.date);
        ateArray.push(dayObj.eaten);
        totalCaloriesArray.push(dayObj.totalCalories);
        superTotalCalories += dayObj.totalCalories;
      })
      

    })
  return (
    <div>
      <div id="FoodDisplay">
        <div>
          <h3>Date</h3>
          <div>{datesArray}</div>
        </div>
        
        <div>
          <h3>Ate</h3>
          <div>{ateArray}</div>
        </div>

        <div>
          <h3>Day Total</h3>
          <div>{totalCaloriesArray}</div>
        </div>
      </div>
      <p id="TotalCaloriesDisplay">Total Calories: {superTotalCalories}</p>
    </div>
  )
}

export default LogDisplay;