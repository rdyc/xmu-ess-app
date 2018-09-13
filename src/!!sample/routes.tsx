import * as React from 'react';
import { Route, BrowserRouter, Switch, Redirect, RouteProps } from 'react-router-dom';

import Root from './components/layout/Root';
import Header from './components/layout/Header';
import CallbackPage from './pages/callback';
import IndexPage from './pages/index';
import WelcomePage from './pages/welcome';
import HeroesPage from './pages/heroes';
import TeamsPage from './pages/teams';
import userManager from './utils/userManager';

const fakeAuth = {
  isAuthenticated: false
};

const PrivateRoute: React.SFC<RouteProps> = ({ component, ...rest }) => (
  <Route {...rest} render={props => {    
    userManager.getUser().then(user => {
      fakeAuth.isAuthenticated = !user || user.expired ? false : true;
    });

    return ( 
      fakeAuth.isAuthenticated ? 
        React.createElement(component! as React.SFC<any>, props) : 
        (<Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>)
    );
  }}/>
);

const Routes: React.SFC = () => (
  <BrowserRouter>
    <Root>
      <Header title="Example App" />
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/callback" component={CallbackPage} />
        <PrivateRoute path="/welcome" component={WelcomePage} />
        <PrivateRoute path="/heroes" component={HeroesPage} />
        <PrivateRoute path="/teams" component={TeamsPage} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Root>
  </BrowserRouter>
);

export default Routes;