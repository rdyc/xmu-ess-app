import { IEmployeeAccessList } from '@account/classes';
import { IEmployeeAccessGetAllRequest, IEmployeeAccessGetDetailRequest } from '@account/classes/queries';
import { IEmployeeAccessGetListRequest } from '@account/classes/queries/IEmployeeAccessGetListRequest';
import { IEmployeeAccess } from '@account/classes/response/IEmployeeAccess';
import { 
  accountEmployeeAccessGetAllDispose, 
  accountEmployeeAccessGetAllRequest, 
  accountEmployeeAccessGetByIdDispose, 
  accountEmployeeAccessGetByIdRequest, 
  accountEmployeeAccessGetListDispose, 
  accountEmployeeAccessGetListRequest 
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

    // query
    loadAllRequest: typeof accountEmployeeAccessGetAllRequest
    loadAllDispose: typeof accountEmployeeAccessGetAllDispose
    loadListRequest: typeof accountEmployeeAccessGetListRequest
    loadListDispose: typeof accountEmployeeAccessGetListDispose
    loadDetailRequest: typeof accountEmployeeAccessGetByIdRequest
    loadDetailDispose: typeof accountEmployeeAccessGetByIdDispose
  };
}

export interface WithLookupCustomer extends PropsFromstate, PropsFromDispatch { }

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