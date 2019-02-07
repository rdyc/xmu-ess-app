import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { AccountEmployeeNoteContainerView } from './AccountEmployeeNoteContainerView';

const formName = 'accountEmployeeNote';

export type AccountEmployeeNoteFormData = {
  note: {
    id: string | null | undefined;
    employeeUid: string | null | undefined;
    text: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode | undefined;
  formAction: 'update' | 'delete';
}

interface FormValueProps {
  formName: string;
}

export type AccountEmployeeNoteContainerProps
  = InjectedFormProps<AccountEmployeeNoteFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(AccountEmployeeNoteContainerView);

export const AccountEmployeeNoteContainerForm = reduxForm<AccountEmployeeNoteFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);