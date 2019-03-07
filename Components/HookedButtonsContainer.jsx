import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#app');
import FoodButton from '../Components/FoodButton';
import bagelImage from '../src/assets/bagel.jpeg';
import appleImage from '../src/assets/apple.jpeg';
import bananaImage from '../src/assets/banana.jpeg';
import cupNoodlesImage from '../src/assets/cupnoodles.jpeg';
import welchsImage from '../src/assets/welchs.jpeg';
import takisImage from '../src/assets/takis.jpeg';

const HookedButtonsContainer = props => {
  const [modalStatus, setmodalStatus] = useState(false)

  const deleteAllLogs = () => {
    fetch('/', {method: 'delete'})
      .then(response => response.json());
    toggleDisplay();
    setmodalStatus(false);
  }

  const addItemAndCalories = (item, amount) => {
    let newEaten = {...props.state.eaten};
    let newCalories = props.state.totalCalories + amount;
    let newDetailedCalories = {...props.state.detailedCalories};
    if (!newEaten[item]) newEaten[item] = 1;
    else newEaten[item] += 1;
    if (!newDetailedCalories[item]) newDetailedCalories[item] = amount;
    else newDetailedCalories[item] += amount;
    props.setState({
      ...props.state,
      eaten: newEaten,
      totalCalories: newCalories,
      detailedCalories: newDetailedCalories
    })
  }

  const formSubmitfx = (event) => {
    event.preventDefault();
    let foodinput = document.getElementById('foodinput').value;
    let formattedfoodinput = foodinput.replace( foodinput[0], foodinput[0].toUpperCase()); //guarantee capitalized first letter
    let calorieinput = Number(document.getElementById('calorieinput').value);
    addItemAndCalories(formattedfoodinput, calorieinput);
    foodinput = '';
    document.getElementById('calorieinput').value = '';
  }

  const logDay = () => {
    if (props.state.totalCalories == 0) return ; 
    fetch('/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: Date(Date.now()),
        eaten: {...props.state.eaten},
        totalCalories: props.state.totalCalories
      })
    }).then(response => response.json());
    props.setState({
      ...props.state,
      eaten: {},
      totalCalories: 0,
      detailedCalories: {}
    })
  }

  const toggleDisplay = () => {
    let buttonsCollection = document.getElementsByClassName('FoodButtonClass');
    if (props.mode === "track") {
      props.setMode("log");
      for (let i = 0; i < buttonsCollection.length; i++){ //enable food btns
        buttonsCollection[i].disabled = true;
      }
      document.getElementById('LogDayButton').disabled = true;
      document.getElementById('foodinput').disabled = true;
      document.getElementById('calorieinput').disabled = true;
      document.getElementById('customsubmit').disabled = true;
    }
    else {
      props.setMode("track");
      for (let i = 0; i < buttonsCollection.length; i++){ //disable food btns
        buttonsCollection[i].disabled = false;
      }
      document.getElementById('LogDayButton').disabled = false;
      document.getElementById('foodinput').disabled = false;
      document.getElementById('calorieinput').disabled = false;
      document.getElementById('customsubmit').disabled = false;
    }
  }

    return (
      <div>
        <FoodButton src={bagelImage} name="Bagel" calorieAmount={240} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <FoodButton src={appleImage} name="Apple" calorieAmount={80} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <FoodButton src={bananaImage} name="Banana" calorieAmount={105} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <FoodButton src={cupNoodlesImage} name="Cup Noodles" calorieAmount={290} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <FoodButton src={welchsImage} name="Welch's" calorieAmount={130} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <FoodButton src={takisImage} name="Takis" calorieAmount={180} setState={props.setState} state={props.state} addItemAndCalories={addItemAndCalories}/>
        <div id="lowerButtonsContainer">
          <form id="customInputForm" onSubmit={formSubmitfx}>
            <input id="foodinput" type="text" placeholder="Enter food" required></input>
            <input id="calorieinput" type="number" placeholder="Enter calories" required></input>
            <input id="customsubmit" type="submit"></input>
          </form>
          <button id="LogDayButton" onClick={logDay}>Log Day</button>
          <button id="ShowAllDaysButton" onClick={toggleDisplay}>Show All Days</button>
          <button id="DeleteLogsButton" onClick={() => setmodalStatus(true)}>Delete All Logs</button>
          <Modal className="modal" isOpen={modalStatus}>
            <p>Are you sure you want to delete your data?</p>
            <button onClick={deleteAllLogs}>Yes</button> 
            <button onClick={() => setmodalStatus(false)}>Cancel</button>
          </Modal>
        </div>
      </div>
    )
}

export default HookedButtonsContainer;