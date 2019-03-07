import React, { Component } from 'react';
import Modal from 'react-modal';
import FoodButton from '../Components/FoodButton';
import bagelImage from '../src/assets/bagel.jpeg';
import appleImage from '../src/assets/apple.jpeg';
import bananaImage from '../src/assets/banana.jpeg';
import cupNoodlesImage from '../src/assets/cupnoodles.jpeg';
import welchsImage from '../src/assets/welchs.jpeg';
import takisImage from '../src/assets/takis.jpeg';

class ButtonsContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteAllLogs = this.deleteAllLogs.bind(this);
  }

  openModal() {
    this.setState({
      modalOpen: true
    })
  } 

  closeModal() {
    this.setState({
      modalOpen: false
    })
  }

  deleteAllLogs() {
    fetch('/', {method: 'delete'})
      .then(response => response.json());
    this.props.toggleDisplay();
    this.closeModal();
  }

  render() {
    const formSubmitfx = (event) => {
      event.preventDefault();
      let foodinput = document.getElementById('foodinput').value;
      let formattedfoodinput = foodinput.replace( foodinput[0], foodinput[0].toUpperCase()); //guarantee capitalized first letter
      let calorieinput = Number(document.getElementById('calorieinput').value);
      this.props.addItemAndCalories(formattedfoodinput, calorieinput);
      document.getElementById('foodinput').value = '';
      document.getElementById('calorieinput').value = '';
    }

    return (
      <div>
        <FoodButton src={bagelImage} name="Bagel" calorieAmount={240} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton src={appleImage} name="Apple" calorieAmount={80} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton src={bananaImage} name="Banana" calorieAmount={105} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton src={cupNoodlesImage} name="Cup Noodles" calorieAmount={290} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton src={welchsImage} name="Welch's" calorieAmount={130} addItemAndCalories={this.props.addItemAndCalories}/>
        <FoodButton src={takisImage} name="Takis" calorieAmount={180} addItemAndCalories={this.props.addItemAndCalories}/>
        <div id="lowerButtonsContainer">
          <form id="customInputForm" onSubmit={formSubmitfx}>
            <input id="foodinput" type="text" placeholder="Enter food" required></input>
            <input id="calorieinput" type="number" placeholder="Enter calories" required></input>
            <input id="customsubmit" type="submit"></input>
          </form>
          <button id="LogDayButton" onClick={this.props.logDay}>Log Day</button>
          <button id="ShowAllDaysButton" onClick={this.props.toggleDisplay}>Show All Days</button>
          <button id="DeleteLogsButton" onClick={this.openModal}>Delete All Logs</button>
          <Modal isOpen={this.state.modalOpen}>
            <p>Are you sure you want to delete your logs?</p>
            <button onClick={this.deleteAllLogs}>Yes</button> 
            <button onClick={this.closeModal}>Cancel</button>
          </Modal>
        </div>
      </div>
    )
  }
}

export default ButtonsContainer;