import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
  IHrCompetencyAssessmentGetAllRequest, 
  IHrCompetencyAssessmentGetDetailRequest,
  IHrCompetencyAssessmentPostRequest, 
  IHrCompetencyAssessmentPutRequest
} from '@hr/classes/queries/';
import { IHrCompetencyAssessment, IHrCompetencyAssessmentDetail } from '@hr/classes/response/';
import { 
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
    loadDetailRequest: typeof hrCompetencyAssessmentGetByIdRequest;
    loadDetailDispose: typeof hrCompetencyAssessmentGetByIdDispose;
  };
}

export interface WithHrCompetencyAssessment extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ hrCompetencyAssessmentGetAll, hrCompetencyAssessmentGetById }: IAppState) => ({
  hrCompetencyAssessmentState: {
    all: hrCompetencyAssessmentGetAll,
    detail: hrCompetencyAssessmentGetById,
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
    loadDetailRequest: (request: IHrCompetencyAssessmentGetDetailRequest) => dispatch(hrCompetencyAssessmentGetByIdRequest(request)),
    loadDetailDispose: () => dispatch(hrCompetencyAssessmentGetByIdDispose()),
  }
});

export const withHrCompetencyAssessment = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);