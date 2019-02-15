import { FormMode } from '@generic/types';
import { Menus } from '@lookup/classes/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { LookupRoleFormView } from './LookupRoleFormView';

const formName = 'lookupRole';

export type LookupRoleMenuFormData = {
  [key: string]: boolean
};

export type LookupRoleFormData = {
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    name: string | null | undefined;
    gradeType: string | null | undefined;
    description: string | null | undefined;
    isActive: boolean | undefined;
  },
  menu: {
    menus: LookupRoleMenuFormData[]
  }
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
  isCheckedMenus: Menus[];
}

interface FormValueProps {
  formName: string;
}

export type RoleFormProps
  = InjectedFormProps<LookupRoleFormData, OwnProps>
  & OwnProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

const connectedView = connect(mapStateToProps)(LookupRoleFormView);

export const LookupRoleForm = reduxForm<LookupRoleFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);
