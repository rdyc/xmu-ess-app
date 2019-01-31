import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputFile } from '@layout/components/input/file';
// import { InputImage } from '@layout/components/input/image';
import { InputText } from '@layout/components/input/text';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { GalleryDetailFormView } from './GalleryDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type GalleryDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<GalleryDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: GalleryDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'file':
        fieldProps = {
          required: true,
          accept: '.jpg, .png, .jpeg',
          label: intl.formatMessage(lookupMessage.gallery.fieldFor(name, 'fieldName')),
          component: InputFile
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.gallery.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.gallery.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const GalleryDetailForm = compose<GalleryDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<GalleryDetailFormProps, OwnHandlers>(handlerCreators)
)(GalleryDetailFormView);