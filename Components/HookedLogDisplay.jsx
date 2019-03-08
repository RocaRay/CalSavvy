import React, { useState, useEffect, useLayoutEffect } from 'react';

const HookedLogDisplay = props => {
  const [logState, setLogState] = useState({
    toRender: [(
      <div className="logHeaderRow">
        <div className="logHeaderItem">
          <h3>Date</h3>
        </div>
        <div className="logHeaderItem">
          <h3>Eaten</h3>
        </div>
        <div className="logHeaderItem">
          <h3>Cals</h3>
        </div>
      </div>)],
    superTotalCalories: 0
  })

  const fetchData = async() => {
    await fetch('/showAllDays')
    .then(response => response.json())
    .then(data => {
      data.forEach(dayObj => {
        //overall total cals
        let superTotalCalories = logState.superTotalCalories;
        superTotalCalories += dayObj.totalCalories;

        //handle "eaten" property objects
        let eatenArray = [];
        Object.entries(dayObj.eaten).forEach( (pair, index) => {
          eatenArray.push(<p className="eatenItem" key={index + 'pair'}>{pair[0]} : {pair[1]}</p>)
        })

        let newToRender = [...logState.toRender];
        newToRender.push((
        <div className="LogRow">
          <div className="LogRowItem">
            {new Date(dayObj.date).toLocaleString()}
          </div>
          <div className="LogRowItem">
            {eatenArray} 
          </div>
          <div className="LogRowItem">
            {dayObj.totalCalories} cal
          </div>
        </div>))
        setLogState({
          toRender: newToRender,
          superTotalCalories
        })
      })
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="topContainer">   
      <div id="LogDisplay">
        {logState.toRender}
      </div>
      <p id="TotalCaloriesDisplay">Total Calories: {logState.superTotalCalories}</p>
    </div>
  )
}

export default HookedLogDisplay;