import React, { Component } from 'react';
import './UpdateQuestion.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class UpdateQuestion extends Component {
  constructor()
  {
  	super();
  	this.state = {
  		data : [],
        id : 0,
  	};
  	
    this.getID = this.getID.bind(this);
  }
  
  getID(a, b) {
      return a + "/" + b;
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
    const request = new Request('http://127.0.0.1:8080/questions');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Edit a Question</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Quiz ID</th>
              <th>Question Number</th>
              <th>Question Text</th>
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td><Link to={`/edit/question/${this.getID(item.quiz_id, item.q_no)}`}>Edit Question</Link></td>
                  	<td>{item.quiz_id}</td>
                    <td>{item.q_no}</td>
                    <td>{item.q}</td>
                    </tr>
                )
             })}
          </tbody>
		</table>
      </div>
    );
  }
}

export default UpdateQuestion;