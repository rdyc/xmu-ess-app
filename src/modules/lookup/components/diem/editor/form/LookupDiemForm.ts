import { FormMode } from '@generic/types';
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

interface OwnProps {
  formMode: FormMode
  ;
}

export type LookupDiemFormProps
  = InjectedFormProps<LookupDiemFormData, OwnProps>
  & OwnProps;

export const LookupDiemForm = reduxForm<LookupDiemFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(LookupDiemFormView);