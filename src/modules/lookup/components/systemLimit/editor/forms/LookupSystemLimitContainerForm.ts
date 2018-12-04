import { FormMode } from '@generic/types';
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
}

export type SystemLimitContainerFormProps 
  = InjectedFormProps<SystemLimitFormData, OwnProps> 
  & OwnProps;

export const LookupSystemLimitContainerForm = reduxForm<SystemLimitFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(LookupSystemLimitContainerFormView);