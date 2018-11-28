import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { formValueSelector, InjectedFormProps, reduxForm } from 'redux-form';
import { MileageExceptionContainerFormView } from './MileageExceptionContainerFormView';

const formName = 'mileageException';

export type MileageExceptionFormData = {
  // companyUid: string | null | undefined;
  information: {
    uid: string | null | undefined;
    companyUid: string | null | undefined;
    roleUid: string | null | undefined;
    percentage: number;
    projectUid: string | null | undefined;
    siteType: string | null | undefined;
    projectSiteUid: string | null | undefined;
    description: string | null | undefined;
    reason: string | null | undefined;
    inactiveDate: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
}

interface FormValueProps {
  companyUidValue: string | undefined;
  projectUidValue: string | undefined;
}

export type MileageExceptionContainerFormProps 
  = InjectedFormProps<MileageExceptionFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const selector = formValueSelector(formName);

const mapStateToProps = (state: any): FormValueProps => {
  const companyUid = selector(state, 'companyUid');
  const projectUid = selector(state, 'information.projectUid');
  
  return {
    companyUidValue: companyUid,
    projectUidValue: projectUid
  };
};

const connectedView = connect(mapStateToProps)(MileageExceptionContainerFormView);

export const MileageExceptionContainerForm = reduxForm<MileageExceptionFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);