import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { LookupHolidayDetailFormView } from '@lookup/components/holiday/editor/forms/LookupHolidayDetailFormView';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
      
      case 'companyUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany,
        };
        break;

      case 'description':
        fieldProps = {
          required: false,
          label: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldPlaceholder')),
          component: InputText,
        };
        break;
      
      case 'date': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate,
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.holiday.fieldFor(name, 'fieldPlaceholder')),
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