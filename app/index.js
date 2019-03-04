const React = require('react');
const { Component } = require('react');
const ReactDOM = require('react-dom');
require('./index.css');

class App extends Component {
  render() {
    return (
      <div>
        <p>Hello world</p>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));