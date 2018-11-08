import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest, ITimesheetApprovalPostBulkRequest,  } from '@timesheet/classes/queries/approval';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { 
  timesheetApprovalGetAllDispose,
  timesheetApprovalGetAllRequest,
  timesheetApprovalGetByIdDispose,
  timesheetApprovalGetByIdRequest,
  timesheetApprovalPostBulkDispose,
  timesheetApprovalPostBulkRequest,
  // timesheetApprovalPostDispose,
  // timesheetApprovalPostRequest,
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
    // createRequest: typeof timesheetApprovalPostRequest;
    // createDispose: typeof timesheetApprovalPostDispose;
    createRequestBulk: typeof timesheetApprovalPostBulkRequest;
    createDisposeBulk: typeof timesheetApprovalPostBulkDispose;

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
    // createRequest: (request: ITimesheetApprovalPostRequest) => dispatch(timesheetApprovalPostRequest(request)),
    // createDispose: () => dispatch(timesheetApprovalPostDispose()),
    createRequestBulk: (request: ITimesheetApprovalPostBulkRequest) => dispatch(timesheetApprovalPostBulkRequest(request)),
    createDisposeBulk: () => dispatch(timesheetApprovalPostBulkDispose()),
    
    // query
    loadAllRequest: (request: ITimesheetApprovalGetAllRequest) => dispatch(timesheetApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetApprovalGetAllDispose()),
    loadDetailRequest: (request: ITimesheetApprovalGetByIdRequest) => dispatch(timesheetApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(timesheetApprovalGetByIdDispose()),
  }
});

export const withTimesheetApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);