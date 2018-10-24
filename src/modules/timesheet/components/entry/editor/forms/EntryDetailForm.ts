import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputText } from '@layout/components/input/text';
import { InputTime } from '@layout/components/input/time';
import { InputCustomer } from '@lookup/components/customer/input';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { EntryDetailFormView } from './EntryDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type EntryDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<EntryDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: EntryDetailFormProps) => (name: string) => {
    const { intl } = props;

    const fieldName = name.replace('information.', '');

    let fieldProps: SelectSystemOption & any = {};

    switch (fieldName) {
      case 'uid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputText
        };
        break;

      case 'activityType':
        fieldProps = {
          category: 'activity',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: SelectSystem
        };
        break;
      
      case 'customerUid':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputCustomer
        };
        break;

      case 'siteUid':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputText
        };
        break;

      case 'date':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputDate
        };
        break;

      case 'start':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      case 'end':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputTime
        };
        break;

      // case 'projectUid':
      //   fieldProps = {
      //     type: 'text',
      //     placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
      //     component: FieldSelectProject
      //   };
      //   break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const EntryDetailForm = compose<EntryDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<EntryDetailFormProps, OwnHandlers>(handlerCreators),
)(EntryDetailFormView);