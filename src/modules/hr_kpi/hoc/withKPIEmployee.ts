import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IKPIEmployeeGetAllRequest,
  IKPIEmployeeGetByIdRequest,
  IKPIEmployeeGetItemListRequest,
  IKPIEmployeePostBulkRequest,
  IKPIEmployeePostRequest,
  IKPIEmployeePutFinalRequest,
  IKPIEmployeePutItemBulkRequest,
  IKPIEmployeePutRequest,
} from '@kpi/classes/queries';
import { IKPIEmployee, IKPIEmployeeDetail, IKPIEmployeeItem } from '@kpi/classes/response';
import {
  KPIEmployeeGetAllDispose,
  KPIEmployeeGetAllRequest,
  KPIEmployeeGetByIdDispose,
  KPIEmployeeGetByIdRequest,
  KPIEmployeeGetItemListDispose,
  KPIEmployeeGetItemListRequest,
  KPIEmployeePostBulkDispose,
  KPIEmployeePostBulkRequest,
  KPIEmployeePostDispose,
  KPIEmployeePostRequest,
  KPIEmployeePutDispose,
  KPIEmployeePutFinalDispose,
  KPIEmployeePutFinalRequest,
  KPIEmployeePutItemBulkDispose,
  KPIEmployeePutItemBulkRequest,
  KPIEmployeePutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  kpiEmployeeState: {
    all: IQueryCollectionState<IKPIEmployeeGetAllRequest, IKPIEmployee>;
    itemList: IQueryCollectionState<IKPIEmployeeGetItemListRequest, IKPIEmployeeItem>;
    detail: IQuerySingleState<IKPIEmployeeGetByIdRequest, IKPIEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  kpiEmployeeDispatch: {
    // command
    createRequest: typeof KPIEmployeePostRequest;
    createDispose: typeof KPIEmployeePostDispose;
    createBulkRequest: typeof KPIEmployeePostBulkRequest;
    createBulkDispose: typeof KPIEmployeePostBulkDispose;
    updateRequest: typeof KPIEmployeePutRequest;
    updateDispose: typeof KPIEmployeePutDispose;
    updateItemBulkRequest: typeof KPIEmployeePutItemBulkRequest;
    updateItemBulkDispose: typeof KPIEmployeePutItemBulkDispose;
    updateFinalRequest: typeof KPIEmployeePutFinalRequest;
    updateFinalDispose: typeof KPIEmployeePutFinalDispose;

    // query
    loadAllRequest: typeof KPIEmployeeGetAllRequest;
    loadAllDispose: typeof KPIEmployeeGetAllDispose;
    loadItemListRequest: typeof KPIEmployeeGetItemListRequest;
    loadItemListDispose: typeof KPIEmployeeGetItemListDispose;
    loadDetailRequest: typeof KPIEmployeeGetByIdRequest;
    loadDetailDispose: typeof KPIEmployeeGetByIdDispose;
  };
}

export interface WithKPIEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ kpiEmployeeGetAll, kpiEmployeeGetItemList, kpiEmployeeGetById }: IAppState) => ({
  kpiEmployeeState: {
    all: kpiEmployeeGetAll,
    itemList: kpiEmployeeGetItemList,
    detail: kpiEmployeeGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  kpiEmployeeDispatch: {
    // command
    createRequest: (request: IKPIEmployeePostRequest) => dispatch(KPIEmployeePostRequest(request)),
    createDispose: () => dispatch(KPIEmployeePostDispose()),
    createBulkRequest: (request: IKPIEmployeePostBulkRequest) => dispatch(KPIEmployeePostBulkRequest(request)),
    createBulkDispose: () => dispatch(KPIEmployeePostBulkDispose()),
    updateRequest: (request: IKPIEmployeePutRequest) => dispatch(KPIEmployeePutRequest(request)),
    updateDispose: () => dispatch(KPIEmployeePutDispose()),
    updateItemBulkRequest: (request: IKPIEmployeePutItemBulkRequest) => dispatch(KPIEmployeePutItemBulkRequest(request)),
    updateItemBulkDispose: () => dispatch(KPIEmployeePutItemBulkDispose()),
    updateFinalRequest: (request: IKPIEmployeePutFinalRequest) => dispatch(KPIEmployeePutFinalRequest(request)),
    updateFinalDispose: () => dispatch(KPIEmployeePutFinalDispose()),
    
    // query
    loadAllRequest: (request: IKPIEmployeeGetAllRequest) => dispatch(KPIEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(KPIEmployeeGetAllDispose()),
    loadItemListRequest: (request: IKPIEmployeeGetItemListRequest) => dispatch(KPIEmployeeGetItemListRequest(request)),
    loadItemListDispose: () => dispatch(KPIEmployeeGetItemListDispose()),
    loadDetailRequest: (request: IKPIEmployeeGetByIdRequest) => dispatch(KPIEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(KPIEmployeeGetByIdDispose()),
  }
});

export const withKPIEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);