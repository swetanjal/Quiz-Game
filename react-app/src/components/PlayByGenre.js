import React, { Component } from 'react';
import './PlayByGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class PlayByGenre extends Component {
  constructor()
  {
  	super();

  	this.state = {
  		quizes : [],
  	};
  }
  
  handleChange(event) {
  this.setState({
    id: event.target.value
  });
  this.displayQuiz = this.displayQuiz.bind(this);
  }
  
  componentDidMount() {
    const request = new Request(`http://127.0.0.1:8080/get/quiz/${this.props.match.params.genre}`);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({quizes: data}))
  }
  displayQuiz() {
      var disp = [];
      for(let i = 0; i < this.state.quizes.length; ++i){
          disp.push(<tr>
                    <td>{this.state.quizes[i]["id"]}</td>
                    <td>{this.state.quizes[i]["name"]}</td>
                    <td><Link to={`/leaderboard/${this.state.quizes[i]["genre"]}`}>{this.state.quizes[i]["genre"]}</Link></td>
                    <td><Link to={`/quiz/${this.state.quizes[i]["id"]}`}>Play</Link></td>
                    </tr>);
      }
      return disp;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Select a Quiz to Play!</h1>
          
        </header>
        <h3><Link to={`/leaderboard/${this.props.match.params.genre}`}>Leaderboard for genre {this.props.match.params.genre}</Link></h3>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Quiz Name</th>
              <th>Genre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.displayQuiz()}</tbody>
		</table>
      </div>
    );
  }
}

export default PlayByGenre;