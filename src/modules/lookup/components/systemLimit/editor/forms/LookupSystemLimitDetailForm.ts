import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { LookupSystemLimitDetailFormView } from './LookupSystemLimitDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type SystemLimitDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<SystemLimitDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: SystemLimitDetailFormProps) => (name: string) => {
    const { intl, formMode } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
        
      case 'companyUid':
        fieldProps = {
          required: true,
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany
        };
        break;

      case 'categoryType':
        fieldProps = {
          required: true,
          category: 'limiter',
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'days':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.systemLimit.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(timesheetMessage.entry.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupSystemLimitDetailForm = compose<SystemLimitDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<SystemLimitDetailFormProps, OwnHandlers>(handlerCreators)
)(LookupSystemLimitDetailFormView);