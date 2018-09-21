import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'

class Home extends Component {
  constructor()
  {
    super();
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  isAuthenticated() {
    let disp = [];
    if(sessionStorage.getItem('username') == null){
      
    }
    else {
      disp.push(<h1>Hello {sessionStorage.getItem('username')}</h1>);
    }
    return disp;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {this.isAuthenticated()}
        <NewComponent text={"This text comes from another component called newComponent.js"}/>
        
      </div>
    );
  }
}

export default Home;
