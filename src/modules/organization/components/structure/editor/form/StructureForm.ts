import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { StructureFormView } from './StructureFormView';

const formName = 'OrganizationStructure';

export type OrganizationStructureFormData = {
  information: {
    uid: string | null | undefined;
    name: string | null | undefined;
    companyUid: string | null | undefined;
    inactiveDate: string | null | undefined;
    description: string | null | undefined;
  },
  item: {
    items: OrganizationStructureItemFormData[]
  }
};

export type OrganizationStructureItemFormData = {
  uid: string | null | undefined;
  sequence: number | null | undefined;
  positionUid: string | null | undefined;
  relationType: string | null | undefined;
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  companyUidValue: string | undefined;
}

export type StructureFormProps 
  = InjectedFormProps<OrganizationStructureFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'information.companyUid');

  return {
    companyUidValue: companyUid
  };
};

const connectedView = connect(mapStateToProps)(StructureFormView);

export const StructureForm = reduxForm<OrganizationStructureFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);