import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

// const SERVERURL = 'https://.herokuapp.com';
const SERVERURL = 'http://localhost:3001';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
     };
     this.getAccount=this.getAccount.bind(this);
  }
  componentWillMount() {
    this.getAccount();
    return this.props.loggedInStatus ? this.redirect() : null
  }

  getAccount(data){
    this.setState({email: data})
  }

  handleChange = (event) => {
    const {name, value} = event.target
    console.log('name, value', name, value)
    this.setState({
      [name]: value
    })
  };
  handleSubmit = (event) => {
    event.preventDefault()
    const {email, password} = this.state
    let user = {
      email: email,
      password: password
    }

    axios.post(SERVERURL+'/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/enter')
  }
  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })
        }
        </ul>
      </div>
    )
  }

  render() {
    const {email, password} = this.state
    return (
      <div className = "home">
        <h3>Log In</h3>
        <div className="form">
        <form onSubmit={this.handleSubmit}>
          Email: <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <br/>
          Password:<input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br/>
          <button placeholder="submit" type="submit">
            Log In
          </button>
          <div>
            <p><small>Don't have an account? <Link to="/signup"> Sign up</Link></small></p>
          </div>

          </form>
          </div>
          <div>
          {
            this.state.errors ? this.handleErrors() : null
          }
        </div>
      </div>
    );
  }
}

export default Login
