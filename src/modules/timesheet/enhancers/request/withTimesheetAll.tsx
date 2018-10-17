import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ITimesheetGetAllRequest } from '@timesheet/classes/queries';
import { ITimesheet } from '@timesheet/classes/response';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

interface PropsFromState {
  timesheetAllState: IQueryCollectionState<ITimesheetGetAllRequest, ITimesheet>;
}

export type WithTimesheetAll = PropsFromState;

const withTimesheetAll = (WrappedComponent: React.ComponentType) => {
  const displayName = `WithTimesheetAll(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  const withTimesheetAllWrapper: React.SFC<WithTimesheetAll> = props => <WrappedComponent {...props} />;

  const mapStateToProps = ({ timesheetGetAll }: IAppState) => ({
    timesheetAllState: timesheetGetAll
  });

  return compose<WithTimesheetAll, {}>(
    setDisplayName(displayName),
    connect(mapStateToProps)
  )(withTimesheetAllWrapper);
};

export default withTimesheetAll;