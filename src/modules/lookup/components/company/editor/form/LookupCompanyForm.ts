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

interface OwnProps {
  formMode: FormMode;
}

export type CompanyFormProps
  = InjectedFormProps<LookupCompanyFormData, OwnProps>
  & OwnProps;

const connectedView = connect()(LookupCompanyFormView);

export const LookupCompanyForm = reduxForm<LookupCompanyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
