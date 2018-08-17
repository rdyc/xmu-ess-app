import * as React from 'react'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Root from './components/layout/Root'
import Header from './components/layout/Header'
import CallbackPage from './pages/callback'
import IndexPage from './pages/index'
import WelcomePage from './pages/welcome'
import HeroesPage from './pages/heroes'
import TeamsPage from './pages/teams'

const Routes: React.SFC = () => (
  <BrowserRouter>
    <Root>
      <Header title="Example App" />
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/home" component={WelcomePage} />
        <Route path="/heroes" component={HeroesPage} />
        <Route path="/teams" component={TeamsPage} />
        <Route path="/callback" component={CallbackPage} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Root>
  </BrowserRouter>
)

export default Routes
