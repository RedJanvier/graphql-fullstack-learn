import React, { useState, useContext } from 'react';

import { GlobalContext } from '../context/GlobalState';

import './Auth.css';

const Auth = () => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [form, changeForm] = useState('Login');
  const { login } = useContext(GlobalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody =
        form === 'Login'
          ? {
              query: `
                  query {
                      login (email: "${email}", password: "${password}") {
                          userId
                          token
                          tokenExpires
                      }
                  }
              `,
            }
          : {
              query: `
                  mutation {
                      createUser(inputUser: { email: "${email}", password: "${password}" }) {
                          _id
                          email
                      }
                  }
              `,
            };
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'Application/json',
        },
      });
      const data = await res.json();

      if (data.data.login.token.length) {
        login(data.data.login);
      } else {
        console.log('✔', data);
      }
    } catch (error) {
      console.log('❌', error);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => changeEmail(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => changePassword(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn">
            Submit
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => changeForm(form === 'Login' ? 'Register' : 'Login')}
          >
            switch to {form === 'Login' ? 'Register' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Auth;
