import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetGetByIdRequest } from '@timesheet/classes/queries';
import { ITimesheetDetail } from '@timesheet/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  timesheetDetailState: IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail>;
}

export type WithTimesheetDetail = PropsFromState;

const withTimesheetDetail = (WrappedComponent: React.ComponentType) => { 
  const displayName = `WithTimesheetDetail(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  const withTimesheetDetailWrapper: React.SFC<WithTimesheetDetail> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ timesheetGetById }: IAppState) => ({
    timesheetDetailState: timesheetGetById
  });

  return compose<WithTimesheetDetail, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withTimesheetDetailWrapper);
};

export default withTimesheetDetail;