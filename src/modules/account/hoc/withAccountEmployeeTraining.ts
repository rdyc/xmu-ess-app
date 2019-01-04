import { 
  IEmployeeTrainingAllRequest, 
  IEmployeeTrainingByIdRequest, 
  IEmployeeTrainingDeleteRequest, 
  IEmployeeTrainingListRequest, 
  IEmployeeTrainingPostRequest, 
  IEmployeeTrainingPutRequest 
} from '@account/classes/queries/employeeTraining';
import { 
  IEmployeeTraining, 
} from '@account/classes/response/employeeTraining';
import { 
  accountEmployeeTrainingDeleteDispose, 
  accountEmployeeTrainingDeleteRequest, 
  accountEmployeeTrainingGetAllDispose, 
  accountEmployeeTrainingGetAllRequest, 
  accountEmployeeTrainingGetByIdDispose, 
  accountEmployeeTrainingGetByIdRequest, 
  accountEmployeeTrainingGetListDispose, 
  accountEmployeeTrainingGetListRequest, 
  accountEmployeeTrainingPostDispose, 
  accountEmployeeTrainingPostRequest, 
  accountEmployeeTrainingPutDispose, 
  accountEmployeeTrainingPutRequest 
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeTrainingState: {
    all: IQueryCollectionState<IEmployeeTrainingAllRequest, IEmployeeTraining>;
    list: IQueryCollectionState<IEmployeeTrainingListRequest, IEmployeeTraining>;
    detail: IQuerySingleState<IEmployeeTrainingByIdRequest, IEmployeeTraining>;
  };
}

interface PropsFromDispatch {
  accountEmployeeTrainingDispatch: {
    // command
    createRequest: typeof accountEmployeeTrainingPostRequest;
    createDispose: typeof accountEmployeeTrainingPostDispose;

    updateRequest: typeof accountEmployeeTrainingPutRequest;
    updateDispose: typeof accountEmployeeTrainingPutDispose;

    deleteRequest: typeof accountEmployeeTrainingDeleteRequest;
    deleteDispose: typeof accountEmployeeTrainingDeleteDispose;

    // query
    loadAllRequest: typeof accountEmployeeTrainingGetAllRequest;
    loadAllDispose: typeof accountEmployeeTrainingGetAllDispose;

    loadListRequest: typeof accountEmployeeTrainingGetListRequest;
    loadListDispose: typeof accountEmployeeTrainingGetListDispose;

    loadDetailRequest: typeof accountEmployeeTrainingGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeTrainingGetByIdDispose;
  };
}

export interface WithAccountEmployeeTraining extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  accountEmployeeTrainingGetAll, 
  accountEmployeeTrainingGetList,
  accountEmployeeTrainingGetById,
}: IAppState) => ({
  accountEmployeeTrainingState: {
    all: accountEmployeeTrainingGetAll,
    list: accountEmployeeTrainingGetList,
    detail: accountEmployeeTrainingGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeTrainingDispatch: {
    // command
    createRequest: (request: IEmployeeTrainingPostRequest) => dispatch(accountEmployeeTrainingPostRequest(request)),
    createDispose: () => dispatch(accountEmployeeTrainingPostDispose()),

    updateRequest: (request: IEmployeeTrainingPutRequest) => dispatch(accountEmployeeTrainingPutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeTrainingPutDispose()),

    deleteRequest: (request: IEmployeeTrainingDeleteRequest) => dispatch(accountEmployeeTrainingDeleteRequest(request)),
    deleteDispose: () => dispatch(accountEmployeeTrainingDeleteDispose()),

    // query
    loadAllRequest: (request: IEmployeeTrainingAllRequest) => dispatch(accountEmployeeTrainingGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeTrainingGetAllDispose()),

    loadListRequest: (request: IEmployeeTrainingListRequest) => dispatch(accountEmployeeTrainingGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeTrainingGetListDispose()),

    loadDetailRequest: (request: IEmployeeTrainingByIdRequest) => dispatch(accountEmployeeTrainingGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeTrainingGetByIdDispose())
  }
});

export const withAccountEmployeeTraining = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);