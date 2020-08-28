import React, { useLayoutEffect, useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.css';
import Header from './shared/components/navigation/header/header';
import BackgroundVideo from './shared/components/video/video';
import { GlobalStyles } from './globalStyles';
import Users from './user/pages/users';
import Places from './places/pages/places';
import NewPlace from './places/pages/new-place';
import Auth from './user/pages/auth';
import { AuthContext } from './shared/context/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(false);
  console.log('userId', userId);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>SPINNER</div>;
  }

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/places' exact>
          <Places />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/auth' exact>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <GlobalStyles />
      <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
        <Router>
          <Header />
          <BackgroundVideo />
          <main>{routes}</main>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
