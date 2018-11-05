import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { ComplexEditor } from './redux/form/complex';

type AllProps = RouteComponentProps;

const complex = () => <ComplexEditor/>;

export const playgroundRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/redux/form/complex`} component={complex} />
  </Switch>
);