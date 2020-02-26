import React, {useState} from 'react';
import styled from 'styled-components';

import {getURI} from '../utils';

const Login = styled(({className, history}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleSubmit = event => {
    event.preventDefault();
    fetch(`${getURI('imac-dev', 5000)}/api/user/authenticate`, {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          history.push('/');
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <div id="email">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div id="password">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div id="login-button">
            <input type="submit" value="Log in" />
          </div>
        </div>
      </form>
    </div>
  )
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #8fc7d8;
  #email {
    margin: 10px 0;
  };
  #password {
    margin: 10px 0;
  }
`

export default Login;