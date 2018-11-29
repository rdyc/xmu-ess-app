import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { LookupHolidayDetailFormView } from '@lookup/components/holiday/editor/forms/LookupHolidayDetailFormView';
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
      intl, formMode
    } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText
        };
        break;
      
      case 'companyUid':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'company',
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: SelectSystem,
        };
        break;

      case 'description':
        fieldProps = {
          required: false,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText,
        };
        break;
      
      case 'date': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputDate,
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leave.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupHolidayDetailForm = compose<RequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<RequestDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupHolidayDetailFormView);