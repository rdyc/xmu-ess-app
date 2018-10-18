import {
  IExpenseRequestGetAllRequest,
  IExpenseRequestGetByIdRequest,
  IExpenseRequestPostRequest,
  IExpenseRequestPutRequest,
} from '@expense/classes/queries/request';
import { IExpense, IExpenseDetail } from '@expense/classes/response';
import {
  expenseRequestGetAllDispose,
  expenseRequestGetAllRequest,
  expenseRequestGetByIdDispose,
  expenseRequestGetByIdRequest,
  expenseRequestPostDispose,
  expenseRequestPostRequest,
  expenseRequestPutDispose,
  expenseRequestPutRequest,
} from '@expense/store/actions';
import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  expenseRegisterState: {
    all: IQueryCollectionState<IExpenseRequestGetAllRequest, IExpense>;
    detail: IQuerySingleState<IExpenseRequestGetByIdRequest, IExpenseDetail>;
  };
}

interface PropsFromDispatch {
  expenseRegisterDispatch: {
    // command
    createRequest: typeof expenseRequestPostRequest;
    createDispose: typeof expenseRequestPostDispose;
    updateRequest: typeof expenseRequestPutRequest;
    updateDispose: typeof expenseRequestPutDispose;

    // query
    loadAllRequest: typeof expenseRequestGetAllRequest;
    loadAllDispose: typeof expenseRequestGetAllDispose;
    loadDetailRequest: typeof expenseRequestGetByIdRequest;
    loadDetailDispose: typeof expenseRequestGetByIdDispose;
  };
}

export interface WithExpenseRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ expenseRequestGetAll, expenseRequestGetById }: IAppState) => ({
  expenseRequestState: {
    all: expenseRequestGetAll,
    detail: expenseRequestGetById
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  expenseRequestDispatch: {
    // command
    createRequest: (request: IExpenseRequestPostRequest) => dispatch(expenseRequestPostRequest(request)),
    createDispose: () => dispatch(expenseRequestPostDispose()),
    updateRequest: (request: IExpenseRequestPutRequest) => dispatch(expenseRequestPutRequest(request)),
    updateDispose: () => dispatch(expenseRequestPutDispose()),
    
    // query
    loadAllRequest: (request: IExpenseRequestGetAllRequest) => dispatch(expenseRequestGetAllRequest(request)),
    loadAllDispose: () => dispatch(expenseRequestGetAllDispose()),
    loadDetailRequest: (request: IExpenseRequestGetByIdRequest) => dispatch(expenseRequestGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(expenseRequestGetByIdDispose()),
  }
});

export const withexpenseRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);