import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {
  constructor()
  {
  	super();
  	this.state = {
          data : [],
          dict : {},
      };
    this.sortOnKeys = this.sortOnKeys.bind(this);
    this.display = this.display.bind(this);
  }
  
  display() {
    var disp = []
    for(var item in this.state.dict){
        disp.push(<tr><td>{item}</td><td>{this.state.dict[item]}</td></tr>);
        
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


  componentDidMount() {
    const request1 = new Request(`http://127.0.0.1:8080/users`);
    const request = new Request(`http://127.0.0.1:8080/record`);
    
    fetch(request)
      .then(response => response.json())
        .then(data => {
            this.setState({data: data});
            fetch(request1)
                .then(response => response.json())
                    .then(dat => {
                        var Dict = {};
                        for(let i = 0; i < dat.length; i++)
                            Dict[dat[i].username] = 0;
                        //for(let i = 0; i < data.length; i++)
                        //    Dict[data[i].user_id] = 0;
                        for(let i = 0; i < data.length; i++){
                            Dict[data[i].user_id] += data[i].score;
                        }
                        Dict = this.sortOnKeys(Dict);
                        this.setState({dict : Dict});
                    });
        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Overall Leaderboard</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>{this.display()}
          </tbody>
		</table>
      </div>
    );
  }
}

export default Leaderboard;