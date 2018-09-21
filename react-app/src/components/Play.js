import React, { Component } from 'react';
import './Play.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Play extends Component {
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
    const request = new Request('http://127.0.0.1:8080/quizes');
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
                    <td>{this.state.quizes[i]["genre"]}</td>
                    <td><Link to={`/quiz/${i + 1}`}>Play</Link></td>
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

export default Play;