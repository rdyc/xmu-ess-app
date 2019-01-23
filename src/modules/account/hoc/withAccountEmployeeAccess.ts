import { 
  IEmployeeAccessDeleteRequest, 
  IEmployeeAccessGetAllRequest, 
  IEmployeeAccessGetDetailRequest, 
  IEmployeeAccessPostRequest, 
  IEmployeeAccessPutRequest 
} from '@account/classes/queries/employeeAccess';
import { IEmployeeAccessGetListRequest } from '@account/classes/queries/employeeAccess/IEmployeeAccessGetListRequest';
import { IEmployeeAccessList } from '@account/classes/response/employeeAccess';
import { IEmployeeAccess } from '@account/classes/response/employeeAccess/IEmployeeAccess';
import { 
  accountEmployeeAccessDeleteDispose, 
  accountEmployeeAccessDeleteRequest, 
  accountEmployeeAccessGetAllDispose, 
  accountEmployeeAccessGetAllRequest, 
  accountEmployeeAccessGetByIdDispose, 
  accountEmployeeAccessGetByIdRequest,
  accountEmployeeAccessGetListDispose, 
  accountEmployeeAccessGetListRequest, 
  accountEmployeeAccessPostDispose, 
  accountEmployeeAccessPostRequest, 
  accountEmployeeAccessPutDispose, 
  accountEmployeeAccessPutRequest
} from '@account/store/actions/accountEmployeeAccessActions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromstate {
  accountEmployeeAccessState: {
    all: IQueryCollectionState<IEmployeeAccessGetAllRequest, IEmployeeAccess>;
    list: IQueryCollectionState<IEmployeeAccessGetListRequest, IEmployeeAccessList>;
    detail: IQuerySingleState<IEmployeeAccessGetDetailRequest, IEmployeeAccess>;
  };
}

interface PropsFromDispatch {
  accountEmployeeAccessDispatch: {
    // command 
    createRequest: typeof accountEmployeeAccessPostRequest
    createDispose: typeof accountEmployeeAccessPostDispose
    updateRequest: typeof accountEmployeeAccessPutRequest
    updateDispose: typeof accountEmployeeAccessPutDispose
    deleteRequest: typeof accountEmployeeAccessDeleteRequest
    deleteDispose: typeof accountEmployeeAccessDeleteDispose

    // query
    loadAllRequest: typeof accountEmployeeAccessGetAllRequest
    loadAllDispose: typeof accountEmployeeAccessGetAllDispose
    loadListRequest: typeof accountEmployeeAccessGetListRequest
    loadListDispose: typeof accountEmployeeAccessGetListDispose
    loadDetailRequest: typeof accountEmployeeAccessGetByIdRequest
    loadDetailDispose: typeof accountEmployeeAccessGetByIdDispose
  };
}

export interface WithAccountEmployeeAccess extends PropsFromstate, PropsFromDispatch { }

const mapStateToProps = ({ accountEmployeeAccessGetAll, accountEmployeeAccessGetList, accountEmployeeAccessGetById }: IAppState) => ({
  accountEmployeeAccessState: {
    all: accountEmployeeAccessGetAll,
    list: accountEmployeeAccessGetList,
    detail: accountEmployeeAccessGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeAccessDispatch: {
    // command
    createRequest: (request: IEmployeeAccessPostRequest) => dispatch(accountEmployeeAccessPostRequest(request)),
    createDispose: () => dispatch(accountEmployeeAccessPostDispose()),
    updateRequest: (request: IEmployeeAccessPutRequest) => dispatch(accountEmployeeAccessPutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeAccessPutDispose()),
    deleteRequest: (request: IEmployeeAccessDeleteRequest) => dispatch(accountEmployeeAccessDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeAccessDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeAccessGetAllRequest) => dispatch(accountEmployeeAccessGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeAccessGetAllDispose()),
    loadListRequest: (request: IEmployeeAccessGetListRequest) => dispatch(accountEmployeeAccessGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeAccessGetListDispose()),
    loadDetailRequest: (request: IEmployeeAccessGetDetailRequest) => dispatch(accountEmployeeAccessGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeAccessGetByIdDispose()),
  }
});

export const withAccountEmployeeAccess = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);