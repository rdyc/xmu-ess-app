import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupRoleFormView } from './LookupRoleFormView';

const formName = 'lookupRole';

export type LookupRoleFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    name: string | null | undefined;
    gradeType: string | null | undefined;
    description: string | null | undefined;
    isActive: boolean | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
}

export type RoleFormProps
  = InjectedFormProps<LookupRoleFormData, OwnProps>
  & OwnProps;

const connectedView = connect()(LookupRoleFormView);

export const LookupRoleForm = reduxForm<LookupRoleFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
