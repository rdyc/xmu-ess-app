import { FormMode } from '@generic/types';
import { InjectedFormProps, reduxForm } from 'redux-form';

import { StatusFormView } from './StatusFormView';

const formName = 'projectStatus';

export type ProjectStatusFormData = {
  information: {
    statusType: string | null | undefined;
  }
};

interface OwnProps {
  formMode: FormMode;
  statusType?: string | undefined;
}

// interface FormValueProps {
//   formStatusType: string | null | undefined;
// }

export type StatusFormProps 
  = InjectedFormProps<ProjectStatusFormData, OwnProps>
  // & FormValueProps
  & OwnProps;

// const selector = formValueSelector(formName);

// const mapStateToProps = (state: any): FormValueProps => {
//   const statusType = selector(state, 'information.statusType');
  
//   return {
//     formStatusType: statusType,
//   };
// };

// const connectedView = connect(mapStateToProps)(StatusFormView);

export const StatusForm = reduxForm<ProjectStatusFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true
})(StatusFormView);