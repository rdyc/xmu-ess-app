import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import {  InjectedFormProps, reduxForm } from 'redux-form';
import { HierarchyFormView } from './HierarchyFormView';

const formName = 'OrganizationHierarchy';

export type OrganizationHierarchyFormData = {
  information: {
    name: string | null | undefined;
    companyUid: string | null | undefined;
    inactiveDate: string | null | undefined;
    description: string | null | undefined;
  },
  item: {
    items: OrganizationHierarchyItemFormData[]
  }
};

export type OrganizationHierarchyItemFormData = {
  sequence: number | null | undefined;
  positionUid: string | null | undefined;
  relationType: string | null | undefined;
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
}

export type HierarchyFormProps 
  = InjectedFormProps<OrganizationHierarchyFormData, OwnProps> 
  & FormValueProps
  & OwnProps;
  
const mapStateToProps = (): FormValueProps => {
  return {};
};

const connectedView = connect(mapStateToProps)(HierarchyFormView);

export const HierarchyForm = reduxForm<OrganizationHierarchyFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);