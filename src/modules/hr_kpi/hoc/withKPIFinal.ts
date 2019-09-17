import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIFinalGetAllRequest,
  IKPIFinalGetByIdRequest,
} from '@kpi/classes/queries';
import { IKPIFinal, IKPIFinalDetail } from '@kpi/classes/response';
import {
  KPIFinalGetAllDispose,
  KPIFinalGetAllRequest,
  KPIFinalGetByIdDispose,
  KPIFinalGetByIdRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiFinalState: {
    all: IQueryCollectionState<IKPIFinalGetAllRequest, IKPIFinal>;
    detail: IQuerySingleState<IKPIFinalGetByIdRequest, IKPIFinalDetail>;
  };
}

interface PropsFromDispatch {
  kpiFinalDispatch: {
    // query
    loadAllRequest: typeof KPIFinalGetAllRequest;
    loadAllDispose: typeof KPIFinalGetAllDispose;
    loadDetailRequest: typeof KPIFinalGetByIdRequest;
    loadDetailDispose: typeof KPIFinalGetByIdDispose;
  };
}

export interface WithKPIFinal extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiFinalGetAll, kpiFinalGetById }: IAppState) => ({
  kpiFinalState: {
    all: kpiFinalGetAll,
    detail: kpiFinalGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiFinalDispatch: {
    // query
    loadAllRequest: (request: IKPIFinalGetAllRequest) => dispatch(KPIFinalGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIFinalGetAllDispose()),
    loadDetailRequest: (request: IKPIFinalGetByIdRequest) => dispatch(KPIFinalGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIFinalGetByIdDispose()),
  }
});

export const withKPIFinal = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);