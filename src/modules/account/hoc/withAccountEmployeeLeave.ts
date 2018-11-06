import { IEmployeeLeaveByIdRequest } from '@account/classes/queries';
import { IEmployeeLeave } from '@account/classes/response';
import {
  accountEmployeeLeaveGetByIdDispose, accountEmployeeLeaveGetByIdRequest,
} from '@account/store/actions';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeLeaveState: {
    detail: IQuerySingleState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
  };
}

interface PropsFromDispatch {
  accountEmployeeLeaveDispatch: {
    // query
    loadDetailRequest: typeof accountEmployeeLeaveGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeLeaveGetByIdDispose;
  };
}

export interface WithAccountEmployeeLeave extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeLeaveGetById }: IAppState) => ({
  accountEmployeeLeaveState: {
    detail: accountEmployeeLeaveGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeLeaveDispatch: {
  // query
    loadDetailRequest: (request: IEmployeeLeaveByIdRequest) => dispatch(accountEmployeeLeaveGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeLeaveGetByIdDispose()),
  }
});

export const withAccountEmployeeLeave = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);