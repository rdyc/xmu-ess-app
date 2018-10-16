import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IProjectGetAllRequest } from '@project/classes/queries';
import { IProject } from '@project/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  projectAllState: IQueryCollectionState<IProjectGetAllRequest, IProject>;
}

export type WithProjectRegistrationAll = PropsFromState;

const withProjectRegistrationAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithProjectRegistrationAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withProjectRegistrationAllWrapper: React.SFC<WithProjectRegistrationAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetAll }: IAppState) => ({
    projectAllState: projectGetAll
  });

  return compose<WithProjectRegistrationAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withProjectRegistrationAllWrapper);
};

export default withProjectRegistrationAll;