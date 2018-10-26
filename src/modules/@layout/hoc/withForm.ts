import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { submit } from 'redux-form';

interface PropsFromDispatch {
  workflowApprovalDispatch: {
    submitForm: (formName: string) => void;
  };
}

export interface WithForm extends PropsFromDispatch {}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  workflowApprovalDispatch: {
    submitForm: (formName: string) => dispatch(submit(formName)),
  }
});

export const withForm = (component: React.ComponentType) =>
  connect(undefined, mapDispatchToProps)(component);