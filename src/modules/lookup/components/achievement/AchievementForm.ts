import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { AchievementFormView } from './AchievementFormView';

export interface UploadFormData {
  file?: FileList;
}

interface FormValueProps {
  formValues: UploadFormData;
}

export type AchievementFormProps 
  = InjectedFormProps<UploadFormData>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('formUpload')(state) as UploadFormData
});

const enhance = compose<AchievementFormProps, InjectedFormProps<UploadFormData>>(
  connect(mapStateToProps),
  injectIntl
)(AchievementFormView);

export const AchievementForm = reduxForm<UploadFormData>({
  form: 'formUpload',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);