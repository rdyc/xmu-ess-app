import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCornerCategoryDeleteRequest, 
  IHrCornerCategoryGetAllRequest, 
  IHrCornerCategoryGetDetailRequest, 
  IHrCornerCategoryGetListRequest, 
  IHrCornerCategoryPostRequest, 
  IHrCornerCategoryPutRequest
} from '@hr/classes/queries/';
import { IHrCornerCategory, IHrCornerCategoryDetail, IHrCornerCategoryList } from '@hr/classes/response/';
import { 
  hrCornerCategoryDeleteDispose, 
  hrCornerCategoryDeleteRequest, 
  hrCornerCategoryGetAllDispose, 
  hrCornerCategoryGetAllRequest, 
  hrCornerCategoryGetByIdDispose, 
  hrCornerCategoryGetByIdRequest, 
  hrCornerCategoryGetListDispose, 
  hrCornerCategoryGetListRequest, 
  hrCornerCategoryPostDispose, 
  hrCornerCategoryPostRequest, 
  hrCornerCategoryPutDispose,
  hrCornerCategoryPutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCornerCategoryState: {
    all: IQueryCollectionState<IHrCornerCategoryGetAllRequest, IHrCornerCategory>;
    list: IQueryCollectionState<IHrCornerCategoryGetListRequest, IHrCornerCategoryList>;
    detail: IQuerySingleState<IHrCornerCategoryGetDetailRequest, IHrCornerCategoryDetail>;
  };
}

interface PropsFromDispatch {
  hrCornerCategoryDispatch: {
    // command
    createRequest: typeof hrCornerCategoryPostRequest;
    createDispose: typeof hrCornerCategoryPostDispose;
    updateRequest: typeof hrCornerCategoryPutRequest;
    updateDispose: typeof hrCornerCategoryPutDispose;
    deleteRequest: typeof hrCornerCategoryDeleteRequest;
    deleteDispose: typeof hrCornerCategoryDeleteDispose;

    // query
    loadAllRequest: typeof hrCornerCategoryGetAllRequest;
    loadAllDispose: typeof hrCornerCategoryGetAllDispose;
    loadListRequest: typeof hrCornerCategoryGetListRequest;
    loadListDispose: typeof hrCornerCategoryGetListDispose;
    loadDetailRequest: typeof hrCornerCategoryGetByIdRequest;
    loadDetailDispose: typeof hrCornerCategoryGetByIdDispose;
  };
}

export interface WithHrCornerCategory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCornerCategoryGetAll, hrCornerCategoryGetList, hrCornerCategoryGetDetail }: IAppState) => ({
  hrCornerCategoryState: {
    all: hrCornerCategoryGetAll,
    list: hrCornerCategoryGetList,
    detail: hrCornerCategoryGetDetail,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCornerCategoryDispatch: {
    // command
    createRequest: (request: IHrCornerCategoryPostRequest) => dispatch(hrCornerCategoryPostRequest(request)),
    createDispose: () => dispatch(hrCornerCategoryPostDispose()),
    updateRequest: (request: IHrCornerCategoryPutRequest) => dispatch(hrCornerCategoryPutRequest(request)),
    updateDispose: () => dispatch(hrCornerCategoryPutDispose()),
    deleteRequest: (request: IHrCornerCategoryDeleteRequest) => dispatch(hrCornerCategoryDeleteRequest(request)),
    deleteDispose: () => dispatch(hrCornerCategoryDeleteDispose()),

    // query
    loadAllRequest: (request: IHrCornerCategoryGetAllRequest) => dispatch(hrCornerCategoryGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCornerCategoryGetAllDispose()),
    loadListRequest: (request: IHrCornerCategoryGetListRequest) => dispatch(hrCornerCategoryGetListRequest(request)),
    loadListDispose: () => dispatch(hrCornerCategoryGetListDispose()),
    loadDetailRequest: (request: IHrCornerCategoryGetDetailRequest) => dispatch(hrCornerCategoryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCornerCategoryGetByIdDispose()),
  }
});

export const withHrCornerCategory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);