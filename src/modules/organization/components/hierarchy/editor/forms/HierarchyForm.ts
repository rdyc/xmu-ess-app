import { FormMode } from '@generic/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { HierarchyFormView } from './HierarchyFormView';

const formName = 'OrganizationHierarchy';

export type OrganizationHierarchyFormData = {
  information: {
    uid: string | null | undefined;
    name: string | null | undefined;
    companyUid: string | null | undefined;
    inactiveDate: string | null | undefined;
    description: string | null | undefined;
  },
  items: OrganizationHierarchyItemFormData[]
  // item: {
  // }
};

export type OrganizationHierarchyItemFormData = {
  uid: string | null | undefined;
  sequence: number | null | undefined;
  positionUid: string | null | undefined;
  relationType: string | null | undefined;
};

interface OwnProps {
  formMode: FormMode;
  submitDialogTitle: string;
  submitDialogContentText: string;
  submitDialogCancelText: string;
  submitDialogConfirmedText: string;
}

interface FormValueProps {
  companyUidValue: string | undefined;
  formName: string;
}

export type HierarchyFormProps 
  = InjectedFormProps<OrganizationHierarchyFormData, OwnProps> 
  & InjectedIntlProps
  & FormValueProps
  & OwnProps;
  
const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'information.companyUid');

  return {
    formName,
    companyUidValue: companyUid
  };
};

const connectedView = compose<HierarchyFormProps, OwnProps & InjectedFormProps<OrganizationHierarchyFormData, OwnProps>>(
  connect(mapStateToProps), 
  injectIntl
)(HierarchyFormView);

export const HierarchyForm = reduxForm<OrganizationHierarchyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  destroyOnUnmount: true,
  // enableReinitialize: true
})(connectedView);