import React from 'react';
import { Route, Switch }from 'react-router-dom';
import HomePage from './pages/home.page'
import ChartsExamplesPage from './pages/charts-examples.page'
import './App.css';

function App() {
  return (
      <div className="App">
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/charts' component={ChartsExamplesPage}/>
          </Switch>
    </div>
  );
}

export default App;
