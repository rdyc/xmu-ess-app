import { IAppState, IQueryCollectionState } from '@generic/interfaces';
import {
  IProjectRegistrationGetAllRequest,
} from '@project/classes/queries/registration';
import { IProject } from '@project/classes/response';
import {
  projectAdministrationGetAllDispose,
  projectAdministrationGetAllRequest,
} from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  projectAdministrationState: {
    all: IQueryCollectionState<IProjectRegistrationGetAllRequest, IProject>;
  };
}

interface PropsFromDispatch {
  projectAdministrationDispatch: {
    // query
    loadAllRequest: typeof projectAdministrationGetAllRequest;
    loadAllDispose: typeof projectAdministrationGetAllDispose;
  };
}

export interface WithProjectAdministration extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ projectAdministrationGetAll }: IAppState) => ({
  projectAdministrationState: {
    all: projectAdministrationGetAll,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectAdministrationDispatch: {
    // query
    loadAllRequest: (request: IProjectRegistrationGetAllRequest) => dispatch(projectAdministrationGetAllRequest(request)),
    loadAllDispose: () => dispatch(projectAdministrationGetAllDispose()),
  }
});

export const withProjectAdministration = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);