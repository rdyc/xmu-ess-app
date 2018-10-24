import { IEmployeeLeaveByIdRequest } from '@account/classes/queries';
import { IEmployeeLeave } from '@account/classes/response';
import {
  accountEmployeeLeaveGetByIdRequest,
} from '@account/store/actions';
import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeLeaveState: {
    detail: IQueryCollectionState<IEmployeeLeaveByIdRequest, IEmployeeLeave>;
  };
}

interface PropsFromDispatch {
  accountEmployeeLeaveDispatch: {
    // list
    
    // query
    loadDetailRequest: typeof accountEmployeeLeaveGetByIdRequest;
  };
}

export interface WithAccountEmployeeLeave extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeLeaveGetById }: IAppState) => ({
  accountEmployeeState: {
    detail: accountEmployeeLeaveGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeDispatch: {
    // command

    // query
    loadDetailRequest: (request: IEmployeeLeaveByIdRequest) => dispatch(accountEmployeeLeaveGetByIdRequest(request)),
  }
});

export const withAccountEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);