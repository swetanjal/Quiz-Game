import React, { Component } from 'react';
import './ViewQuiz.css';
import Score from './Score';

import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quiz_data: {},
      questions : [],
      correct_options : [],
    };
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.init = this.init.bind(this);
  }
  init()
  {
    for(let i = 0; i < this.state.questions.length * 4; i++) {
      this.state.correct_options.push(0);
    }
  }
  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    var logged_in = sessionStorage.getItem('username')
    if (logged_in == null){
      alert("Please Log in to play.");
      this.props.history.push('/login');
    }
    const {number} = this.props.match.params;
    
    const request = new Request(`http://localhost:8080/quiz/${number}`);
    const request1 = new Request(`http://localhost:8080/questions/${number}`);
    const request2 = new Request(`http://localhost:8080/verify/${number}/${logged_in}`);
    fetch(request2)
      .then(response => response.json())
        .then(data => {
          if(data["user_id"] === ""){
            
          }
          else
          {
            //alert(data["user_id"])
            if(data["user_id"] != 'admin'){
              alert("You have already attempted this quiz.");
              this.props.history.push('/');
            }
          }
        })
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({quiz_data: data}));
    
    fetch(request1)
      .then(response => response.json())
        .then((data) => {this.setState({questions : data}); this.init();});
  }
  handleInputChange(event) {
    if(event.target.checked == true)
      this.state.correct_options[event.target.name] = 1;
    else
      this.state.correct_options[event.target.name] = 0;
  }
  handleSubmitForm(event) {
    let answer = [];
    for(let i = 0; i < this.state.questions.length; i++){
      answer.push(this.state.questions[i]["a_correct"]);
      answer.push(this.state.questions[i]["b_correct"]);
      answer.push(this.state.questions[i]["c_correct"]);
      answer.push(this.state.questions[i]["d_correct"]);
    }
    var score = 0;
    for(let i = 0; i < this.state.correct_options.length; i = i + 4){
      if(this.state.correct_options[i] == answer[i] && this.state.correct_options[i + 1] == answer[i + 1]
         && this.state.correct_options[i + 2] == answer[i + 2]
          && this.state.correct_options[i + 3] == answer[i + 3])
          {
              score = score + 1;
          }
    }
    var dict = {}
    dict["user_id"] = sessionStorage.getItem('username');
    dict["quiz_id"] = parseInt(this.props.match.params.number);
    dict["score"] = score;
    if(dict["user_id"] == 'admin'){
      alert("Test Successful");
      this.props.history.push(`/score/${this.props.match.params.number}/${score}`);
      window.location.reload();
    }
    //alert(JSON.stringify(dict));
    const request = new Request(`http://localhost:8080/record`);
    fetch(request, {
      method : 'POST',
      body : JSON.stringify(dict),
    })
    this.props.history.push(`/score/${this.props.match.params.number}/${score}`);
    window.location.reload();
  }
  displayQuestions = () => {
    let disp = []
    let cnt = 0;
    for(let i = 0; i < this.state.questions.length; i++){
      disp.push(<p>{i + 1}) {this.state.questions[i]["q"]}</p>);
      disp.push(<div><label>
      <input name = {cnt} type = "checkbox" onChange = {this.handleInputChange} />
      {this.state.questions[i]["opta"]} 
      </label></div>);
      cnt = cnt + 1;
      disp.push(<div><label>
        <input name = {cnt} type = "checkbox" onChange = {this.handleInputChange} />
        {this.state.questions[i]["optb"]} 
        </label></div>);
      cnt = cnt + 1;
      disp.push(<div><label>
        <input name = {cnt} type = "checkbox" onChange = {this.handleInputChange} />
        {this.state.questions[i]["optc"]} 
        </label></div>);
      cnt = cnt + 1;
      disp.push(<div><label>
        <input name = {cnt} type = "checkbox" onChange = {this.handleInputChange} />
        {this.state.questions[i]["optd"]} 
        </label></div>);
      cnt = cnt + 1;
    }
    return disp;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz {this.props.match.params.number}</h1>
        </header>
        <h1>{this.state.quiz_data["name"]}</h1>
        <h2>Genre: {this.state.quiz_data["genre"]}</h2>
        <form onSubmit = {this.handleSubmitForm}>
          {this.displayQuestions()}
          <button type = "submit">Submit</button>
        </form>
        
      </div>
    );
  }
}

export default ViewQuiz;