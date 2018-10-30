import { FormMode } from '@generic/types';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { OwnerFormView } from './OwnerFormView';

export type ProjectOwnerFormData = {
  information: {
    uid: string | null | undefined;
    employeeUid: string | null | undefined;
    customerUid: string | null | undefined;
    projectType: string | null | undefined;
    name: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
}

export type OwnerFormProps 
  = InjectedFormProps<ProjectOwnerFormData, OwnProps>
  & OwnProps;

export const OwnerForm = reduxForm<ProjectOwnerFormData, OwnProps>({
  form: 'projectOwner',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(OwnerFormView);