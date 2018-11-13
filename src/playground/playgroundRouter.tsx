import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { Enhancer } from './recompose/Enhancer';
import { ComplexEditor } from './redux/form/complex';

type AllProps = RouteComponentProps;

const complex = () => <ComplexEditor/>;
const enhancer = () => <Enhancer initialCount={0} />;

export const playgroundRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/redux/form/complex`} component={complex} />
    <Route path={`${props.match.path}/recompose/enhancer`} component={enhancer} />
  </Switch>
);