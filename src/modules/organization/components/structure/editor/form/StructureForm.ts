import { FormMode } from '@generic/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { StructureFormView } from './StructureFormView';

const formName = 'OrganizationStructure';

export type OrganizationStructureFormData = {
  information: {
    uid: string | null | undefined;
    positionUid: string | null | undefined;
    companyUid: string | null | undefined;
    inactiveDate: string | null | undefined;
    description: string | null | undefined;
  },
  items: OrganizationStructureItemFormData[]
  // item: {
  // }
};

export type OrganizationStructureItemFormData = {
  uid: string | null | undefined;
  positionUid: string | null | undefined;
  start: string | null | undefined;
  end: string | null | undefined; 
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
  companyUidValue: string | undefined;
  inactiveDateValue: string | undefined;
}

export type StructureFormProps 
  = InjectedFormProps<OrganizationStructureFormData, OwnProps> 
  & InjectedIntlProps
  & FormValueProps
  & OwnProps;
  
const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'information.companyUid');
  const inactiveDate = selector(state, 'information.inactiveDate');

  return {
    formName,
    companyUidValue: companyUid,
    inactiveDateValue: inactiveDate,
  };
};

const connectedView = compose<StructureFormProps, OwnProps & InjectedFormProps<OrganizationStructureFormData, OwnProps>>(
  connect(mapStateToProps),
  injectIntl
)(StructureFormView);

export const StructureForm = reduxForm<OrganizationStructureFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);