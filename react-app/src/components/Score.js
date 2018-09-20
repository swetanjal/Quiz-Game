import React, { Component } from 'react';
import './Score.css';
class Score extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
          </header>
          <h1 className="App-title">Your Score : {this.props.match.params.score}</h1>
        </div>
      );
    }
  }
  
  export default Score;