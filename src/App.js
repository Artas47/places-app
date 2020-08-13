import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Main from './components/main/main';
import BackgroundVideo from './components/video/video';

function App() {
  return (
    <div style={{ position: 'relative' }}>
      <Router>
        <Header />
        <BackgroundVideo />
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
