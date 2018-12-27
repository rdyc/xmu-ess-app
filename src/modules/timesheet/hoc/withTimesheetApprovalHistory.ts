import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { ITimesheetApprovalGetAllRequest, ITimesheetApprovalGetByIdRequest  } from '@timesheet/classes/queries/approval';
import { ITimesheet, ITimesheetDetail } from '@timesheet/classes/response';
import { 
  timesheetApprovalHistoryGetAllDispose,
  timesheetApprovalHistoryGetAllRequest,
  timesheetApprovalHistoryGetByIdDispose,
  timesheetApprovalHistoryGetByIdRequest,
} from '@timesheet/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  timesheetApprovalHistoryState: {
    all: IQueryCollectionState<ITimesheetApprovalGetAllRequest, ITimesheet>;
    detail: IQuerySingleState<ITimesheetApprovalGetByIdRequest, ITimesheetDetail>;
  };
}

interface PropsFromDispatch {
  timesheetApprovalHistoryDispatch: {
    // command

    // query
    loadAllRequest: typeof timesheetApprovalHistoryGetAllRequest;
    loadAllDispose: typeof timesheetApprovalHistoryGetAllDispose;
    loadDetailRequest: typeof timesheetApprovalHistoryGetByIdRequest;
    loadDetailDispose: typeof timesheetApprovalHistoryGetByIdDispose;
  };
}

export interface WithTimesheetApprovalHistory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ timesheetApprovalHistoryGetAll, timesheetApprovalHistoryGetById }: IAppState) => ({
  timesheetApprovalHistoryState: {
    all: timesheetApprovalHistoryGetAll,
    detail: timesheetApprovalHistoryGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  timesheetApprovalHistoryDispatch: {
    // command
    
    // query
    loadAllRequest: (request: ITimesheetApprovalGetAllRequest) => dispatch(timesheetApprovalHistoryGetAllRequest(request)),
    loadAllDispose: () => dispatch(timesheetApprovalHistoryGetAllDispose()),
    loadDetailRequest: (request: ITimesheetApprovalGetByIdRequest) => dispatch(timesheetApprovalHistoryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(timesheetApprovalHistoryGetByIdDispose()),
  }
});

export const withTimesheetApprovalHistory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);