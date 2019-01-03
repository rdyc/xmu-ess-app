import { 
  IEmployeeAccessHistoryAllRequest, 
  IEmployeeAccessHistoryByIdRequest, 
  IEmployeeAccessHistoryListRequest 
} from '@account/classes/queries/employeeAccessHistory';
import { 
  IEmployeeAccessHistory, 
  IEmployeeAccessHistoryDetail, 
  IEmployeeAccessHistoryList 
} from '@account/classes/response/employeeAccessHistory';
import { 
  accountEmployeeAccessHistoryGetAllDispose, 
  accountEmployeeAccessHistoryGetAllRequest, 
  accountEmployeeAccessHistoryGetByIdDispose, 
  accountEmployeeAccessHistoryGetByIdRequest, 
  accountEmployeeAccessHistoryGetListDispose, 
  accountEmployeeAccessHistoryGetListRequest 
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeAccessHistoryState: {
    all: IQueryCollectionState<IEmployeeAccessHistoryAllRequest, IEmployeeAccessHistory>;
    list: IQueryCollectionState<IEmployeeAccessHistoryListRequest, IEmployeeAccessHistoryList>;
    detail: IQuerySingleState<IEmployeeAccessHistoryByIdRequest, IEmployeeAccessHistoryDetail>;
  };
}

interface PropsFromDispatch {
  accountEmployeeAccessHistoryDispatch: {    
    // query
    loadAllRequest: typeof accountEmployeeAccessHistoryGetAllRequest;
    loadAllDispose: typeof accountEmployeeAccessHistoryGetAllDispose;
    
    loadListRequest: typeof accountEmployeeAccessHistoryGetListRequest;
    loadListDispose: typeof accountEmployeeAccessHistoryGetListDispose;

    loadDetailRequest: typeof accountEmployeeAccessHistoryGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeAccessHistoryGetByIdDispose;
  };
}

export interface WithAccountEmployeeAccessHistory extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ accountEmployeeAccessHistoryGetAll, accountEmployeeAccessHistoryGetList, accountEmployeeAccessHistoryGetById }: IAppState) => ({
  accountEmployeeAccessHistoryState: {
    all: accountEmployeeAccessHistoryGetAll,
    list: accountEmployeeAccessHistoryGetList,
    detail: accountEmployeeAccessHistoryGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeAccessHistoryDispatch: {
    // command

    // query
    loadAllRequest: (request: IEmployeeAccessHistoryAllRequest) => dispatch(accountEmployeeAccessHistoryGetAllRequest(request)),
    loadListRequest: (request: IEmployeeAccessHistoryListRequest) => dispatch(accountEmployeeAccessHistoryGetListRequest(request)),
    loadDetailRequest: (request: IEmployeeAccessHistoryByIdRequest) => dispatch(accountEmployeeAccessHistoryGetByIdRequest(request)),
  }
});

export const withAccountEmployeeAccessHistory = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);