import React, { useState } from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
import FoodDisplay from '../Components/FoodDisplay.jsx';
import LogDisplay from '../Components/LogDisplay.jsx';
import HookedButtonsContainer from '../Components/HookedButtonsContainer.jsx';
import HookedLogDisplay from '../Components/HookedLogDisplay.jsx';

const App = () => {
  const[state, setState] = useState({
    eaten: {},
    totalCalories: 0,
    detailedCalories: {},
    totalWater: 0,
  })
  const [mode, setMode] = useState("track");
  
  let topContainer;
  if (mode === "track") {
    topContainer = (<div className="container">
    <FoodDisplay eaten={state.eaten} totalWater={state.totalWater} totalCalories={state.totalCalories} detailedCalories={state.detailedCalories} state={state}/>
  </div>)
  }
  if (mode === "log") {
    topContainer = (
      <div className="container"><LogDisplay/></div>
    )
  }
  return (
    <div>
      <h2 id="title">CodeSmith Calorie Tracker</h2>
        {topContainer}
      <div id="ButtonsContainer">
        <HookedButtonsContainer setState={setState} state={state} mode={mode} setMode={setMode}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));