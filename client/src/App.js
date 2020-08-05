import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import HomePage from './pages/home.page'
import ChartsExamplesPage from './pages/charts-examples.page'
import './App.css';
import AnalyticsPage from './pages/analytics';


function App() {
    useEffect(() => {
        
        ReactGA.initialize('UA-174274577-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

    }, [])
  return (
      <div className="App">
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/charts' component={ChartsExamplesPage} />
              <Route exact path='/analytics' component={AnalyticsPage} />
             
          </Switch>
    </div>
  );
}

export default App;
