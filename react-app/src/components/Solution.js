import React, { Component } from 'react';
import './Solution.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class Solution extends Component {
    constructor() {
        super();
        this.state = {
          quiz_data: {},
          questions : [],
          correct_options : [],
        };
        //this.handleSubmitForm = this.handleSubmitForm.bind(this);
        //this.handleInputChange = this.handleInputChange.bind(this);
        this.init = this.init.bind(this);
    }
    displayQuestions = () => {
        let disp = []
        let cnt = 0;
        for(let i = 0; i < this.state.questions.length; i++){
          disp.push(<p>{i + 1}) {this.state.questions[i]["q"]}</p>);
          disp.push(<img src = {this.state.questions[i]["img"]} alt = ""/>);
          disp.push(<div><label>
          <input name = {cnt} type = "checkbox" checked = {this.state.questions[i]["a_correct"]}/>
          {this.state.questions[i]["opta"]} 
          </label></div>);
          cnt = cnt + 1;
          disp.push(<div><label>
            <input name = {cnt} type = "checkbox" checked = {this.state.questions[i]["b_correct"]}/>
            {this.state.questions[i]["optb"]} 
            </label></div>);
          cnt = cnt + 1;
          disp.push(<div><label>
            <input name = {cnt} type = "checkbox" checked = {this.state.questions[i]["c_correct"]}/>
            {this.state.questions[i]["optc"]} 
            </label></div>);
          cnt = cnt + 1;
          disp.push(<div><label>
            <input name = {cnt} type = "checkbox" checked = {this.state.questions[i]["d_correct"]}/>
            {this.state.questions[i]["optd"]} 
            </label></div>);
          cnt = cnt + 1;
        }
        return disp;
    }
    init()
    {
        for(let i = 0; i < this.state.questions.length * 4; i++) {
            this.state.correct_options.push(0);
        }
    }
    componentDidMount(){
        var logged_in = sessionStorage.getItem('username')
        if (logged_in == null){
            alert("Please Log in to view content.");
            this.props.history.push('/login');
            return;
        }
        const {number} = this.props.match.params;
        
        const request = new Request(`http://localhost:8080/quiz/${number}`);
        const request1 = new Request(`http://localhost:8080/questions/${number}`);
        const request2 = new Request(`http://localhost:8080/verify/${number}/${logged_in}`);
        fetch(request2)
            .then(response => response.json())
            .then(data => {
                if(data["user_id"] === ""){
                    if(logged_in != 'admin'){
                        alert("You must attempt this quiz before viewing this content.");
                        this.props.history.push('/');
                    }
                }
                else
                {

                }
            })
        fetch(request)
            .then(response => response.json())
            .then(data => this.setState({quiz_data: data}));
        
        fetch(request1)
            .then(response => response.json())
                .then((data) => {this.setState({questions : data}); this.init();});
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Solution for Quiz {this.props.match.params.number}</h1>
        </header>
        <form>
          {this.displayQuestions()}
        </form>
      </div>
    );
  }
}

export default Solution;