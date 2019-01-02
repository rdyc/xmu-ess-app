import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupSystemLimitContainerFormView } from './LookupSystemLimitContainerFormView';

const formName = 'systemLimit';

export type SystemLimitFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    categoryType: string | null | undefined;
    days: number;
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

export type SystemLimitContainerFormProps 
  = InjectedFormProps<SystemLimitFormData, OwnProps>
  & FormValueProps 
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(LookupSystemLimitContainerFormView);

export const LookupSystemLimitContainerForm = reduxForm<SystemLimitFormData, OwnProps>({
form: formName,
touchOnChange: true,
touchOnBlur: true,
enableReinitialize: true,
destroyOnUnmount: true
})(connectedView);