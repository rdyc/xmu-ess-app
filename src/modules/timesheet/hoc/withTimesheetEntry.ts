import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetGetAllRequest, ITimesheetGetByIdRequest, ITimesheetPostRequest, ITimesheetPutRequest } from '@timesheet/classes/queries/entry';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { 
  timesheetEntryGetAllDispose,
  timesheetEntryGetAllRequest,
  timesheetEntryGetByIdDispose,
  timesheetEntryGetByIdRequest,
  timesheetEntryPostDispose,
  timesheetEntryPostRequest,
  timesheetEntryPutDispose,
  timesheetEntryPutRequest
} from '@timesheet/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  timesheetEntryState: {
    all: IQueryCollectionState<ITimesheetGetAllRequest, ITimesheet>;
    detail: IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail>;
  };
}

interface PropsFromDispatch {
  timesheetEntryDispatch: {
    // command
    createRequest: typeof timesheetEntryPostRequest;
    createDispose: typeof timesheetEntryPostDispose;
    updateRequest: typeof timesheetEntryPutRequest;
    updateDispose: typeof timesheetEntryPutDispose;

    // query
    loadAllRequest: typeof timesheetEntryGetAllRequest;
    loadAllDispose: typeof timesheetEntryGetAllDispose;
    loadDetailRequest: typeof timesheetEntryGetByIdRequest;
    loadDetailDispose: typeof timesheetEntryGetByIdDispose;
  };
}

export interface WithTimesheetEntry extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ timesheetGetAll, timesheetGetById }: IAppState) => ({
  timesheetEntryState: {
    all: timesheetGetAll,
    detail: timesheetGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timesheetEntryDispatch: {
    // command
    createRequest: (request: ITimesheetPostRequest) => dispatch(timesheetEntryPostRequest(request)),
    createDispose: () => dispatch(timesheetEntryPostDispose()),
    updateRequest: (request: ITimesheetPutRequest) => dispatch(timesheetEntryPutRequest(request)),
    updateDispose: () => dispatch(timesheetEntryPutDispose()),
    
    // query
    loadAllRequest: (request: ITimesheetGetAllRequest) => dispatch(timesheetEntryGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetEntryGetAllDispose()),
    loadDetailRequest: (request: ITimesheetGetByIdRequest) => dispatch(timesheetEntryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(timesheetEntryGetByIdDispose()),
  }
});

export const withTimesheetEntry = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);