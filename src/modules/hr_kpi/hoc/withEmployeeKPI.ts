import {
  IAppState,
  IQueryCollectionState } from '@generic/interfaces';
import {
  IEmployeeKPIGetAllRequest,
} from '@kpi/classes/queries';
import { IEmployeeKPI } from '@kpi/classes/response';
import {
  EmployeeKPIGetAllDispose,
  EmployeeKPIGetAllRequest,
} from '@kpi/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  employeeKPIState: {
    all: IQueryCollectionState<IEmployeeKPIGetAllRequest, IEmployeeKPI>;
  };
}

interface PropsFromDispatch {
  employeeKPIDispatch: {
    // query
    loadAllRequest: typeof EmployeeKPIGetAllRequest;
    loadAllDispose: typeof EmployeeKPIGetAllDispose;
  };
}

export interface WithEmployeeKPI extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ employeeKPIGetAll }: IAppState) => ({
  employeeKPIState: {
    all: employeeKPIGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  employeeKPIDispatch: {
    // query
    loadAllRequest: (request: IEmployeeKPIGetAllRequest) => dispatch(EmployeeKPIGetAllRequest(request)),
    loadAllDispose: () => dispatch(EmployeeKPIGetAllDispose()),
  }
});

export const withEmployeeKPI = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);