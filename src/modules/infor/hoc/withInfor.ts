import { IInforPostRequest } from '@infor/classes/queries';
import { inforPostDispose, inforPostRequest } from '@infor/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromDispatch {
  inforDispatch: {
    // command
    postRequest: typeof inforPostRequest;
    postDispose: typeof inforPostDispose;
  };
}

export interface WithInfor extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  inforDispatch: {
    // command
    postRequest: (request: IInforPostRequest) => dispatch(inforPostRequest(request)),
    postDispose: () => dispatch(inforPostDispose()),
  }
});

export const withInfor = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);