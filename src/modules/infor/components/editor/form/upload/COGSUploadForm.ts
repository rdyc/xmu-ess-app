import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { COGSUploadFormView } from './COGSUploadFormView';

export interface COGSFormData {
  file?: FileList;
}

interface FormValueProps {
  formValues: COGSFormData;
}

export type COGSUploadFormProps 
  = InjectedFormProps<COGSFormData>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('formUpload')(state) as COGSFormData
});

const enhance = compose<COGSUploadFormProps, InjectedFormProps<COGSFormData>>(
  connect(mapStateToProps),
  injectIntl
)(COGSUploadFormView);

export const COGSUploadForm = reduxForm<COGSFormData>({
  form: 'formUpload',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);