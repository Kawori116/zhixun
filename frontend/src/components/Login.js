import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    
    if (match) {
        // console.log("getting cookie", match[2]);
        return match[2];
    }
    return "Cookie not found";
};

const Login = () => {

  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const csrfToken = getCookie('csrftoken');
        const csrfResponse = await axios.post('http://36.236.108.219:6001/csrf', {}, {
            headers: {
                'X-CSRF-Token': csrfToken
            }
        });

        console.log("csrf response: " + csrfResponse);
        const response = await axios.post('http://36.236.108.219:6001/login', {
            username: account,
            password: password
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
        
        console.log("token: " + token)
        const protectedResponse = await axios.get('http://36.236.108.219:6001/protected', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        setMessage('登入成功');

    } catch (error) {
      if (error.response) {
          setMessage(error.response.data.message);
      } else {
          setMessage('登入失敗');
      }
    }
  }

  return (
    <main className='form-container'>
      <form className="form" onSubmit={handleLogin}>
          <div className="text">Log In</div>
          <div className="form-label">
              <label>Account</label>
          </div>
          <div className="form-input">
              <input className="input" type="text" required placeholder="account" name="account"
                  value={account} onChange={(e) => setAccount(e.target.value)} />
          </div>
          <div className="form-label">
              <label>Password</label>
          </div>
          <div className="form-input">
              <input className="input" type="password" required placeholder="password" name="password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-btn">
              <button className="login-btn" type="submit">Log In</button>
          </div>
          {message && <div className="error-message">{message}</div>}
      </form>
  </main>
  );
};

export default Login;