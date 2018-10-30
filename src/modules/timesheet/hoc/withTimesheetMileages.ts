import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { ITimesheetMileagesGetAllRequest } from '@timesheet/classes/queries/entry';
import { ITimesheetMileages } from '@timesheet/classes/response';
import {
  timesheetMileagesGetAllDispose,
  timesheetMileagesGetAllRequest
} from '@timesheet/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  timesheetMileagesState: IQueryCollectionState<ITimesheetMileagesGetAllRequest, ITimesheetMileages>;
}

interface PropsFromDispatch {
  timesheetMileagesDispatch: {
    loadAllMileages: typeof timesheetMileagesGetAllRequest;
    loadAllDispose: typeof timesheetMileagesGetAllDispose;
  };
}

export interface WithTimesheetMileages extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ timesheetMileagesGetAll }: IAppState) => ({
  timesheetMileagesState: timesheetMileagesGetAll
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timesheetMileagesDispatch: {
    loadAllMileages: (request: ITimesheetMileagesGetAllRequest) =>
      dispatch(timesheetMileagesGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetMileagesGetAllDispose())
  }
});

export const withTimesheetMileages = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
