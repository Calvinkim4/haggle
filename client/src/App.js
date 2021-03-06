import React, { Component } from 'react';
import './App.css';
import authService from './services/authService';
import { login, getProfile, signUp } from './services/apiService';
import MarketPlace from './components/MarketPlace';
import { Link, Route, Redirect } from 'react-router-dom';
import SpecificCategory from './components/SpecificCategory';
import Container from './components/Container';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      user: {},
      category: ''
    }
  }

  async componentDidMount() {
    try {
      const fetchedUser = await getProfile();

      const savedCategory = localStorage.getItem('category');

      this.setState({
        category: savedCategory,
        isSignedIn: authService.isAuthenticated(),
        user: fetchedUser
      })
    } catch (error) {
      console.log('Issue fetching token')
    }
  }

  signOut = () => {
    authService.signOut();
    this.setState({
      isSignedIn: false,
      user: {}
    })
  }

  loginUser = async (credentials) => {
    try {
      const user = await login(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (error) {
      throw error
    }

  }

  signUpUser = async (credentials) => {
    try {
      const user = await signUp(credentials)

      this.setState({
        isSignedIn: true,
        user: user
      })
    } catch (error) {
      throw error
    }
  }

  setCategory = (event) => {
      let value = event.target.type;
      this.setState({
          category: value
      })

      localStorage.setItem('category', value);
   }

   returnNavName = (isSignedIn) => {
     if (isSignedIn) {
       return 'DashBoard'
     } else {
       return 'LogIn/SignUp'
     }
   }


  render() {
    const { isSignedIn } = this.state  
    return (
      <div className="App">
        <Link className='nav-bar-link' to='/marketplace'><h1 className='title'>Haggle</h1></Link>
        <h2>Trade <span className='shit'>Shit</span> For Better <span className='shit'>Shit</span></h2>
        <nav className='nav-bar'>
          <Link className='nav-bar-link' to='/marketplace'><li>MarketPlace</li></Link>
          <Link className='nav-bar-link' to='dashboard'><li>{this.returnNavName(isSignedIn)}</li></Link>
        </nav>

        <main>
          <Route exact path="/" render={() => (<Redirect to="/marketplace"/>)}/>
          <Route exact path='/marketplace' render={(props) => <MarketPlace {...props} setCategory={this.setCategory} category={this.state.category}/>}/> 
          <Route exact path='/category' render={(props) => <SpecificCategory {...props} category={this.state.category} isSignedIn={isSignedIn}/>}/>    
          <Route exact path='/dashboard' render={(props) => <Container userId={this.state.user.id} username={this.state.user.username} isSignedIn={isSignedIn} handleLogin={this.loginUser} handleSignUp={this.signUpUser} signOut={this.signOut} {...props}/>}/>
        </main>
        
      </div>
    )
  }
  
}

export default App;
