import React, { useState } from 'react'
import ErrorNotification from './ErrorNotification'

const LoginForm = ({ submitLogin, errorMessage }) => {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameInput = (event) => setUserName(event.target.value)
  const handlePasswordInput = (event) => setPassword(event.target.value)

  const clickLogin = (event) => {
    event.preventDefault()

    submitLogin(username, password)

    setUserName('')
    setPassword('')
  }

  return (
    <div>
      <h1>log in to application</h1>
      <ErrorNotification errMsg={errorMessage}/>
      <form onSubmit={clickLogin}>
        <div>
            username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameInput}
          />
        </div>
        <div>
            password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordInput}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm