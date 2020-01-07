import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IAccountEmployeeCompetencyGetAllRequest, 
  IHrCompetencyAssessmentGetAllRequest,
  IHrCompetencyAssessmentGetDetailRequest, 
  IHrCompetencyAssessmentPostRequest,
  IHrCompetencyAssessmentPutRequest
} from '@hr/classes/queries/';
import { IAccountEmployeeCompetency, IHrCompetencyAssessment, IHrCompetencyAssessmentDetail } from '@hr/classes/response/';
import { 
  accountEmployeeCompetencyGetAllDispose, 
  accountEmployeeCompetencyGetAllRequest, 
  hrCompetencyAssessmentGetAllDispose, 
  hrCompetencyAssessmentGetAllRequest,
  hrCompetencyAssessmentGetByIdDispose, 
  hrCompetencyAssessmentGetByIdRequest, 
  hrCompetencyAssessmentPostDispose,
  hrCompetencyAssessmentPostRequest,
  hrCompetencyAssessmentPutDispose,
  hrCompetencyAssessmentPutRequest
} from '@hr/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  hrCompetencyAssessmentState: {
    employee: IQueryCollectionState<IAccountEmployeeCompetencyGetAllRequest, IAccountEmployeeCompetency>;
    all: IQueryCollectionState<IHrCompetencyAssessmentGetAllRequest, IHrCompetencyAssessment>;
    detail: IQuerySingleState<IHrCompetencyAssessmentGetDetailRequest, IHrCompetencyAssessmentDetail>;
  };
}

interface PropsFromDispatch {
  hrCompetencyAssessmentDispatch: {
    // command
    createRequest: typeof hrCompetencyAssessmentPostRequest;
    createDispose: typeof hrCompetencyAssessmentPostDispose;
    updateRequest: typeof hrCompetencyAssessmentPutRequest;
    updateDispose: typeof hrCompetencyAssessmentPutDispose;

    // query
    loadAllRequest: typeof hrCompetencyAssessmentGetAllRequest;
    loadAllDispose: typeof hrCompetencyAssessmentGetAllDispose;
    loadEmployeeRequest: typeof accountEmployeeCompetencyGetAllRequest;
    loadEmployeeDispose: typeof accountEmployeeCompetencyGetAllDispose;
    loadDetailRequest: typeof hrCompetencyAssessmentGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyAssessmentGetByIdDispose;
  };
}

export interface WithHrCompetencyAssessment extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyAssessmentGetAll, hrCompetencyAssessmentGetById, accountEmployeeCompetencyGetAll }: IAppState) => ({
  hrCompetencyAssessmentState: {
    all: hrCompetencyAssessmentGetAll,
    detail: hrCompetencyAssessmentGetById,
    employee: accountEmployeeCompetencyGetAll
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hrCompetencyAssessmentDispatch: {
    // command
    createRequest: (request: IHrCompetencyAssessmentPostRequest) => dispatch(hrCompetencyAssessmentPostRequest(request)),
    createDispose: () => dispatch(hrCompetencyAssessmentPostDispose()),
    updateRequest: (request: IHrCompetencyAssessmentPutRequest) => dispatch(hrCompetencyAssessmentPutRequest(request)),
    updateDispose: () => dispatch(hrCompetencyAssessmentPutDispose()),
    // query
    loadAllRequest: (request: IHrCompetencyAssessmentGetAllRequest) => dispatch(hrCompetencyAssessmentGetAllRequest(request)),
    loadAllDispose: () => dispatch(hrCompetencyAssessmentGetAllDispose()),
    loadEmployeeRequest: (request: IAccountEmployeeCompetencyGetAllRequest) => dispatch(accountEmployeeCompetencyGetAllRequest(request)),
    loadEmployeeDispose: () => dispatch(accountEmployeeCompetencyGetAllDispose()),
    loadDetailRequest: (request: IHrCompetencyAssessmentGetDetailRequest) => dispatch(hrCompetencyAssessmentGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyAssessmentGetByIdDispose()),
  }
});

export const withHrCompetencyAssessment = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);