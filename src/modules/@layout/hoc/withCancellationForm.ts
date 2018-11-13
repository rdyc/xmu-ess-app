import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { submit } from 'redux-form';

interface PropsFromDispatch {
  leaveCancellationDispatch: {
    submitForm: (formName: string) => void;
  };
}

export interface WithCancellationForm extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  leaveCancellationDispatch: {
    submitForm: (formName: string) => dispatch(submit(formName)),
  }
});

export const withCancellationForm = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);