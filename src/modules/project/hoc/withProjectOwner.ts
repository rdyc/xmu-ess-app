import { IProjectOwnerPutRequest } from '@project/classes/queries/owner';
import { projectOwnerPutDispose, projectOwnerPutRequest } from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  projectOwnerDispatch: {
    // command
    updateRequest: typeof projectOwnerPutRequest;
    updateDispose: typeof projectOwnerPutDispose;
  };
}

export interface WithProjectOwner extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectOwnerDispatch: {
    // command
    updateRequest: (request: IProjectOwnerPutRequest) => dispatch(projectOwnerPutRequest(request)),
    updateDispose: () => dispatch(projectOwnerPutDispose()),
  }
});

export const withProjectOwner = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);