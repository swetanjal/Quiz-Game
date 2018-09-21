import React, { Component } from 'react';
import './Logout.css';

class Logout extends Component {
    
    componentDidMount() {
        sessionStorage.clear();
        this.props.history.push('/');
        window.location.reload();
    }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          {sessionStorage.getItem('username') && 
          <h1 className="App-title">Successfully Logged out.</h1>}
        </header>
      </div>
    );
  }
}

export default Logout;