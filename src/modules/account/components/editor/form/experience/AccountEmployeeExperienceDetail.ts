import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InputYearDegree } from '@layout/components/input/yearDegree';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeExperienceDetailView } from './AccountEmployeeExperienceDetailView';

interface OwnProps {
  formMode: FormMode | undefined;
  disabledControls: boolean;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeExperienceDetailProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeExperienceDetailProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeExperienceDetailProps) => (name: string) => {
    const { intl, disabledControls } = props;

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
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'position':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputText  
        };
        break;
      
      case 'start':
        fieldProps = {
          required: true,
          disabled: disabledControls,
          label: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.experience.fieldFor(name, 'fieldPlaceholder')),
          component: InputYearDegree  
        };
        break; 

      case 'end':
        fieldProps = {
          required: true,
          disabled: disabledControls,
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

export const AccountEmployeeExperienceDetail = compose<AccountEmployeeExperienceDetailProps, OwnProps>(
  setDisplayName('ExperienceDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeExperienceDetailProps, OwnHandlers>(handleCreators)
)(AccountEmployeeExperienceDetailView);