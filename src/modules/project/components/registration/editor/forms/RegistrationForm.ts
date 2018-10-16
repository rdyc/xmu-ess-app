import { ProjectType } from '@common/classes/types';
import { RegistrationFormView } from '@project/components/registration/editor/forms/RegistrationFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

export type ProjectDocumentFormData = {
  uid: string;
  documentType: string;
  isChecked: boolean;
};

export type ProjectSalesFormData = {
  uid: string;
  employeeUid: string;
};

export type ProjectRegistrationFormData = {
  information: {
    customerUid: string | undefined;
    projectType: string | undefined;
    contractNumber: string | undefined;
    name: string | undefined;
    description: string | undefined;
    start: string | undefined;
    end: string | undefined;
    currencyType: string | undefined;
    rate: number | 1;
    valueUsd: number | 1;
    valueIdr: number | 1;
  },
  document: {
    project: ProjectDocumentFormData[], 
    preSales: ProjectDocumentFormData[],
  }, 
  sales: {
    employees: ProjectSalesFormData[]
  }
};

const formName = 'projectRegistration';

interface FormValueProps {
  formIsProject: boolean | false;
  formIsPresales: boolean | false;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType: string | undefined;
  formRate: number | 1;
  formValueUsd: number | 1;
}

export type RegistrationFormProps = InjectedFormProps<ProjectRegistrationFormData> & FormValueProps;

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
    formValueUsd: valueUsd 
  };
};

const connectedView = connect(mapStateToProps)(RegistrationFormView);

export const RegistrationForm = reduxForm<ProjectRegistrationFormData>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: false
})(connectedView);