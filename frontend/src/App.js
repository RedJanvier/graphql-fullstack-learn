import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Auth from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import NavBar from './components/NavBar/NavBar';
import { GlobalContext } from './context/GlobalState';
import './App.css';

function App() {
  const { token } = useContext(GlobalContext);
  return (
    <div className="App">
      <Router>
        <>
          <NavBar />
          <main className="page">
            <Switch>
              {!token && <Redirect from="/" to="/auth" exact />}
              {!token && <Redirect from="/bookings" to="/auth" exact />}
              {token && <Redirect from="/" to="/events" exact />}
              {token && <Redirect from="/auth" to="/events" exact />}
              <Route path="/auth" component={Auth} />
              <Route path="/events" component={Events} />
              <Route path="/bookings" component={Bookings} />
            </Switch>
          </main>
        </>
      </Router>
    </div>
  );
}

export default App;
