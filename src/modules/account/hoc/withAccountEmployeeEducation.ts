import { 
  IEmployeeEducationAllRequest, 
  IEmployeeEducationByIdRequest, 
  IEmployeeEducationDeleteRequest, 
  IEmployeeEducationListRequest,
  IEmployeeEducationPostRequest,
  IEmployeeEducationPutRequest
} from '@account/classes/queries/employeeEducation';
import { 
  IEmployeeEducation, 
  IEmployeeEducationDetail, 
  IEmployeeEducationList 
} from '@account/classes/response/employeeEducation';
import { 
  accountEmployeeEducationDeleteDispose, 
  accountEmployeeEducationDeleteRequest, 
  accountEmployeeEducationGetAllDispose, 
  accountEmployeeEducationGetAllRequest, 
  accountEmployeeEducationGetByIdDispose, 
  accountEmployeeEducationGetByIdRequest, 
  accountEmployeeEducationGetListDispose,
  accountEmployeeEducationGetListRequest,
  accountEmployeeEducationPostDispose,
  accountEmployeeEducationPostRequest,
  accountEmployeeEducationPutDispose,
  accountEmployeeEducationPutRequest
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeEducationState: {
    all: IQueryCollectionState<IEmployeeEducationAllRequest, IEmployeeEducation>;
    list: IQueryCollectionState<IEmployeeEducationListRequest, IEmployeeEducationList>;
    detail: IQuerySingleState<IEmployeeEducationByIdRequest, IEmployeeEducationDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeEducationDispatch: {
    // command
    createRequest: typeof accountEmployeeEducationPostRequest;
    createDispose: typeof accountEmployeeEducationPostDispose;
    updateRequest: typeof accountEmployeeEducationPutRequest;
    updateDispose: typeof accountEmployeeEducationPutDispose;

    // query
    loadAllRequest: typeof accountEmployeeEducationGetAllRequest;
    loadAllDispose: typeof accountEmployeeEducationGetAllDispose;
    
    loadListRequest: typeof accountEmployeeEducationGetListRequest;
    loadListDispose: typeof accountEmployeeEducationGetListDispose;

    loadDetailRequest: typeof accountEmployeeEducationGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeEducationGetByIdDispose;
  };
}

export interface WithAccountEmployeeEducation extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeEducationGetAll, accountEmployeeEducationGetList, accountEmployeeEducationGetById }: IAppState) => ({
  accountEmployeeEducationState: {
    all: accountEmployeeEducationGetAll,
    list: accountEmployeeEducationGetList,
    detail: accountEmployeeEducationGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeEducationDispatch: {
    // command
    createRequest: (request: IEmployeeEducationPostRequest) => dispatch(accountEmployeeEducationPostRequest(request)),
    createDispose: () => dispatch(accountEmployeeEducationPostDispose()),
    updateRequest: (request: IEmployeeEducationPutRequest) => dispatch(accountEmployeeEducationPutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeEducationPutDispose()),
    deleteRequest: (request: IEmployeeEducationDeleteRequest) => dispatch(accountEmployeeEducationDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeEducationDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeEducationAllRequest) => dispatch(accountEmployeeEducationGetAllRequest(request)),
    loadListRequest: (request: IEmployeeEducationListRequest) => dispatch(accountEmployeeEducationGetListRequest(request)),
    loadDetailRequest: (request: IEmployeeEducationByIdRequest) => dispatch(accountEmployeeEducationGetByIdRequest(request)),
  }
});

export const withAccountEmployeeEducation = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);