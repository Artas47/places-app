import React, { useLayoutEffect, useState } from 'react';
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

function App() {
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <div>SPINNER</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <GlobalStyles />
      <Router>
        <Header />
        <BackgroundVideo />
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
      </Router>
    </div>
  );
}

export default App;
