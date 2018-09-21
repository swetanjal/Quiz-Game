import React, { Component } from 'react';
import './CreateQuiz.css';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name:"",
        genre:"",
      },
      submitted: false,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (event) {
    event.preventDefault();
    fetch(`http://localhost:8080/create/quiz`, {
        method : 'POST', 
        body : JSON.stringify(this.state.formData),
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
            alert("Quiz added successfully.");
            this.props.history.push('/');
            window.location.reload();
        }
      })
  }
  handleNameChange(event) {
    this.state.formData.name = event.target.value;
  }
  handleGenreChange(event) {
    this.state.formData.genre = event.target.value.toLowerCase();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a Quiz!</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            
            <div className="form-group">
                <label>Quiz Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGenreChange}/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              Question Added successfully.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}

export default CreateQuiz;