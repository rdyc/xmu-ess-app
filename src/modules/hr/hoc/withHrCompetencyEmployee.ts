import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailListRequest,
  IHrCompetencyEmployeeGetDetailRequest, 
  IHrCompetencyEmployeeGetListRequest,
  IHrCompetencyEmployeePatchRequest,
  IHrCompetencyEmployeePostRequest
} from '@hr/classes/queries/';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail } from '@hr/classes/response/';
import { 
  hrCompetencyEmployeeGetAllDispose, 
  hrCompetencyEmployeeGetAllRequest, 
  hrCompetencyEmployeeGetByIdDispose, 
  hrCompetencyEmployeeGetByIdRequest,
  hrCompetencyEmployeeGetDetailListDispose, 
  hrCompetencyEmployeeGetDetailListRequest, 
  hrCompetencyEmployeeGetListDispose, 
  hrCompetencyEmployeeGetListRequest,
  hrCompetencyEmployeePatchDispose,
  hrCompetencyEmployeePatchRequest,
  hrCompetencyEmployeePostDispose,
  hrCompetencyEmployeePostRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyEmployeeState: {
    all: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
    detail: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyEmployeeDispatch: {
    // command
    createRequest: typeof hrCompetencyEmployeePostRequest;
    createDispose: typeof hrCompetencyEmployeePostDispose;
    patchRequest: typeof hrCompetencyEmployeePatchRequest;
    patchDispose: typeof hrCompetencyEmployeePatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyEmployeeGetAllRequest;
    loadAllDispose: typeof hrCompetencyEmployeeGetAllDispose;
    loadListRequest: typeof hrCompetencyEmployeeGetListRequest;
    loadListDispose: typeof hrCompetencyEmployeeGetListDispose;
    loadDetailListRequest: typeof hrCompetencyEmployeeGetDetailListRequest;
    loadDetailListDispose: typeof hrCompetencyEmployeeGetDetailListDispose;
    loadDetailRequest: typeof hrCompetencyEmployeeGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyEmployeeGetByIdDispose;
  };
}

export interface WithHrCompetencyEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyEmployeeGetAll, hrCompetencyEmployeeGetById, hrCompetencyEmployeeGetList, hrCompetencyEmployeeGetDetailList }: IAppState) => ({
  hrCompetencyEmployeeState: {
    all: hrCompetencyEmployeeGetAll,
    detail: hrCompetencyEmployeeGetById,
    list: hrCompetencyEmployeeGetList,
    detailList: hrCompetencyEmployeeGetDetailList
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyEmployeeDispatch: {
    // command
    createRequest: (request: IHrCompetencyEmployeePostRequest) => dispatch(hrCompetencyEmployeePostRequest(request)),
    createDispose: () => dispatch(hrCompetencyEmployeePostDispose()),
    patchRequest: (request: IHrCompetencyEmployeePatchRequest) => dispatch(hrCompetencyEmployeePatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyEmployeePatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyEmployeeGetAllRequest) => dispatch(hrCompetencyEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyEmployeeGetAllDispose()),
    loadListRequest: (request: IHrCompetencyEmployeeGetListRequest) => dispatch(hrCompetencyEmployeeGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyEmployeeGetListDispose()),
    loadDetailListRequest: (request: IHrCompetencyEmployeeGetDetailListRequest) => dispatch(hrCompetencyEmployeeGetDetailListRequest(request)),
    loadDetailListDispose: () => dispatch(hrCompetencyEmployeeGetDetailListDispose()),
    loadDetailRequest: (request: IHrCompetencyEmployeeGetDetailRequest) => dispatch(hrCompetencyEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyEmployeeGetByIdDispose()),
  }
});

export const withHrCompetencyEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);