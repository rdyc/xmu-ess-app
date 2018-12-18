import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupCompanyFormView } from './LookupCompanyFormView';

const formName = 'lookupCompany';

export type LookupCompanyFormData = {
  information: {
    uid: string | null | undefined;
    code: string | null | undefined;
    name: string | null | undefined;
  }
};

interface FormValueProps {
  formName: string;
}

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

export type CompanyFormProps
  = InjectedFormProps<LookupCompanyFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName
  };
};

const connectedView = connect(mapStateToProps)(LookupCompanyFormView);

export const LookupCompanyForm = reduxForm<LookupCompanyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
