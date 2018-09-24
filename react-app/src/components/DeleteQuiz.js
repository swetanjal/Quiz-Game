import React, { Component } from 'react';
import './DeleteQuiz.css';

class DeleteQuiz extends Component {
  constructor()
  {
  	super();
  	this.state = {
  		data : [],
  		id : 0
  	};
  	this.handleChange = this.handleChange.bind(this);
  	this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
  this.setState({
    id: event.target.value
  });
  }
  
  handleSubmit(event) {
  	event.preventDefault();
  	fetch('http://127.0.0.1:8080/delete/quiz/' + this.state.id, {
  		method : 'DELETE'
      })
  		.then(res => {  
            window.location.reload();
  			console.log(res);
  		})
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
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Quiz</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Quiz ID</th>
              <th>Quiz Name</th>
              <th>Genre</th>
              
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td><input
               	  		type = "radio"
               	  		value = {item.id}
               	  		checked = {this.state.id == item.id}
               	  		onChange={this.handleChange}
               	  	/></td>
                  	<td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    </tr>
                )
             })}
          </tbody>
		</table>
		<button type="submit">Delete</button>
		</form>
      </div>
    );
  }
}

export default DeleteQuiz;