import { IProjectStatusPutRequest } from '@project/classes/queries/status';
import { projectStatusPutDispose, projectStatusPutRequest } from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  projectStatusDispatch: {
    // command
    updateRequest: typeof projectStatusPutRequest;
    updateDispose: typeof projectStatusPutDispose;
  };
}

export interface WithProjectStatus extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectStatusDispatch: {
    // command
    updateRequest: (request: IProjectStatusPutRequest) => dispatch(projectStatusPutRequest(request)),
    updateDispose: () => dispatch(projectStatusPutDispose()),
  }
});

export const withProjectStatus = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);