import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getFormValues, InjectedFormProps, reduxForm } from 'redux-form';
import { GalleryFormView } from './GalleryFormView';

export interface GalleryFormData {
  file?: FileList;
}

interface FormValueProps {
  formValues: GalleryFormData;
}

export type GalleryFormProps 
  = InjectedFormProps<GalleryFormData>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formValues: getFormValues('formUpload')(state) as GalleryFormData
});

const enhance = compose<GalleryFormProps, InjectedFormProps<GalleryFormData>>(
  connect(mapStateToProps),
  injectIntl
)(GalleryFormView);

export const GalleryForm = reduxForm<GalleryFormData>({
  form: 'formUpload',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);