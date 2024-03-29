import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { signup, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

const ErrorMessage = styled.div`
  color: red;
`;

export default function SignupPage() {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    setErrorMessage(null);
    signup(nickname, username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/');
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        nickname: <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </div>
      <div>
        username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password:{' '}
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button>註冊</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
