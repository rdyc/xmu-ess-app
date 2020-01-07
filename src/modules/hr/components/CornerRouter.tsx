import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { HrCornerBlogDetail } from './corner/detail/blog/HrCornerBlogDetail';
import { HrCornerBlogByCategoryList } from './corner/list/blog/bycategory/HrCornerBlogByCategoryList';
import { HrCornerBlogList } from './corner/list/blog/HrCornerBlogList';

export const CornerRoutingComponents: React.SFC<RouteComponentProps> = props => (
  <Switch>
    <Route path={`${props.match.path}/:categorySlug/:pageSlug`} component={HrCornerBlogDetail} />
    <Route path={`${props.match.path}/:categorySlug`} component={HrCornerBlogByCategoryList} />
    <Route path={`${props.match.path}`} component={HrCornerBlogList} />
  </Switch>
);