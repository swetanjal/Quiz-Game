import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor()
  {
    super();
    this.state = {
      data : [],
    }
    this.display = this.display.bind(this);
    this.sortOnKeys = this.sortOnKeys.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  isAuthenticated() {
    let disp = [];
    if(sessionStorage.getItem('username') == null){
      
    }
    else {
      disp.push(<h3>Hello {sessionStorage.getItem('username')}!</h3>);
    }
    return disp;
  }
  sortOnKeys(dict) {
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });
      
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
    });
    //alert(items.toString());
    var tempDict = {}
    for (var c in items)
    {
        tempDict[items[c][0]] = items[c][1];
        //alert(items[c]);
    }
    return tempDict;
  }
  componentDidMount()
  {
    const request = new Request(`http://127.0.0.1:8080/quizes`);
    fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({data : data});
        })
  }
  display(){
    var disp = [];
    var dict = {};
    
      for(let i = 0; i < this.state.data.length; ++i){
        var fl = 1;
        for(let j = 0; j < i; j++){
          if(this.state.data[j]["genre"] === this.state.data[i]["genre"]){
            fl = 0;
            break;
          }
        }
        if(fl)
        disp.push(<li><Link to={`/play/${this.state.data[i]["genre"]}`}>{this.state.data[i]["genre"]}</Link></li>);
      }
      return disp;
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quiz Planet!</h1>
        </header>
        {this.isAuthenticated()}
        <h1>Popular Genres: </h1>
        {this.display()}
        
      </div>
    );
  }
}

export default Home;
