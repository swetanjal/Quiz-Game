import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {
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
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleUSChange = this.handleUSChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    var valid = false;
    fetch(`http://localhost:8080/valid/${this.state.formData.Username}`)
      .then(response => response.json())
        .then((data) => {
            if(data["username"] == "")
              valid = true;
            //alert(valid);
        })
          .then(() => {
            if(valid == true){
              fetch('http://localhost:8080/create/user', {
                method: 'POST',
                body: JSON.stringify(this.state.formData),
                })
                .then(response => {
                  if(response.status >= 200 && response.status < 300)
                  this.setState({submitted: true});
                  this.props.history.push("/");
                  window.location.reload();
                });
              }
            });
  }

  handleUSChange(event) {
    this.state.formData.Username = event.target.value;
  }

  handleFChange(event) {
    this.state.formData.FirstName = event.target.value;
  }
  handleLChange(event) {
    this.state.formData.LastName = event.target.value;
  }
  handleCChange(event) {
    this.state.formData.Password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create Account</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.FirstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.LastName} onChange={this.handleLChange}/>
            </div>
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
              New person successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default Signup;
