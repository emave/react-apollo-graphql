import React, {useState} from 'react';
import './App.css';
import * as routes from './routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from './Components/Profile';
import Organization from './Components/Organization/Organization';
import Navigation from "./Components/Navigation";

function App() {
  const [organizationName, setOrganizationName] = useState('the-road-to-learn-react');

  return <Router>
    <div className="App">
      <Navigation organizationName={organizationName} setOrganizationName={setOrganizationName}/>
      <div className="App-main">
        <Route
            exact
            path={routes.ORGANIZATION}
            component={() => (
                <div className="App-content_large-header">
                  <Organization organizationName={organizationName}/>
                </div>
            )}
        />
        <Route
            exact
            path={routes.PROFILE}
            component={() => (
                <div className="App-content_small-header">
                  <Profile />
                </div>
            )}
        />
      </div>
    </div>
  </Router>
}

export default App;
