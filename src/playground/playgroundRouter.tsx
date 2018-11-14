import { Layout } from '@layout/components/base';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';

import { DemoCollectionPage } from './pages/DemoCollectionPage';
import { Enhancer } from './recompose/Enhancer';
import { ComplexEditor } from './redux/form/complex';

type AllProps = RouteComponentProps;

const complex = () => <ComplexEditor/>;
const enhancer = () => <Enhancer initialCount={0} />;
const demoCollection = () => <DemoCollectionPage/>;

export const playgroundRouter: React.SFC<AllProps> = props => (
  <Layout>
    <Route path={`${props.match.path}/pages/demo/collection/:id`} component={complex} />
    <Route path={`${props.match.path}/pages/demo/collection`} component={demoCollection} />
    <Route path={`${props.match.path}/redux/form/complex`} component={complex} />
    <Route path={`${props.match.path}/recompose/enhancer`} component={enhancer} />
  </Layout>
);