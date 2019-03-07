import React, { Component } from 'react';



class LogDisplay extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
    }
  }

  componentDidMount() {
    fetch('/showAllDays')
    .then(response => response.json())
    .then(data => {
      data.forEach(dayObj => {
        //overall total cals
        let superTotalCalories = this.state.superTotalCalories;
        superTotalCalories += dayObj.totalCalories;

        //handle "eaten" property objects
        let eatenArray = [];
        Object.entries(dayObj.eaten).forEach( (pair, index) => {
          eatenArray.push(<p className="eatenItem" key={index + 'pair'}>{pair[0]} : {pair[1]}</p>)
        })

        let newToRender = [...this.state.toRender];

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

        this.setState({
          toRender: newToRender,
          superTotalCalories
        })
      })
    })
  }

  render() {
    return (
      <div className="topContainer">   
        <div id="LogDisplay">
          {this.state.toRender}
        </div>
        <p id="TotalCaloriesDisplay">Total Calories: {this.state.superTotalCalories}</p>
      </div>
    )
  }
}

export default LogDisplay;