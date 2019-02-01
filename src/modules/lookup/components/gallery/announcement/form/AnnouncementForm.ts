import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { GalleryFormView as AnnouncementFormView } from './AnnouncementFormView';

interface FormValueProps {
}

export type GalleryFormProps 
  = InjectedFormProps<{}>
  & InjectedIntlProps
  & FormValueProps;

const mapStateToProps = (): FormValueProps => ({
});

const enhance = compose<GalleryFormProps, InjectedFormProps<{}>>(
  connect(mapStateToProps),
  injectIntl,
)(AnnouncementFormView);

export const AnnouncementForm = reduxForm<{}>({
  form: 'formAnnouncement',
  touchOnChange: true,
  touchOnBlur: true,
  enableReinitialize: true,
  destroyOnUnmount: true
})(enhance);