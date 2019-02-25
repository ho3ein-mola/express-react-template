import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor()
  {
    super();
    this.state = {};
  }
  componentDidMount(){
    fetch('http://localhost:3001/test')
    .then(response => response.json())
    .then(data => this.setState(data));
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.a}</h1>
      </div>
    );
  }
}

export default App;
