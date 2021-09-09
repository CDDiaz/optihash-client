import React, { Component } from 'react';
import axios from 'axios';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './css/App.scss';

import Home from './Home';
import Login from './registrations/Login';
import Signup from './registrations/Signup';
import Coins from './Coins';
import Coin from './Coin';
import Cards from './Cards';
import Cardsbackup from './Cardsbackup';


// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }
  componentDidMount() {
    this.loginStatus()
  }

  handleClick = () => { //logging out
    axios.delete(SERVERURL+'/logout', {withCredentials: true})
    .then(response => {
    this.handleLogout()
    this.history.push('/')
    })
    .catch(error => console.log(error))
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }
  render() {
    return (
      <div>
        <Router>
          <nav>
           <ul>
             <li>
             {this.state.isLoggedIn ?
               <Link to="/create">Create</Link> :
              null}
             </li>

             <li>
              <Link to="/"> Home </Link>
             </li>

             <li>
              <Link to="/coins"> Coins </Link>
             </li>

             <li>
              <Link to="/cards"> GPU Mining </Link>
             </li>
             <li>
              <Link to="/cardsbackup"> GPU Mining2 </Link>
             </li>

             <li>
               {!this.state.isLoggedIn ?
                 <Link to="/signup">Sign up</Link> :
                 null}
             </li>

             <li>
                {!this.state.isLoggedIn ? //shows if you aren't logged in
                 <Link to="/login">Log in</Link> :
                 <Link to="/logout" onClick={this.handleClick}>Log Out</Link>
                }
             </li>
           </ul>
          </nav>
          <div className = "title">
           <h2><Link to="/">OptiHash</Link></h2>
          </div>
          <Switch>
            <Route exact path='/' render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route
              exact path='/signup'
              render={props => (
              <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
              )}
            />
            <Route path='/logout'>
              <Home />
            </Route >
            <Route path='/coins'>
              <Coins />
            </Route >
            <Route path='/cards'>
              <Cards />
            </Route >
            <Route path='/cardsbackup'>
              <Cardsbackup />
            </Route >

            <Route
              exact
              path='/coin/:id'
              component={Coin}
            />


          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
