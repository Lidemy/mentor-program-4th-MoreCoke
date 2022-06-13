import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { setAuthToken } from '../../utils';
import { loginAsync, getMeAsync } from '../../redux/slices/userSlice';

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrorMessage(null);
    dispatch(loginAsync(username, password)).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      dispatch(getMeAsync())
        .then(() => {
          history.push('/');
        })
        .catch((err) => {
          setAuthToken(null);
          setErrorMessage(err.toString());
        });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password{' '}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button>登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
