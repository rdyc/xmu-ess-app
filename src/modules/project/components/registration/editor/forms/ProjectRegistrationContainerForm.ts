import { ProjectType } from '@common/classes/types';
import { FormMode } from '@generic/types';
import { ProjectRegistrationContainerFormView } from '@project/components/registration/editor/forms/ProjectRegistrationContainerFormView';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';

const formName = 'projectRegistration';

export type ProjectDocumentFormData = {
  [key: string]: boolean
};

export type ProjectSalesFormData = {
  uid?: string;
  employeeUid: string;
  fullName: string;
  email: string;
};

export type ProjectRegistrationFormData = {
  information: {
    uid?: string | null;
    ownerEmployeeUid?: string | null;
    customerUid?: string | null;
    projectType?: string | null;
    contractNumber?: string | null;
    name?: string | null;
    description?: string | null;
    start?: string | null;
    end?: string | null;
    currencyType?: string | null;
    rate: number;
    valueUsd: number;
    valueIdr: number;
    hours?: number;
  },
  document: {
    project: ProjectDocumentFormData[], 
    preSales: ProjectDocumentFormData[],
  }, 
  sales: {
    employees: ProjectSalesFormData[]
  }
};

interface IOwnProps {
  formMode: FormMode;
  isRequestor: boolean;
  isAdmin: boolean;
}

interface FormValueProps {
  formIsProject: boolean | false;
  formIsPresales: boolean | false;
  formIsCurrencyIDR: boolean | false;
  formCurrencyType?: string;
  formRate: number | 1;
  formValue: number | 1;
}

export type ProjectRegistrationContainerFormProps 
  = InjectedFormProps<ProjectRegistrationFormData, IOwnProps> 
  & FormValueProps
  & IOwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const projectType = selector(state, 'information.projectType');
  const currencyType = selector(state, 'information.currencyType');
  const rate = selector(state, 'information.rate');
  const valueUsd = selector(state, 'information.valueUsd');
  
  return {
    formIsProject: ([ProjectType.Project, ProjectType.NonProject, ProjectType.ExtraMiles, ProjectType.Maintenance]).indexOf(projectType) !== -1,
    formIsPresales: ([ProjectType.PreSales]).indexOf(projectType) !== -1,
    formIsCurrencyIDR: currencyType === 'SCR01',
    formCurrencyType: currencyType,
    formRate: rate,
    formValue: valueUsd 
  };
};

const connectedView = connect(mapStateToProps)(ProjectRegistrationContainerFormView);

export const ProjectRegistrationContainerForm = reduxForm<ProjectRegistrationFormData, IOwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);