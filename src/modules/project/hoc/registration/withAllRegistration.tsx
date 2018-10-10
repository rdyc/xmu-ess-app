import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { IProjectGetAllRequest } from '@project/classes/queries';
import { IProject } from '@project/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  projectState: IQueryCollectionState<IProjectGetAllRequest, IProject>;
}

export type WithAllRegistration = PropsFromState;

const withAllRegistration = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithAllRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withAllRegistrationSFC: React.SFC<WithAllRegistration> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetAll }: IAppState) => ({
    projectState: projectGetAll
  });

  return compose<WithAllRegistration, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withAllRegistrationSFC);
};

export default withAllRegistration;