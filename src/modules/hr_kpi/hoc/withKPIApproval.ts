import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIApprovalGetAllRequest,
  IKPIApprovalGetByIdRequest,
  IKPIApprovalPostRequest,
} from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail } from '@kpi/classes/response';
import {
  KPIApprovalGetAllDispose,
  KPIApprovalGetAllRequest,
  KPIApprovalGetByIdDispose,
  KPIApprovalGetByIdRequest,
  KPIApprovalPostDispose,
  KPIApprovalPostRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiApprovalState: {
    all: IQueryCollectionState<IKPIApprovalGetAllRequest, IKPIEmployee>;
    detail: IQuerySingleState<IKPIApprovalGetByIdRequest, IKPIEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  kpiApprovalDispatch: {
    // command
    approvalRequest: typeof KPIApprovalPostRequest;
    approvalDispose: typeof KPIApprovalPostDispose;

    // query
    loadAllRequest: typeof KPIApprovalGetAllRequest;
    loadAllDispose: typeof KPIApprovalGetAllDispose;
    loadDetailRequest: typeof KPIApprovalGetByIdRequest;
    loadDetailDispose: typeof KPIApprovalGetByIdDispose;
  };
}

export interface WithKPIApproval extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiApprovalGetAll, kpiApprovalGetById }: IAppState) => ({
  kpiApprovalState: {
    all: kpiApprovalGetAll,
    detail: kpiApprovalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiApprovalDispatch: {
    // command
    approvalRequest: (request: IKPIApprovalPostRequest) => dispatch(KPIApprovalPostRequest(request)),
    approvalDispose: () => dispatch(KPIApprovalPostDispose()),
    
    // query
    loadAllRequest: (request: IKPIApprovalGetAllRequest) => dispatch(KPIApprovalGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIApprovalGetAllDispose()),
    loadDetailRequest: (request: IKPIApprovalGetByIdRequest) => dispatch(KPIApprovalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIApprovalGetByIdDispose()),
  }
});

export const withKPIApproval = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);