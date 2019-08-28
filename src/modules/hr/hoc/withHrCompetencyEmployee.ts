import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyEmployeeGetAllRequest, 
  IHrCompetencyEmployeeGetDetailRequest,
  IHrCompetencyEmployeePatchRequest, 
  IHrCompetencyEmployeePostRequest
} from '@hr/classes/queries/';
import { IHrCompetencyEmployee, IHrCompetencyEmployeeDetail } from '@hr/classes/response/';
import { 
  hrCompetencyEmployeeGetAllDispose, 
  hrCompetencyEmployeeGetAllRequest, 
  hrCompetencyEmployeeGetByIdDispose, 
  hrCompetencyEmployeeGetByIdRequest,
  hrCompetencyEmployeePatchDispose, 
  hrCompetencyEmployeePatchRequest, 
  hrCompetencyEmployeePostDispose, 
  hrCompetencyEmployeePostRequest,
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyEmployeeState: {
    all: IQueryCollectionState<IHrCompetencyEmployeeGetAllRequest, IHrCompetencyEmployee>;
    detail: IQuerySingleState<IHrCompetencyEmployeeGetDetailRequest, IHrCompetencyEmployeeDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyEmployeeDispatch: {
    // command
    createRequest: typeof hrCompetencyEmployeePostRequest;
    createDispose: typeof hrCompetencyEmployeePostDispose;
    patchRequest: typeof hrCompetencyEmployeePatchRequest;
    patchDispose: typeof hrCompetencyEmployeePatchDispose;

    // query
    loadAllRequest: typeof hrCompetencyEmployeeGetAllRequest;
    loadAllDispose: typeof hrCompetencyEmployeeGetAllDispose;
    loadDetailRequest: typeof hrCompetencyEmployeeGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyEmployeeGetByIdDispose;
  };
}

export interface WithHrCompetencyEmployee extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyEmployeeGetAll, hrCompetencyEmployeeGetById }: IAppState) => ({
  hrCompetencyEmployeeState: {
    all: hrCompetencyEmployeeGetAll,
    detail: hrCompetencyEmployeeGetById,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyEmployeeDispatch: {
    // command
    createRequest: (request: IHrCompetencyEmployeePostRequest) => dispatch(hrCompetencyEmployeePostRequest(request)),
    createDispose: () => dispatch(hrCompetencyEmployeePostDispose()),
    patchRequest: (request: IHrCompetencyEmployeePatchRequest) => dispatch(hrCompetencyEmployeePatchRequest(request)),
    patchDispose: () => dispatch(hrCompetencyEmployeePatchDispose()),

    // query
    loadAllRequest: (request: IHrCompetencyEmployeeGetAllRequest) => dispatch(hrCompetencyEmployeeGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyEmployeeGetAllDispose()),
    loadDetailRequest: (request: IHrCompetencyEmployeeGetDetailRequest) => dispatch(hrCompetencyEmployeeGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyEmployeeGetByIdDispose()),
  }
});

export const withHrCompetencyEmployee = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);