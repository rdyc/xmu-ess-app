import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import {
  ILeaveCalculationGetAllRequest,
} from '@lookup/classes/queries';
import { ILeaveCalculation } from '@lookup/classes/response';
import { lookupLeaveCalculationGetAllDispose, lookupLeaveCalculationGetAllRequest } from '@lookup/store/actions/lookupLeaveCalculationActions';
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
    loadAllRequest: typeof lookupLeaveCalculationGetAllRequest;
    loadAllDispose: typeof lookupLeaveCalculationGetAllDispose;
  };
}

export interface WithLeaveCalculation extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ lookupLeaveCalculationGetAll: leaveCalculationGetAll }: IAppState) => ({
  leaveCalculationState: {
    all: leaveCalculationGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveCalculationDispatch: {
    // query
    loadAllRequest: (request: ILeaveCalculationGetAllRequest) => dispatch(lookupLeaveCalculationGetAllRequest(request)),
    loadAllDispose: () => dispatch(lookupLeaveCalculationGetAllDispose()),
  }
});

export const withLeaveCalculation = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);