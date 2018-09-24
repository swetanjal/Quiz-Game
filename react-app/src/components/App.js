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
import Play from './Play';
import DeleteUser from './DeleteUser';
import ViewUsers from './ViewUsers';
import DeleteQuiz from './DeleteQuiz';
import DeleteQuestion from './DeleteQuestion';
import EditQuestion from './EditQuestion';
import UpdateQuestion from './UpdateQuestion';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ViewUser from './ViewUser';
import Leaderboard from './Leaderboard';
import LeaderboardGenre from './LeaderboardGenre';

class App extends Component {
  constructor()
  {
    super();
    this.adminPanel = this.adminPanel.bind(this);
    this.notLoggedPanel = this.notLoggedPanel.bind(this);
    this.userPanel = this.userPanel.bind(this);
  }
  adminPanel(){
    var disp = []
    disp.push(<li><Link to = {'/create/quiz'}>Create Quiz</Link></li>);
    disp.push(<li><Link to = {'/addproblem'}>Add Problem</Link></li>);
    disp.push(<li><Link to = {'/delete/question'}>Delete Question</Link></li>);
    disp.push(<li><Link to = {'/delete/quiz'}>Delete Quiz</Link></li>);
    disp.push(<li><Link to = {'/update/question'}>Update Question</Link></li>);
    disp.push(<li><Link to = {'/delete/users'}>Delete User</Link></li>);
    disp.push(<li><Link to = {'/view/users'}>Registered Users</Link></li>);
    disp.push(<li><Link to = {'/test'}>Test a Quiz</Link></li>);
    return disp;
  }
  userPanel(){
    var disp = []
    disp.push(<li><Link to={'/'}>Home</Link></li>);
    disp.push(<li><Link to={`/profile/${sessionStorage.getItem('username')}`}>My Attempted Quizes</Link></li>)
    disp.push(<li><Link to={'/play'}>Play!</Link></li>);
    disp.push(<li><Link to={'/leaderboard'}>Leaderboard</Link></li>)

    return disp;
  }
  notLoggedPanel(){
    var disp = []
    disp.push(<li><Link to={'/'}>Home</Link></li>);
    disp.push(<li><Link to={'/Signup'}>Signup</Link></li>);
    disp.push(<li><Link to={'/Login'}>Login</Link></li>);
    return disp;
  }

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
                  
                  { sessionStorage.getItem('username') == null &&
                    this.notLoggedPanel()
                  }
                  {
                    sessionStorage.getItem('username') == 'admin' &&
                    this.adminPanel()
                  }
                  {
                    sessionStorage.getItem('username') && sessionStorage.getItem('username') != 'admin' &&
                    this.userPanel()
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
                 <Route exact path='/play' component={Play} />
                 <Route exact path='/delete/users' component={DeleteUser} />
                 <Route exact path='/view/users' component={ViewUsers} />
                 <Route exact path='/delete/quiz' component={DeleteQuiz} />
                 <Route exact path='/delete/question' component={DeleteQuestion} />
                 <Route exact path='/edit/question/:id/:no' component={EditQuestion} />
                 <Route exact path='/update/question' component={UpdateQuestion} />
                 <Route exact path='/profile/:id' component={ViewUser} />
                 <Route exact path='/leaderboard' component={Leaderboard} />
                 <Route exact path='/leaderboard/:genre' component={LeaderboardGenre} />
                 <Route exact path='/test' component={Play} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
