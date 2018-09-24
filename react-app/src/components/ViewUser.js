import React, { Component } from 'react';
import './ViewUser.css';

class ViewUser extends Component {
  constructor()
  {
  	super();
  	this.state = {
  		data : [],
  	};
  }
  
  componentDidMount() {
    const request = new Request(`http://127.0.0.1:8080/record/${this.props.match.params.id}`);
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Attempted Quizes of User {this.props.match.params.id}</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Quiz ID</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td>{item.quiz_id}</td>
                    <td>{item.score}</td>
                    </tr>
                )
             })}
          </tbody>
		</table>
      </div>
    );
  }
}

export default ViewUser;