import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {  
  IKPICategoryGetAllRequest, 
  IKPICategoryGetDetailRequest,
  IKPICategoryGetListRequest,   
  IKPICategoryPostRequest,
  IKPICategoryPutRequest
} from '@kpi/classes/queries/category';
import { IKPICategory, IKPICategoryDetail, IKPICategoryList } from '@kpi/classes/response/category';
import {  
  KPICategoryGetAllDispose, 
  KPICategoryGetAllRequest,  
  KPICategoryGetByIdDispose, 
  KPICategoryGetByIdRequest, 
  KPICategoryGetListDispose,
  KPICategoryGetListRequest, 
  KPICategoryPostDispose,
  KPICategoryPostRequest,
  KPICategoryPutDispose,
  KPICategoryPutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiCategoryState: {
    all: IQueryCollectionState<IKPICategoryGetAllRequest, IKPICategory>;
    list: IQueryCollectionState<IKPICategoryGetListRequest, IKPICategoryList>;
    detail: IQuerySingleState<IKPICategoryGetDetailRequest, IKPICategoryDetail>;
  };
}

interface PropsFromDispatch {
  kpiCategoryDispatch: {
    // command
    createRequest: typeof KPICategoryPostRequest;
    createDispose: typeof KPICategoryPostDispose;
    updateRequest: typeof KPICategoryPutRequest;
    updateDispose: typeof KPICategoryPutDispose;

    // query
    loadAllRequest: typeof KPICategoryGetAllRequest;
    loadAllDispose: typeof KPICategoryGetAllDispose;
    loadListRequest: typeof KPICategoryGetListRequest;
    loadListDispose: typeof KPICategoryGetListDispose;
    loadDetailRequest: typeof KPICategoryGetByIdRequest;
    loadDetailDispose: typeof KPICategoryGetByIdDispose;
  };
}

export interface WithKPICategory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiCategoryGetAll, kpiCategoryGetList, kpiCategoryGetById }: IAppState) => ({
  kpiCategoryState: {
    all: kpiCategoryGetAll,
    list: kpiCategoryGetList,
    detail: kpiCategoryGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiCategoryDispatch: {
    // command
    createRequest: (request: IKPICategoryPostRequest) => dispatch(KPICategoryPostRequest(request)),
    createDispose: () => dispatch(KPICategoryPostDispose()),
    updateRequest: (request: IKPICategoryPutRequest) => dispatch(KPICategoryPutRequest(request)),
    updateDispose: () => dispatch(KPICategoryPutDispose()),
    
    // query
    loadAllRequest: (request: IKPICategoryGetAllRequest) => dispatch(KPICategoryGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPICategoryGetAllDispose()),
    loadListRequest: (request: IKPICategoryGetListRequest) => dispatch(KPICategoryGetListRequest(request)),
    loadListDispose: () => dispatch(KPICategoryGetListDispose()),
    loadDetailRequest: (request: IKPICategoryGetDetailRequest) => dispatch(KPICategoryGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPICategoryGetByIdDispose()),
  }
});

export const withKPICategory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);