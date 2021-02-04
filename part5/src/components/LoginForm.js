import React from 'react'
import ErrorNotification from './ErrorNotification'

const LoginForm = (props) => (
    <div>
        <h1>log in to application</h1>
        <ErrorNotification errMsg={props.errorMessage}/>
        <form onSubmit={props.clickLogin}>
          <div>
            username 
            <input 
              type="text" 
              value={props.username}
              name="Username"
              onChange={props.handleUsernameInput}
            />
          </div>
          <div>
            password 
              <input 
                type="password"
                value={props.password}
                name="Password"
                onChange={props.handlePasswordInput} 
              />
          </div>
          <button type="submit">login</button>
        </form>
    </div>
)

export default LoginForm