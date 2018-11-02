import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { RequestDetailFormView } from '@travel/components/request/editor/forms/RequestDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type RequestDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RequestDetailFormProps) => (name: string) => {
    const {
      intl, // formMode
    } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
      fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputText
      };
      break;

        case 'fullName':
        fieldProps = {
          disabled: true,
          component: InputText
        };
        break;

        case 'position':
        fieldProps = {
          disabled: true,
          component: InputText
        };
        break;

        case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputCustomer
        };
        break;

        case 'destinationType': 
        fieldProps = {
          required: true,
          category: 'destination',
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;

        case 'start': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `travel.field.${name}.placeholder`}),
          component: InputDate
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

export const RequestDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(RequestDetailFormView);