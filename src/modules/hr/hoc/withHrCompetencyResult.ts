import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailListRequest,
  IHrCompetencyEmployeeGetDetailRequest, 
  IHrCompetencyEmployeePatchRequest,
} from '@hr/classes/queries/';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail, IHrCompetencyEmployeeDetailList } from '@hr/classes/response/';
import { 
  hrCompetencyResultGetAllDispose, 
  hrCompetencyResultGetAllRequest, 
  hrCompetencyResultGetByIdDispose, 
  hrCompetencyResultGetByIdRequest,
  hrCompetencyResultGetDetailListDispose, 
  hrCompetencyResultGetDetailListRequest, 
  hrCompetencyResultPatchDispose,
  hrCompetencyResultPatchRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyResultState: {
    all: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
    detail: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
    detailList: IQueryCollectionState<IHrCompetencyEmployeeGetDetailListRequest, IHrCompetencyEmployeeDetailList>;
  };
}

interface PropsFromDispatch {
  hrCompetencyResultDispatch: {
    // command
    patchRequest: typeof hrCompetencyResultPatchRequest;
    patchDispose: typeof hrCompetencyResultPatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyResultGetAllRequest;
    loadAllDispose: typeof hrCompetencyResultGetAllDispose;
    loadDetailListRequest: typeof hrCompetencyResultGetDetailListRequest;
    loadDetailListDispose: typeof hrCompetencyResultGetDetailListDispose;
    loadDetailRequest: typeof hrCompetencyResultGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyResultGetByIdDispose;
  };
}

export interface WithHrCompetencyResult extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyResultGetAll, hrCompetencyResultGetById, hrCompetencyResultGetDetailList }: IAppState) => ({
  hrCompetencyResultState: {
    all: hrCompetencyResultGetAll,
    detail: hrCompetencyResultGetById,
    detailList: hrCompetencyResultGetDetailList
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyResultDispatch: {
    // command
    patchRequest: (request: IHrCompetencyEmployeePatchRequest) => dispatch(hrCompetencyResultPatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyResultPatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyEmployeeGetAllRequest) => dispatch(hrCompetencyResultGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyResultGetAllDispose()),
    loadDetailListRequest: (request: IHrCompetencyEmployeeGetDetailListRequest) => dispatch(hrCompetencyResultGetDetailListRequest(request)),
    loadDetailListDispose: () => dispatch(hrCompetencyResultGetDetailListDispose()),
    loadDetailRequest: (request: IHrCompetencyEmployeeGetDetailRequest) => dispatch(hrCompetencyResultGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyResultGetByIdDispose()),
  }
});

export const withHrCompetencyResult = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);