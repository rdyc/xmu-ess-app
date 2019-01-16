import { FormMode } from '@generic/types';
import { IProjectDetail } from '@project/classes/response';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { StatusFormView } from './StatusFormView';

const formName = 'projectStatus';

export type ProjectStatusFormData = {
  information: {
    statusType: string | null | undefined;
  }
};

interface IOwnProps {
  formMode: FormMode;
  projectData: IProjectDetail;
  statusType?: string | undefined;
}

// interface FormValueProps {
//   formStatusType: string | null | undefined;
// }

export type StatusFormProps 
  = InjectedFormProps<ProjectStatusFormData, IOwnProps>
  // & FormValueProps
  & IOwnProps;

// const selector = formValueSelector(formName);

// const mapStateToProps = (state: any): FormValueProps => {
//   const statusType = selector(state, 'information.statusType');
  
//   return {
//     formStatusType: statusType,
//   };
// };

// const connectedView = connect(mapStateToProps)(StatusFormView);

export const StatusForm = reduxForm<ProjectStatusFormData, IOwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(StatusFormView);