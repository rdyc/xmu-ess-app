import { FormMode } from '@generic/types';
import { connect } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { GalleryContainerFormView } from './GalleryContainerFormView';

const formName = 'formGallery';

export type GalleryFormData = {
  files: {
    file: FileList | undefined;
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
  // formValues: GalleryFormData;
  formName: string;
}

export type GalleryContainerFormProps 
  = InjectedFormProps<GalleryFormData, OwnProps> 
  & FormValueProps
  & OwnProps;

const mapStateToProps = (state: any): FormValueProps => ({
  formName,
  // formValues: getFormValues(formName)(state) as GalleryFormData
});

const connectedView = connect(mapStateToProps)(GalleryContainerFormView);

export const GalleryContainerForm = reduxForm<GalleryFormData, OwnProps>({
  form: formName,
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(connectedView);