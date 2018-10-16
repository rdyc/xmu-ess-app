import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ILeaveRequestGetByIdRequest } from '@leave/classes/queries';
import { ILeaveRequestDetail } from '@leave/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  leaveRequestDetailState: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
}

export type WithLeaveRequestDetail = PropsFromState;

const withLeaveRequestDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithLeaveRequestDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withLeaveRequestDetailWrapper: React.SFC<WithLeaveRequestDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ leaveRequestGetById }: IAppState) => ({
    leaveRequestDetailState: leaveRequestGetById
  });

  return compose<WithLeaveRequestDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withLeaveRequestDetailWrapper);
};

export default withLeaveRequestDetail;