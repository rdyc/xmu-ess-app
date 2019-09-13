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
  hrCompetencyResultGetAllDispose, 
  hrCompetencyResultGetAllRequest, 
  hrCompetencyResultGetByIdDispose, 
  hrCompetencyResultGetByIdRequest,
  hrCompetencyResultGetDetailListDispose, 
  hrCompetencyResultGetDetailListRequest, 
  hrCompetencyResultGetListDispose, 
  hrCompetencyResultGetListRequest,
  hrCompetencyResultPatchDispose,
  hrCompetencyResultPatchRequest,
  hrCompetencyResultPostDispose,
  hrCompetencyResultPostRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyResultState: {
    all: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
    detail: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyResultDispatch: {
    // command
    createRequest: typeof hrCompetencyResultPostRequest;
    createDispose: typeof hrCompetencyResultPostDispose;
    patchRequest: typeof hrCompetencyResultPatchRequest;
    patchDispose: typeof hrCompetencyResultPatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyResultGetAllRequest;
    loadAllDispose: typeof hrCompetencyResultGetAllDispose;
    loadListRequest: typeof hrCompetencyResultGetListRequest;
    loadListDispose: typeof hrCompetencyResultGetListDispose;
    loadDetailListRequest: typeof hrCompetencyResultGetDetailListRequest;
    loadDetailListDispose: typeof hrCompetencyResultGetDetailListDispose;
    loadDetailRequest: typeof hrCompetencyResultGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyResultGetByIdDispose;
  };
}

export interface WithHrCompetencyResult extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyResultGetAll, hrCompetencyResultGetById, hrCompetencyResultGetList, hrCompetencyResultGetDetailList }: IAppState) => ({
  hrCompetencyResultState: {
    all: hrCompetencyResultGetAll,
    detail: hrCompetencyResultGetById,
    list: hrCompetencyResultGetList,
    detailList: hrCompetencyResultGetDetailList
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyResultDispatch: {
    // command
    createRequest: (request: IHrCompetencyEmployeePostRequest) => dispatch(hrCompetencyResultPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyResultPostDispose()),
    patchRequest: (request: IHrCompetencyEmployeePatchRequest) => dispatch(hrCompetencyResultPatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyResultPatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyEmployeeGetAllRequest) => dispatch(hrCompetencyResultGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyResultGetAllDispose()),
    loadListRequest: (request: IHrCompetencyEmployeeGetListRequest) => dispatch(hrCompetencyResultGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyResultGetListDispose()),
    loadDetailListRequest: (request: IHrCompetencyEmployeeGetDetailListRequest) => dispatch(hrCompetencyResultGetDetailListRequest(request)),
    loadDetailListDispose: () => dispatch(hrCompetencyResultGetDetailListDispose()),
    loadDetailRequest: (request: IHrCompetencyEmployeeGetDetailRequest) => dispatch(hrCompetencyResultGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyResultGetByIdDispose()),
  }
});

export const withHrCompetencyResult = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);