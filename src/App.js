import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
