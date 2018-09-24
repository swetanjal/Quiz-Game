import React, { Component } from 'react';
import './DeleteUser.css';

class DeleteUser extends Component {
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
  	fetch('http://127.0.0.1:8080/delete/user/' + this.state.id, {
  		method : 'DELETE'
  	})
  		.then(res => {
        fetch(`http://127.0.0.1:8080/delete/records/${this.state.id}`, {method : 'DELETE'})
        .then(response => {
          window.location.reload();
          console.log(res);
        })
        
  		})
  }
  
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/users');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a User</h1>
        </header>
        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td><input
               	  		type = "radio"
               	  		value = {item.username}
               	  		checked = {this.state.id == item.username}
               	  		onChange={this.handleChange}
               	  	/></td>
                  	<td>{item.username}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
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

export default DeleteUser;