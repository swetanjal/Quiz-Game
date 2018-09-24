import React, { Component } from 'react';
import './ViewUsers.css';

class ViewUsers extends Component {
  constructor()
  {
  	super();
  	this.state = {
  		data : [],
  	};
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
    const request = new Request('http://127.0.0.1:8080/users');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Users</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              
            </tr>
          </thead>

          <tbody>{this.state.data.map((item, key) => {
               return (  
                  	<tr key = {key}>
                  	<td>{item.username}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    </tr>
                )
             })}
          </tbody>
		</table>
      </div>
    );
  }
}

export default ViewUsers;