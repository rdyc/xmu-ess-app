import { 
  IEmployeeRateAllRequest, 
  IEmployeeRateByIdRequest, 
  IEmployeeRateCurrentRequest, 
  IEmployeeRateListRequest, 
  IEmployeeRatePutRequest
} from '@account/classes/queries/employeeRate';
import { 
  IEmployeeRate, 
} from '@account/classes/response/employeeRate';
import { 
  accountEmployeeRateCurrentDispose, 
  accountEmployeeRateCurrentRequest, 
  accountEmployeeRateGetAllDispose, 
  accountEmployeeRateGetAllRequest, 
  accountEmployeeRateGetByIdDispose, 
  accountEmployeeRateGetByIdRequest, 
  accountEmployeeRateGetListDispose, 
  accountEmployeeRateGetListRequest, 
  accountEmployeeRatePutDispose,
  accountEmployeeRatePutRequest
} from '@account/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  accountEmployeeRateState: {
    current: IQuerySingleState<IEmployeeRateCurrentRequest, IEmployeeRate>;
    all: IQueryCollectionState<IEmployeeRateAllRequest, IEmployeeRate>;
    list: IQueryCollectionState<IEmployeeRateListRequest, IEmployeeRate>;
    detail: IQuerySingleState<IEmployeeRateByIdRequest, IEmployeeRate>;
  };
}

interface PropsFromDispatch {
  accountEmployeeRateDispatch: {
    // command
    updateRequest: typeof accountEmployeeRatePutRequest;
    updateDispose: typeof accountEmployeeRatePutDispose;

    // query
    loadCurrentRequest: typeof accountEmployeeRateCurrentRequest;
    loadCurrentDispose: typeof accountEmployeeRateCurrentDispose;

    loadAllRequest: typeof accountEmployeeRateGetAllRequest;
    loadAllDispose: typeof accountEmployeeRateGetAllDispose;

    loadListRequest: typeof accountEmployeeRateGetListRequest;
    loadListDispose: typeof accountEmployeeRateGetListDispose;

    loadDetailRequest: typeof accountEmployeeRateGetByIdRequest;
    loadDetailDispose: typeof accountEmployeeRateGetByIdDispose;
  };
}

export interface WithAccountEmployeeRate extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ 
  accountEmployeeRateCurrent,
  accountEmployeeRateGetAll, 
  accountEmployeeRateGetList,
  accountEmployeeRateGetById,
}: IAppState) => ({
  accountEmployeeRateState: {
    current: accountEmployeeRateCurrent,
    all: accountEmployeeRateGetAll,
    list: accountEmployeeRateGetList,
    detail: accountEmployeeRateGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  accountEmployeeRateDispatch: {
    // command
    updateRequest: (request: IEmployeeRatePutRequest) => dispatch(accountEmployeeRatePutRequest(request)),
    updateDispose: () => dispatch(accountEmployeeRatePutDispose()),

    // query
    loadCurrentRequest: (request: IEmployeeRateCurrentRequest) => dispatch(accountEmployeeRateCurrentRequest(request)),
    loadCurrentDispose: () => dispatch(accountEmployeeRateCurrentDispose()),

    loadAllRequest: (request: IEmployeeRateAllRequest) => dispatch(accountEmployeeRateGetAllRequest(request)),
    loadAllDispose: () => dispatch(accountEmployeeRateGetAllDispose()),

    loadListRequest: (request: IEmployeeRateListRequest) => dispatch(accountEmployeeRateGetListRequest(request)),
    loadListDispose: () => dispatch(accountEmployeeRateGetListDispose()),

    loadDetailRequest: (request: IEmployeeRateByIdRequest) => dispatch(accountEmployeeRateGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(accountEmployeeRateGetByIdDispose())
  }
});

export const withAccountEmployeeRate = (component: React.ComponentType) => 
  connect(mapStateToProps, mapDispatchToProps)(component);