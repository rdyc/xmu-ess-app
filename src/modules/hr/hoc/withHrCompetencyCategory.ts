import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyCategoryGetAllRequest, 
  IHrCompetencyCategoryGetDetailRequest, 
  IHrCompetencyCategoryGetListRequest, 
  IHrCompetencyCategoryPatchRequest, 
  IHrCompetencyCategoryPostRequest,
} from '@hr/classes/queries/';
import { IHrCompetencyCategory, IHrCompetencyCategoryDetail, IHrCompetencyCategoryList } from '@hr/classes/response/';
import { 
  hrCompetencyCategoryGetAllDispose, 
  hrCompetencyCategoryGetAllRequest, 
  hrCompetencyCategoryGetByIdDispose, 
  hrCompetencyCategoryGetByIdRequest, 
  hrCompetencyCategoryGetListDispose, 
  hrCompetencyCategoryGetListRequest, 
  hrCompetencyCategoryPatchDispose, 
  hrCompetencyCategoryPatchRequest, 
  hrCompetencyCategoryPostDispose, 
  hrCompetencyCategoryPostRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyCategoryState: {
    all: IQueryCollectionState<IHrCompetencyCategoryGetAllRequest, IHrCompetencyCategory>;
    list: IQueryCollectionState<IHrCompetencyCategoryGetListRequest, IHrCompetencyCategoryList>;
    detail: IQuerySingleState<IHrCompetencyCategoryGetDetailRequest, IHrCompetencyCategoryDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyCategoryDispatch: {
    // command
    createRequest: typeof hrCompetencyCategoryPostRequest;
    createDispose: typeof hrCompetencyCategoryPostDispose;
    patchRequest: typeof hrCompetencyCategoryPatchRequest;
    patchDispose: typeof hrCompetencyCategoryPatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyCategoryGetAllRequest;
    loadAllDispose: typeof hrCompetencyCategoryGetAllDispose;
    loadListRequest: typeof hrCompetencyCategoryGetListRequest;
    loadListDispose: typeof hrCompetencyCategoryGetListDispose;
    loadDetailRequest: typeof hrCompetencyCategoryGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyCategoryGetByIdDispose;
  };
}

export interface WithHrCompetencyCategory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyCategoryGetAll, hrCompetencyCategoryGetList, hrCompetencyCategoryGetById }: IAppState) => ({
  hrCompetencyCategoryState: {
    all: hrCompetencyCategoryGetAll,
    list: hrCompetencyCategoryGetList,
    detail: hrCompetencyCategoryGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyCategoryDispatch: {
    // command
    createRequest: (request: IHrCompetencyCategoryPostRequest) => dispatch(hrCompetencyCategoryPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyCategoryPostDispose()),
    patchRequest: (request: IHrCompetencyCategoryPatchRequest) => dispatch(hrCompetencyCategoryPatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyCategoryPatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyCategoryGetAllRequest) => dispatch(hrCompetencyCategoryGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyCategoryGetAllDispose()),
    loadListRequest: (request: IHrCompetencyCategoryGetListRequest) => dispatch(hrCompetencyCategoryGetListRequest(request)),
    loadListDispose: () => dispatch(hrCompetencyCategoryGetListDispose()),
    loadDetailRequest: (request: IHrCompetencyCategoryGetDetailRequest) => dispatch(hrCompetencyCategoryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyCategoryGetByIdDispose()),
  }
});

export const withHrCompetencyCategory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);