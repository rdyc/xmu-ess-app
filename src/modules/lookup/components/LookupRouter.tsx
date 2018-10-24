import { LookupMileageExceptionDetail } from '@lookup/components/mileageException/detail/LookupMileageExceptionDetail';
// import LookupMileageExceptionEditor from '@lookup/components/mileageException/editor/LookupMileageExceptionEditor';
import { LookupMileageExceptionList } from '@lookup/components/mileageException/list/LookupMileageExceptionList';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';

type AllProps = RouteComponentProps;

const listMileageException = () => (
  <LookupMileageExceptionList orderBy="uid" direction="descending" />
);

const detailMileageException = () => <LookupMileageExceptionDetail />;

// const editorMileageException = () => <LookupMileageExceptionEditor />;

export const LookupRouter: React.SFC<AllProps> = props => (
  <Switch>
    {/* Mileage Exception */}
    <Route
      path={`${props.match.path}/mileageexception/list`}
      component={listMileageException}
    />
    <Route
      path={`${props.match.path}/mileageexception/details/:mileageExceptionUid`}
      component={detailMileageException}
    />
    {/* <Route
      path={`${props.match.path}/mileageexception/form`}
      component={editorMileageException}
    /> */}
  </Switch>
);
