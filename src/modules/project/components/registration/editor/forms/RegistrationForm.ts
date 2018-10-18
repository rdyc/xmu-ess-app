import { ProjectType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { RegistrationFormView } from '@project/components/registration/editor/forms/RegistrationFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'projectRegistration';

export type ProjectDocumentFormData = {
  [key: string]: boolean
};

export type ProjectSalesFormData = {
  uid: string | null;
  employeeUid: string;
  fullName: string;
  email: string;
};

export type ProjectRegistrationFormData = {
  information: {
    uid: string | null | undefined;
    ownerEmployeeUid: string | null | undefined;
    customerUid: string | null | undefined;
    projectType: string | null | undefined;
    contractNumber: string | null | undefined;
    name: string | null | undefined;
    description: string | null | undefined;
    start: string | null | undefined;
    end: string | null | undefined;
    currencyType: string | null | undefined;
    rate: number;
    valueUsd: number;
    valueIdr: number;
  },
  document: {
    project: ProjectDocumentFormData[], 
    preSales: ProjectDocumentFormData[],
  }, 
  sales: {
    employees: ProjectSalesFormData[]
  }
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  formIsProject: boolean | false;
  formIsPresales: boolean | false;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | null;
  formRate: number | 1;
  formValue: number | 1;
}

export type RegistrationFormProps 
  = InjectedFormProps<ProjectRegistrationFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const projectType = selector(state, 'information.projectType');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const valueUsd = selector(state, 'information.valueUsd');
  
  return {
    formIsProject: projectType === ProjectType.Project,
    formIsPresales: projectType === ProjectType.PreSales,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValue: valueUsd 
  };
};

const connectedView = connect(mapStateToProps)(RegistrationFormView);

export const RegistrationForm = reduxForm<ProjectRegistrationFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(connectedView);