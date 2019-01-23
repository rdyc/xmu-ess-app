import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupDiemFormView } from './LookupDiemFormView';

const formName = 'lookupDiem';

export type LookupDiemFormData = {
  information: {
    // uid: string | null | undefined;
    companyUid: string | null | undefined;
    currencyUid: string | null | undefined;
    projectType: string | null | undefined;
    destinationType: string | null | undefined;
    value: number;
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

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName
  };
};

export type LookupDiemFormProps
  = InjectedFormProps<LookupDiemFormData, OwnProps>
  & FormValueProps
  & OwnProps;

const connectedView = connect(mapStateToProps)(LookupDiemFormView);

export const LookupDiemForm = reduxForm<LookupDiemFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);