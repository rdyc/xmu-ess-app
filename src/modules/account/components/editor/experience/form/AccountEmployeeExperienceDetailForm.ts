import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InputYearDegree } from '@layout/components/input/yearDegree';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeExperienceDetailFormView } from './AccountEmployeeExperienceDetailFormView';

interface OwnProps {
  formMode: FormMode | undefined;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeExperienceDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeExperienceDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeExperienceDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'company':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'position':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputText  
        };
        break;
      
      case 'start':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputYearDegree  
        };
        break; 

      case 'end':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputYearDegree  
        };
        break; 

      default:
      fieldProps = {
        type: 'text',
        label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
        placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
        component: InputText
      };
      break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeExperienceDetailForm = compose<AccountEmployeeExperienceDetailFormProps, OwnProps>(
  setDisplayName('ExperienceDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeExperienceDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeExperienceDetailFormView);