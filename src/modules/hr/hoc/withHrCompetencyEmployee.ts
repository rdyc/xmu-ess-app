import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailListRequest,
  IHrCompetencyEmployeeGetDetailRequest, 
  IHrCompetencyEmployeeGetResultRequest,
  IHrCompetencyEmployeePatchRequest,
} from '@hr/classes/queries/';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail, IHrCompetencyEmployeeDetailList } from '@hr/classes/response/';
import { 
  hrCompetencyEmployeeGetAllDispose, 
  hrCompetencyEmployeeGetAllRequest, 
  hrCompetencyEmployeeGetByIdDispose, 
  hrCompetencyEmployeeGetByIdRequest,
  hrCompetencyEmployeeGetDetailListDispose, 
  hrCompetencyEmployeeGetDetailListRequest,
  hrCompetencyEmployeeGetResultDispose,
  hrCompetencyEmployeeGetResultRequest,
  hrCompetencyEmployeePatchDispose,
  hrCompetencyEmployeePatchRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyEmployeeState: {
    all: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
    detail: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
    detailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
    result: IQuerySingleState<IHrCompetencyEmployeeGetResultRequest, IHrCompetencyEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyEmployeeDispatch: {
    // command
    patchRequest: typeof hrCompetencyEmployeePatchRequest;
    patchDispose: typeof hrCompetencyEmployeePatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyEmployeeGetAllRequest;
    loadAllDispose: typeof hrCompetencyEmployeeGetAllDispose;
    loadDetailListRequest: typeof hrCompetencyEmployeeGetDetailListRequest;
    loadDetailListDispose: typeof hrCompetencyEmployeeGetDetailListDispose;
    loadDetailRequest: typeof hrCompetencyEmployeeGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyEmployeeGetByIdDispose;
    loadResultRequest: typeof hrCompetencyEmployeeGetResultRequest;
    loadResultDispose: typeof hrCompetencyEmployeeGetResultDispose;
  };
}

export interface WithHrCompetencyEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyEmployeeGetAll, hrCompetencyEmployeeGetById, hrCompetencyEmployeeGetDetailList, hrCompetencyEmployeeGetResult }: IAppState) => ({
  hrCompetencyEmployeeState: {
    all: hrCompetencyEmployeeGetAll,
    detail: hrCompetencyEmployeeGetById,
    detailList: hrCompetencyEmployeeGetDetailList,
    result: hrCompetencyEmployeeGetResult
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyEmployeeDispatch: {
    // command
    patchRequest: (request: IHrCompetencyEmployeePatchRequest) => dispatch(hrCompetencyEmployeePatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyEmployeePatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyEmployeeGetAllRequest) => dispatch(hrCompetencyEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyEmployeeGetAllDispose()),
    loadDetailListRequest: (request: IHrCompetencyEmployeeGetDetailListRequest) => dispatch(hrCompetencyEmployeeGetDetailListRequest(request)),
    loadDetailListDispose: () => dispatch(hrCompetencyEmployeeGetDetailListDispose()),
    loadDetailRequest: (request: IHrCompetencyEmployeeGetDetailRequest) => dispatch(hrCompetencyEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyEmployeeGetByIdDispose()),
    loadResultRequest: (request: IHrCompetencyEmployeeGetResultRequest) => dispatch(hrCompetencyEmployeeGetResultRequest(request)),
    loadResultDispose: () => dispatch(hrCompetencyEmployeeGetResultDispose()),
  }
});

export const withHrCompetencyEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);