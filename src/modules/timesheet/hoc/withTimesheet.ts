import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetGetAllRequest, ITimesheetGetByIdRequest, ITimesheetPostRequest, ITimesheetPutRequest } from '@timesheet/classes/queries/entry';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { 
  timesheetGetAllDispose,
  timesheetGetAllRequest,
  timesheetGetByIdDispose,
  timesheetGetByIdRequest,
  timesheetPostDispose,
  timesheetPostRequest,
  timesheetPutDispose,
  timesheetPutRequest
} from '@timesheet/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  timesheetState: {
    all: IQueryCollectionState<ITimesheetGetAllRequest, ITimesheet>;
    detail: IQuerySingleState<ITimesheetGetByIdRequest, ITimesheetDetail>;
  };
}

interface PropsFromDispatch {
  timesheetDispatch: {
    // command
    createRequest: typeof timesheetPostRequest;
    createDispose: typeof timesheetPostDispose;
    updateRequest: typeof timesheetPutRequest;
    updateDispose: typeof timesheetPutDispose;

    // query
    loadAllRequest: typeof timesheetGetAllRequest;
    loadAllDispose: typeof timesheetGetAllDispose;
    loadDetailRequest: typeof timesheetGetByIdRequest;
    loadDetailDispose: typeof timesheetGetByIdDispose;
  };
}

export interface WithTimesheet extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ timesheetGetAll, timesheetGetById }: IAppState) => ({
  timesheetState: {
    all: timesheetGetAll,
    detail: timesheetGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timesheetDispatch: {
    // command
    createRequest: (request: ITimesheetPostRequest) => dispatch(timesheetPostRequest(request)),
    createDispose: () => dispatch(timesheetPostDispose()),
    updateRequest: (request: ITimesheetPutRequest) => dispatch(timesheetPutRequest(request)),
    updateDispose: () => dispatch(timesheetPutDispose()),
    
    // query
    loadAllRequest: (request: ITimesheetGetAllRequest) => dispatch(timesheetGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetGetAllDispose()),
    loadDetailRequest: (request: ITimesheetGetByIdRequest) => dispatch(timesheetGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(timesheetGetByIdDispose()),
  }
});

export const withTimesheet = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);