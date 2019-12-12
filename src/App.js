import React from 'react';
import styles from './assets/App.module.css';
import Login from './Login'
import Logged from './Logged'
import Repositories from './Repositories'
import Homepage from './Homepage'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

function Routes(props) {
  return (
    <Container maxWidth="md">
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/repositories">
              <Repositories />
            </PrivateRoute>
            <Route path="/accessToken">
              <Logged />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('accessToken') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
export default Routes;
