import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { SelectLookupCompany } from '@lookup/components/company/select';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { LookupRoleDetailFormView } from './LookupRoleDetailFormView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type RoleDetailFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps
  & WithUser;

const handlerCreators: HandleCreators<RoleDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RoleDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'companyUid':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: SelectLookupCompany
        };
        break;

      case 'name':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'gradeType':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'description':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'isActive':
        fieldProps = {
          required: true,
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(lookupMessage.role.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const LookupRoleDetailForm = compose<RoleDetailFormProps, OwnProps>(
  injectIntl,
  withUser,
  withHandlers<RoleDetailFormProps, OwnHandlers>(handlerCreators),
)(LookupRoleDetailFormView);