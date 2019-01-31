import { FormMode } from '@generic/types';
import { InjectedIntlProps } from 'react-intl';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { PositionFormView } from './PositionFormView';

const formName = 'lookupPosition';

export type PositionFormData = {
  information: {
    uid: string | undefined,
    companyUid: string | undefined,
    name: string | undefined,
    description: string | null | undefined,
    inactiveDate: string | null | undefined,
    isAllowMultiple: boolean  | undefined,
  }
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
}

const mapStateToProps = (state: any): FormValueProps => {
  return {
    formName,
  };
};

export type PositionFormProps
  = InjectedFormProps<PositionFormData, OwnProps>
  & InjectedIntlProps
  & FormValueProps
  & OwnProps;

const connectedView = connect(mapStateToProps)(PositionFormView);

export const PositionForm = reduxForm<PositionFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);