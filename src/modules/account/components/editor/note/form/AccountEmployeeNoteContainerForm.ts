import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeNoteContainerView } from './AccountEmployeeNoteContainerFormView';

const formName = 'accountEmployeeNote';

export type AccountEmployeeNoteFormData = {
  note: {
    id: number | null | undefined;
    employeeUid: string | null | undefined;
    text: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeNoteContainerFormProps
  = InjectedFormProps<AccountEmployeeNoteFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

// const connectedView = connect(mapStateToProps)(AccountEmployeeNoteContainerView);

const enhance = compose<AccountEmployeeNoteContainerFormProps, OwnProps & InjectedFormProps<AccountEmployeeNoteFormData, OwnProps>>(
  connect(mapStateToProps)
)(AccountEmployeeNoteContainerView);

export const AccountEmployeeNoteContainerForm = reduxForm<AccountEmployeeNoteFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);