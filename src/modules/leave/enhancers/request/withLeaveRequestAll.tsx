import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ILeaveRequestGetAllRequest } from '@leave/classes/queries';
import { ILeaveRequest } from '@leave/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  leaveRequestAllState: IQueryCollectionState<ILeaveRequestGetAllRequest, ILeaveRequest>;
}

export type WithLeaveRequestAll = PropsFromState;

const withLeaveRequestAll = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithLeaveRequestAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withLeaveRequestAllWrapper: React.SFC<WithLeaveRequestAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ leaveRequestGetAll }: IAppState) => ({
    leaveRequestAllState: leaveRequestGetAll
  });

  return compose<WithLeaveRequestAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withLeaveRequestAllWrapper);
};

export default withLeaveRequestAll;