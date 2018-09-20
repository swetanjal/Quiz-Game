import React, { Component } from 'react';
import ViewQuiz from './ViewQuiz';
import Home from './Home';
import Score from './Score';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiz Game</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Create Person</Link></li>
                  <li><Link to={'/EditPerson'}>Edit Person</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/quiz/:number' component={ViewQuiz} />
                 <Route exact path='/score/:id/:score' component={Score} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
