import React, { Component } from 'react';
import './CreateQuestion.css';

class CreateQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        Quiz_id: "",
        Q_No: "",
        Q: "",
        OptA: "",
        OptB: "",
        OptC: "",
        OptD: "",
        A_correct: 0,
        B_correct: 0,
        C_correct: 0,
        D_correct: 0,
      },
      count : 0,
      submitted: false,
    }
    this.handleqChange = this.handleqChange.bind(this);
    this.handleoptAChange = this.handleoptAChange.bind(this);
    this.handleoptBChange = this.handleoptBChange.bind(this);
    this.handleoptCChange = this.handleoptCChange.bind(this);
    this.handleoptDChange = this.handleoptDChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }
  componentDidMount(){
      this.state.formData.Quiz_id = parseInt(this.props.match.params.id);
      const request = new Request(`http://localhost:8080/questions/${this.props.match.params.id}`);
      fetch(request)
      .then(response => response.json())
        .then((data) => {
                        for(let i = 0; i < data.length; ++i){
                          this.setState({count : Math.max(this.state.count, data[i]["q_no"])});
                        }                  
      });
  }
  handleSubmit (event) {
    event.preventDefault();
    this.state.formData.Q_No = this.state.count + 1;
    fetch(`http://localhost:8080/create/question`, {
        method : 'POST', 
        body : JSON.stringify(this.state.formData),
    })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
            alert("Question added successfully.");
            this.props.history.push('/');
            window.location.reload();
        }
      })
  }
  handleqChange(event) {
    this.state.formData.Q = event.target.value;
  }
  handleoptAChange(event) {
    this.state.formData.OptA = event.target.value;
  }
  handleoptBChange(event) {
    this.state.formData.OptB = event.target.value;
  }
  handleoptCChange(event) {
    this.state.formData.OptC = event.target.value;
  }
  handleoptDChange(event) {
    this.state.formData.OptD = event.target.value;
  }
  handleOptionChange(event){
    if(event.target.checked == true){
        this.state.formData[event.target.name] = 1;
    }
    else
      this.state.formData[event.target.name] = 0;
  }
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a Question for Quiz {this.props.match.params.id}</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.Q} onChange={this.handleqChange}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.OptA} onChange={this.handleoptAChange}/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.OptB} onChange={this.handleoptBChange}/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.OptC} onChange={this.handleoptCChange}/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.OptD} onChange={this.handleoptDChange}/>
            </div>
            <div>
                <label><input type = "checkbox" name = "A_correct" onChange = {this.handleOptionChange}/>A</label><br/>
                <label><input type = "checkbox" name = "B_correct" onChange = {this.handleOptionChange}/>B</label><br/>
                <label><input type = "checkbox" name = "C_correct" onChange = {this.handleOptionChange}/>C</label><br/>
                <label><input type = "checkbox" name = "D_correct" onChange = {this.handleOptionChange}/>D</label><br/>
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

export default CreateQuestion;