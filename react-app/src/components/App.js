import React, { Component } from 'react';
import ViewQuiz from './ViewQuiz';
import Home from './Home';
import Score from './Score';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import CreateQuestion from './CreateQuestion';
import CreateQuiz from './CreateQuiz';
import AddProblem from'./AddProblem';
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
                  { sessionStorage.getItem('username') == null &&
                    <li><Link to={'/Signup'}>Signup</Link></li>
                  }
                  { sessionStorage.getItem('username') == null &&
                    <li><Link to={'/Login'}>Login</Link></li>
                  }
                  { sessionStorage.getItem('username') &&
                    <li><Link to={'/Logout'}>Logout</Link></li>
                  }
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/quiz/:number' component={ViewQuiz} />
                 <Route exact path='/score/:id/:score' component={Score} />
                 <Route exact path='/signup' component={Signup} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/create/question/:id' component={CreateQuestion} />
                 <Route exact path='/create/quiz' component={CreateQuiz} />
                 <Route exact path='/addproblem' component={AddProblem} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
