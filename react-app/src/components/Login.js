import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        FirstName: "",
        LastName: "",
        Username: "",
        Password: "",
      },
      submitted: false,
    }
    this.handleCChange = this.handleCChange.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    var valid = true;
    fetch(`http://localhost:8080/authenticate`, {
        method : 'POST', 
        body : JSON.stringify(this.state.formData),
    })
      .then(response => response.json())
        .then((data) => {
            if(data["username"] == "")
              valid = false;
        })
          .then(() => {
            if(valid == true){
                alert("Authentication Successful.");
                sessionStorage.setItem('username', this.state.formData.Username);
                this.props.history.push('/');
                window.location.reload();
            }
            else{
                alert("Authentication Failed.");
                this.props.history.push('/login');
                window.location.reload();
            }
        })
    }
  handleUSChange(event) {
    this.state.formData.Username = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.Password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">User Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" value={this.state.Username} onChange={this.handleUSChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.Password} onChange={this.handleCChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              Login successful.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default Login;