import React, { Component } from 'react';
import './AddProblem.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class AddProblem extends Component {
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
    var user = sessionStorage.getItem('username');
    if(user == 'admin'){

    }
    else{
      alert("You are not permitted to view the contents of this page!");
      this.props.history.push('/');
      window.location.reload();
    }
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
                    <td><Link to={`/create/question/${this.state.quizes[i]["id"]}`}>Add Problem</Link></td>
                    </tr>);
      }
      return disp;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Add Problems.</h1>
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

export default AddProblem;