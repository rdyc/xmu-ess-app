import { 
  IEmployeeFamilyAllRequest, 
  IEmployeeFamilyByIdRequest, 
  IEmployeeFamilyDeleteRequest, 
  IEmployeeFamilyListRequest, 
  IEmployeeFamilyPostRequest, 
  IEmployeeFamilyPutRequest 
} from '@account/classes/queries/employeeFamily';
import { 
  IEmployeeFamily, 
  IEmployeeFamilyDetail 
} from '@account/classes/response/employeeFamily';
import { 
  accountEmployeeFamilyDeleteDispose, 
  accountEmployeeFamilyDeleteRequest, 
  accountEmployeeFamilyGetAllDispose, 
  accountEmployeeFamilyGetAllRequest, 
  accountEmployeeFamilyGetByIdDispose, 
  accountEmployeeFamilyGetByIdRequest, 
  accountEmployeeFamilyGetListDispose, 
  accountEmployeeFamilyGetListRequest, 
  accountEmployeeFamilyPostDispose, 
  accountEmployeeFamilyPostRequest, 
  accountEmployeeFamilyPutDispose, 
  accountEmployeeFamilyPutRequest 
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeFamilyState: {
    all: IQueryCollectionState<IEmployeeFamilyAllRequest, IEmployeeFamily>;
    list: IQueryCollectionState<IEmployeeFamilyListRequest, IEmployeeFamily>;
    detail: IQuerySingleState<IEmployeeFamilyByIdRequest, IEmployeeFamilyDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeFamilyDispatch: {
    // command
    createRequest: typeof accountEmployeeFamilyPostRequest;
    createDispose: typeof accountEmployeeFamilyPostDispose;

    updateRequest: typeof accountEmployeeFamilyPutRequest;
    updateDispose: typeof accountEmployeeFamilyPutDispose;

    deleteRequest: typeof accountEmployeeFamilyDeleteRequest;
    deleteDispose: typeof accountEmployeeFamilyDeleteDispose;

    // query
    loadAllRequest: typeof accountEmployeeFamilyGetAllRequest;
    loadAllDispose: typeof accountEmployeeFamilyGetAllDispose;

    loadListRequest: typeof accountEmployeeFamilyGetListRequest;
    loadListDispose: typeof accountEmployeeFamilyGetListDispose;

    loadDetailRequest: typeof accountEmployeeFamilyGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeFamilyGetByIdDispose;
  };
}

export interface WithAccountEmployeeFamily extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  accountEmployeeFamilyGetAll, 
  accountEmployeeFamilyGetList,
  accountEmployeeFamilyGetById,
}: IAppState) => ({
  accountEmployeeFamilyState: {
    all: accountEmployeeFamilyGetAll,
    list: accountEmployeeFamilyGetList,
    detail: accountEmployeeFamilyGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeFamilyDispatch: {
    // command
    createRequest: (request: IEmployeeFamilyPostRequest) => dispatch(accountEmployeeFamilyPostRequest(request)),
    createDispose: () => dispatch(accountEmployeeFamilyPostDispose()),

    updateRequest: (request: IEmployeeFamilyPutRequest) => dispatch(accountEmployeeFamilyPutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeFamilyPutDispose()),

    deleteRequest: (request: IEmployeeFamilyDeleteRequest) => dispatch(accountEmployeeFamilyDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeFamilyDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeFamilyAllRequest) => dispatch(accountEmployeeFamilyGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeFamilyGetAllDispose()),

    loadListRequest: (request: IEmployeeFamilyListRequest) => dispatch(accountEmployeeFamilyGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeFamilyGetListDispose()),

    loadDetailRequest: (request: IEmployeeFamilyByIdRequest) => dispatch(accountEmployeeFamilyGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeFamilyGetByIdDispose())
  }
});

export const withAccountEmployeeFamily = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);