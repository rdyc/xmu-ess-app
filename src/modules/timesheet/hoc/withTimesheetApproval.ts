import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest } from '@timesheet/classes/queries';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { 
  timesheetApprovalGetAllDispose,
  timesheetApprovalGetAllRequest,
  timesheetApprovalGetByIdDispose,
  timesheetApprovalGetByIdRequest,
} from '@timesheet/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  timesheetApprovalState: {
    all: IQueryCollectionState<ITimesheetApprovalGetAllRequest, ITimesheet>;
    detail: IQuerySingleState<ITimesheetApprovalGetByIdRequest, ITimesheetDetail>;
  };
}

interface PropsFromDispatch {
  timesheetApprovalDispatch: {
    // command
    // createRequest: typeof timesheetPostRequest;
    // createDispose: typeof timesheetPostDispose;
    // updateRequest: typeof timesheetPutRequest;
    // updateDispose: typeof timesheetPutDispose;

    // query
    loadAllRequest: typeof timesheetApprovalGetAllRequest;
    loadAllDispose: typeof timesheetApprovalGetAllDispose;
    loadDetailRequest: typeof timesheetApprovalGetByIdRequest;
    loadDetailDispose: typeof timesheetApprovalGetByIdDispose;
  };
}

export interface WithTimesheetApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ timesheetApprovalGetAll, timesheetApprovalGetById }: IAppState) => ({
  timesheetApprovalState: {
    all: timesheetApprovalGetAll,
    detail: timesheetApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timesheetApprovalDispatch: {
    // command
    // createRequest: (request: ITimesheetPostRequest) => dispatch(timesheetPostRequest(request)),
    // createDispose: () => dispatch(timesheetPostDispose()),
    // updateRequest: (request: ITimesheetPutRequest) => dispatch(timesheetPutRequest(request)),
    // updateDispose: () => dispatch(timesheetPutDispose()),
    
    // query
    loadAllRequest: (request: ITimesheetApprovalGetAllRequest) => dispatch(timesheetApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetApprovalGetAllDispose()),
    loadDetailRequest: (request: ITimesheetApprovalGetByIdRequest) => dispatch(timesheetApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(timesheetApprovalGetByIdDispose()),
  }
});

export const withTimesheetApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);