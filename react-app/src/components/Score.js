import React, { Component } from 'react';
import './Score.css';
class Score extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Your Score : {this.props.match.params.score}</h1>
          </header>
        </div>
      );
    }
  }
  
  export default Score;