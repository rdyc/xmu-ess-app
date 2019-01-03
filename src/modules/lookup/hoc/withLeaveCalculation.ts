import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import {
  ILeaveCalculationGetAllRequest,
} from '@lookup/classes/queries';
import { ILeaveCalculation } from '@lookup/classes/response';
import { leaveCalculationGetAllDispose, leaveCalculationGetAllRequest } from '@lookup/store/actions/leaveCalculationActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  leaveCalculationState: {
    all: IQueryCollectionState<ILeaveCalculationGetAllRequest, ILeaveCalculation>;
  };
}

interface PropsFromDispatch {
  leaveCalculationDispatch: {
    // query
    loadAllRequest: typeof leaveCalculationGetAllRequest;
    loadAllDispose: typeof leaveCalculationGetAllDispose;
  };
}

export interface WithLeaveCalculation extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ leaveCalculationGetAll }: IAppState) => ({
  leaveCalculationState: {
    all: leaveCalculationGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveCalculationDispatch: {
    // query
    loadAllRequest: (request: ILeaveCalculationGetAllRequest) => dispatch(leaveCalculationGetAllRequest(request)),
    loadAllDispose: () => dispatch(leaveCalculationGetAllDispose()),
  }
});

export const withLeaveCalculation = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);