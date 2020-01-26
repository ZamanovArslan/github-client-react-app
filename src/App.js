import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import styles from './assets/App.module.css';
import * as routes from './constants/routes';
import Repository from './Repository'
import Repositories from './Repositories'
import Homepage from './Homepage'
import Login from './Login'
import Navigation from './Navigation';
import Profile from './Profile';
import SearchRepositories from './SearchRepositories'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation/>
        <Container maxWidth="lg" id="container">
          <Router>
            <Switch>
              <Route path={routes.LOGIN} component={Login}/>
              <Route path={routes.ROOT} component={Homepage}/>
              <PrivateRoute path={routes.REPOSITORIES} component={Repositories}/>
              <PrivateRoute path={routes.REPOSITORY} component={Repository} />
              <PrivateRoute path={routes.PROFILE} component={Profile}/>
              <PrivateRoute path={routes.SEARCH} component={SearchRepositories}/>
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

function PrivateRoute ({ children, ...rest }) {
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

export default App;
