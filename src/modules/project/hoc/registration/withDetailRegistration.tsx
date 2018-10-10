import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IProjectGetByIdRequest } from '@project/classes/queries';
import { IProjectDetail } from '@project/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  projectDetailState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
}

export type WithDetailRegistration = PropsFromState;

const withDetailRegistration = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithDetailRegistration(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withDetailRegistrationSFC: React.SFC<WithDetailRegistration> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ projectGetById }: IAppState) => ({
    projectDetailState: projectGetById
  });

  return compose<WithDetailRegistration, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withDetailRegistrationSFC);
};

export default withDetailRegistration;