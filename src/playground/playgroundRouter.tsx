import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { DemoCollectionPage } from './pages/DemoCollectionPage';
import { DemoSinglePage } from './pages/DemoSinglePage';
import { Enhancer } from './recompose/Enhancer';
import { ComplexEditor } from './redux/form/complex';

type AllProps = RouteComponentProps;

const complex = () => <ComplexEditor/>;
const enhancer = () => <Enhancer initialCount={0} />;
const demoCollection = () => <DemoCollectionPage/>;
const demoSingle = () => <DemoSinglePage/>;

export const playgroundRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/pages/demo/single/:projectUid`} component={demoSingle} />
    <Route path={`${props.match.path}/pages/demo/collection`} component={demoCollection} />
    <Route path={`${props.match.path}/redux/form/complex`} component={complex} />
    <Route path={`${props.match.path}/recompose/enhancer`} component={enhancer} />
  </Switch>
);