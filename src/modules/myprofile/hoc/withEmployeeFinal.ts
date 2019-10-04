import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { IEmployeeFinalGetDetailRequest } from '@profile/classes/queries';
import { IEmployeeFinalDetail } from '@profile/classes/response';
import {
  employeeFinalGetDetailDispose,
  employeeFinalGetDetailRequest
} from '@profile/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  employeeFinalState: {
    detail: IQuerySingleState<IEmployeeFinalGetDetailRequest, IEmployeeFinalDetail>;
  };
}

interface PropsFromDispatch {
  employeeFinalDispatch: {
    // query
    loadDetailRequest: typeof employeeFinalGetDetailRequest;
    loadDetailDispose: typeof employeeFinalGetDetailDispose;
  };
}

export interface WithEmployeeFinal extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ employeeFinalGetDetail }: IAppState) => ({
  employeeFinalState: {
    detail: employeeFinalGetDetail
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  employeeFinalDispatch: {
    // query
    loadDetailRequest: (request: IEmployeeFinalGetDetailRequest) =>
      dispatch(employeeFinalGetDetailRequest(request)),
    loadDetailDispose: () => dispatch(employeeFinalGetDetailDispose())
  }
});

export const withEmployeeFinal = (component: React.ComponentType) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
