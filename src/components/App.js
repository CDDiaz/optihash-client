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
import Card from './Card';





const SERVERURL = 'https://optihash-server.herokuapp.com';
// const SERVERURL = 'http://localhost:3001';

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
          <nav class="navbar">
            <div className="nav-content">
              <div className = "title">
               <h1><Link to="/">OptiHash</Link></h1>
              </div>

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
            </div>
          </nav>

          <div className="body-content">
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


              <Route
                exact
                path='/coin/:id'
                component={Coin}
              />
              <Route
                exact
                path='/card/:id'
                component={Card}
              />


            </Switch>
          </div>


          <div className="footer">

            <div className="footer-content">
              <ul>
                <li>
                 <Link to="/"> Home </Link>
                </li>

                <li>
                 <Link to="/coins"> Coins </Link>
                </li>

                <li>
                 <Link to="/cards"> GPU Mining </Link>
                </li>

                <li>Contact</li>

              </ul>
              <div>
                <p>&copy; Copyright 2021</p>
              </div>
            </div>
          </div>
        </Router>

      </div>
    );
  }
}
export default App;
