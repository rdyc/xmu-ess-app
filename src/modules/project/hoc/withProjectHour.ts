import { IProjectHourPutRequest } from '@project/classes/queries/hour';
import { projectHourPutDispose, projectHourPutRequest } from '@project/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  projectHourDispatch: {
    // command
    updateRequest: typeof projectHourPutRequest;
    updateDispose: typeof projectHourPutDispose;
  };
}

export interface WithProjectHour extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  projectHourDispatch: {
    // command
    updateRequest: (request: IProjectHourPutRequest) => dispatch(projectHourPutRequest(request)),
    updateDispose: () => dispatch(projectHourPutDispose()),
  }
});

export const withProjectHour = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);