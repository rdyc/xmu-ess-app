import { 
  IEmployeeContractAllRequest, 
  IEmployeeContractByIdRequest, 
  IEmployeeContractDeleteRequest, 
  IEmployeeContractListRequest,
  IEmployeeContractPostRequest,
  IEmployeeContractPutRequest
} from '@account/classes/queries/employeeContract';
import { 
  IEmployeeContract, 
  IEmployeeContractDetail, 
  IEmployeeContractList 
} from '@account/classes/response/employeeContract';
import { 
  accountEmployeeContractDeleteDispose, 
  accountEmployeeContractDeleteRequest, 
  accountEmployeeContractGetAllDispose, 
  accountEmployeeContractGetAllRequest, 
  accountEmployeeContractGetByIdDispose, 
  accountEmployeeContractGetByIdRequest, 
  accountEmployeeContractGetListDispose,
  accountEmployeeContractGetListRequest,
  accountEmployeeContractPostDispose,
  accountEmployeeContractPostRequest,
  accountEmployeeContractPutDispose,
  accountEmployeeContractPutRequest
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeContractState: {
    all: IQueryCollectionState<IEmployeeContractAllRequest, IEmployeeContract>;
    list: IQueryCollectionState<IEmployeeContractListRequest, IEmployeeContractList>;
    detail: IQuerySingleState<IEmployeeContractByIdRequest, IEmployeeContractDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeContractDispatch: {
    // command
    createRequest: typeof accountEmployeeContractPostRequest;
    createDispose: typeof accountEmployeeContractPostDispose;
    updateRequest: typeof accountEmployeeContractPutRequest;
    updateDispose: typeof accountEmployeeContractPutDispose;
    deleteRequest: typeof accountEmployeeContractDeleteRequest;
    deleteDispose: typeof accountEmployeeContractDeleteDispose;
    
    // query
    loadAllRequest: typeof accountEmployeeContractGetAllRequest;
    loadAllDispose: typeof accountEmployeeContractGetAllDispose;
    
    loadListRequest: typeof accountEmployeeContractGetListRequest;
    loadListDispose: typeof accountEmployeeContractGetListDispose;

    loadDetailRequest: typeof accountEmployeeContractGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeContractGetByIdDispose;
  };
}

export interface WithAccountEmployeeContract extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeContractGetAll, accountEmployeeContractGetList, accountEmployeeContractGetById }: IAppState) => ({
  accountEmployeeContractState: {
    all: accountEmployeeContractGetAll,
    list: accountEmployeeContractGetList,
    detail: accountEmployeeContractGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeContractDispatch: {
    // command
    createRequest: (request: IEmployeeContractPostRequest) => dispatch(accountEmployeeContractPostRequest(request)),
    createDispose: () => dispatch(accountEmployeeContractPostDispose()),
    updateRequest: (request: IEmployeeContractPutRequest) => dispatch(accountEmployeeContractPutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeContractPutDispose()),
    deleteRequest: (request: IEmployeeContractDeleteRequest) => dispatch(accountEmployeeContractDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeContractDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeContractAllRequest) => dispatch(accountEmployeeContractGetAllRequest(request)),
    loadListRequest: (request: IEmployeeContractListRequest) => dispatch(accountEmployeeContractGetListRequest(request)),
    loadDetailRequest: (request: IEmployeeContractByIdRequest) => dispatch(accountEmployeeContractGetByIdRequest(request)),
  }
});

export const withAccountEmployeeContract = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);