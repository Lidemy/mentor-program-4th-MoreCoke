import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import DetailPage from '../../pages/DetailPage';
import PostPage from '../../pages/PostPage';
import Header from '../Header';
import { getMe } from '../../WebAPI';
import { setUser } from '../../redux/slices/userSlice';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        dispatch(setUser(response.data));
      }
    });
  }, []);

  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/posts/:pid">
            <DetailPage />
          </Route>
          <Route path="/new-post">
            <PostPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
