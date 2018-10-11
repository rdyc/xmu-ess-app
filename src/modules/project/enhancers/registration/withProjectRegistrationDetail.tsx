import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  projectDetailState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

export type WithProjectRegistrationDetail = PropsFromState;

const withProjectRegistrationDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithProjectRegistrationDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withProjectRegistrationDetailWrapper: React.SFC<WithProjectRegistrationDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetById }: IAppState) => ({
    projectDetailState: projectGetById
  });

  return compose<WithProjectRegistrationDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withProjectRegistrationDetailWrapper);
};

export default withProjectRegistrationDetail;