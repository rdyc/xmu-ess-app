import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { TravelItemFieldFormView } from './TravelItemFieldFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type TravelitemFieldFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<TravelitemFieldFormProps, OwnHandlers> = {
  generateFieldProps: (props: TravelitemFieldFormProps) => (name: string) => {
    const {
      intl, // formMode
    } = props;

    const fieldName = name.replace('information.item', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
      fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
      };
      break;

        default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }
    return fieldProps;
  }
};

export const TravelitemFieldFormProps = compose<TravelitemFieldFormProps, OwnProps>(
  injectIntl,
  withHandlers<TravelitemFieldFormProps, OwnHandlers>(handlerCreators),
)(TravelItemFieldFormView);