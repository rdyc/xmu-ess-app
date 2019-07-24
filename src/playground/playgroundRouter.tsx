import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

import { SimpleForm } from './formik/SimpleForm';
import { MarkdownForm } from './markdown/form/MarkdownForm';
import { PlayMarkdown } from './markdown/PlayMarkdown';
import { DemoSinglePage } from './pages/DemoSinglePage';
import { Enhancer } from './recompose/Enhancer';
import { ComplexEditor } from './redux/form/complex';
import { UploadEditor } from './redux/form/upload';

// import { DemoCollectionPage } from './pages/DemoCollectionPage';
type AllProps = RouteComponentProps;

const complex = () => <ComplexEditor/>;
const upload = () => <UploadEditor/>;
const enhancer = () => <Enhancer initialCount={0} />;
// const demoCollection = () => <DemoListPage/>;
const demoSingle = () => <DemoSinglePage/>;

export const playgroundRouter: React.SFC<AllProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/pages/demo/single/:projectUid`} component={demoSingle} />
    {/* <Route path={`${props.match.path}/pages/demo/collection`} component={demoCollection} /> */}
    <Route path={`${props.match.path}/redux/form/complex`} component={complex} />
    <Route path={`${props.match.path}/redux/form/upload`} component={upload} />
    <Route path={`${props.match.path}/formik/simpleform`} component={() => <SimpleForm/>} />
    <Route path={`${props.match.path}/recompose/enhancer`} component={enhancer} />
    <Route path={`${props.match.path}/markdown/satu`} component={PlayMarkdown} />
    <Route path={`${props.match.path}/markdown/dua`} component={MarkdownForm} />
  </Switch>
);