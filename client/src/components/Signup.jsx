import React, { Component } from 'react';

class Signup extends Component {
  constructor () {
    super();

    this.state = {
      email: '',
      password: '',
      showError: false
    }
  }

  handleSubmitForm = async (event) => {
    event.preventDefault()

    const { email, password } = this.state;
    const { handleSignUp } = this.props;

    try {
      await handleSignUp({
        email, password
      })
    } catch (e) {
      this.setState({ 
        showError: true 
      })
    }
  }

  handleTextInput = (event) => {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState(state => {
      return { [fieldName]: value }
    })
  }

  render () {
    const { showError } = this.state;

    let errorMessage

    if (showError) {
      errorMessage = (
        <div className='error-message'>
          <span>An error occured, please try again</span>
        </div>
      )
    }

    return (
      <div>
          <h2>Signup</h2>
        { errorMessage }
        <form className='login-form' onSubmit={this.handleSubmitForm}>

          <div>
            <input className='login-input' type='text' name='email' onChange={this.handleTextInput} value={this.state.email} placeholder='Email'/>
          </div>

          <div>
            <input className='login-input' type='password' name='password' onChange={this.handleTextInput} value={this.state.password} placeholder='Password'/>
          </div>

          <button className='login-btn'>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Signup;
