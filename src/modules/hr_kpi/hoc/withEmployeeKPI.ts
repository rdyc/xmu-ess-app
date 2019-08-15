import {
  IAppState,
  IQueryCollectionState,
  IQuerySingleState
} from '@generic/interfaces';
import {
  IEmployeeKPIGetAllRequest,
  IEmployeeKPIGetByIdRequest,
  IEmployeeKPIGetItemListRequest,
  IEmployeeKPIPostBulkRequest,
  IEmployeeKPIPostRequest,
  IEmployeeKPIPutFinalRequest,
  IEmployeeKPIPutItemBulkRequest,
  IEmployeeKPIPutRequest,
} from '@kpi/classes/queries';
import { IEmployeeKPI, IEmployeeKPIDetail, IEmployeeKPIItem } from '@kpi/classes/response';
import {
  EmployeeKPIGetAllDispose,
  EmployeeKPIGetAllRequest,
  EmployeeKPIGetByIdDispose,
  EmployeeKPIGetByIdRequest,
  EmployeeKPIGetItemListDispose,
  EmployeeKPIGetItemListRequest,
  EmployeeKPIPostBulkDispose,
  EmployeeKPIPostBulkRequest,
  EmployeeKPIPostDispose,
  EmployeeKPIPostRequest,
  EmployeeKPIPutDispose,
  EmployeeKPIPutFinalDispose,
  EmployeeKPIPutFinalRequest,
  EmployeeKPIPutItemBulkDispose,
  EmployeeKPIPutItemBulkRequest,
  EmployeeKPIPutRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  employeeKPIState: {
    all: IQueryCollectionState<IEmployeeKPIGetAllRequest, IEmployeeKPI>;
    itemList: IQueryCollectionState<IEmployeeKPIGetItemListRequest, IEmployeeKPIItem>;
    detail: IQuerySingleState<IEmployeeKPIGetByIdRequest, IEmployeeKPIDetail>;
  };
}

interface PropsFromDispatch {
  employeeKPIDispatch: {
    // command
    createRequest: typeof EmployeeKPIPostRequest;
    createDispose: typeof EmployeeKPIPostDispose;
    createBulkRequest: typeof EmployeeKPIPostBulkRequest;
    createBulkDispose: typeof EmployeeKPIPostBulkDispose;
    updateRequest: typeof EmployeeKPIPutRequest;
    updateDispose: typeof EmployeeKPIPutDispose;
    updateItemBulkRequest: typeof EmployeeKPIPutItemBulkRequest;
    updateItemBulkDispose: typeof EmployeeKPIPutItemBulkDispose;
    updateFinalRequest: typeof EmployeeKPIPutFinalRequest;
    updateFinalDispose: typeof EmployeeKPIPutFinalDispose;

    // query
    loadAllRequest: typeof EmployeeKPIGetAllRequest;
    loadAllDispose: typeof EmployeeKPIGetAllDispose;
    loadItemListRequest: typeof EmployeeKPIGetItemListRequest;
    loadItemListDispose: typeof EmployeeKPIGetItemListDispose;
    loadDetailRequest: typeof EmployeeKPIGetByIdRequest;
    loadDetailDispose: typeof EmployeeKPIGetByIdDispose;
  };
}

export interface WithEmployeeKPI extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ employeeKPIGetAll, employeeKPIGetItemList, employeeKPIGetById }: IAppState) => ({
  employeeKPIState: {
    all: employeeKPIGetAll,
    itemList: employeeKPIGetItemList,
    detail: employeeKPIGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  employeeKPIDispatch: {
    // command
    createRequest: (request: IEmployeeKPIPostRequest) => dispatch(EmployeeKPIPostRequest(request)),
    createDispose: () => dispatch(EmployeeKPIPostDispose()),
    createBulkRequest: (request: IEmployeeKPIPostBulkRequest) => dispatch(EmployeeKPIPostBulkRequest(request)),
    createBulkDispose: () => dispatch(EmployeeKPIPostBulkDispose()),
    updateRequest: (request: IEmployeeKPIPutRequest) => dispatch(EmployeeKPIPutRequest(request)),
    updateDispose: () => dispatch(EmployeeKPIPutDispose()),
    updateItemBulkRequest: (request: IEmployeeKPIPutItemBulkRequest) => dispatch(EmployeeKPIPutItemBulkRequest(request)),
    updateItemBulkDispose: () => dispatch(EmployeeKPIPutItemBulkDispose()),
    updateFinalRequest: (request: IEmployeeKPIPutFinalRequest) => dispatch(EmployeeKPIPutFinalRequest(request)),
    updateFinalDispose: () => dispatch(EmployeeKPIPutFinalDispose()),
    
    // query
    loadAllRequest: (request: IEmployeeKPIGetAllRequest) => dispatch(EmployeeKPIGetAllRequest(request)),
    loadAllDispose: () => dispatch(EmployeeKPIGetAllDispose()),
    loadItemListRequest: (request: IEmployeeKPIGetItemListRequest) => dispatch(EmployeeKPIGetItemListRequest(request)),
    loadItemListDispose: () => dispatch(EmployeeKPIGetItemListDispose()),
    loadDetailRequest: (request: IEmployeeKPIGetByIdRequest) => dispatch(EmployeeKPIGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(EmployeeKPIGetByIdDispose()),
  }
});

export const withEmployeeKPI = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);