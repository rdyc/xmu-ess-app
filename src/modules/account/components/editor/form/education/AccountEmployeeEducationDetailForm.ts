import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InputYearDegree } from '@layout/components/input/yearDegree';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeEducationDetailFormView } from './AccountEmployeeEducationDetailViewForm';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeEducationDetailFormProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeEducationDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeEducationDetailFormProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {
      
      case 'employeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'degreeType':
        fieldProps = {
          required: true,
          category: 'degree',
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem
        };
        break;

      case 'institution':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: InputText  
        };
        break;
      
      case 'major':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: InputText  
        };
        break; 
      
      case 'start':
        fieldProps = {
          required: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: InputYearDegree  
        };
        break; 

      case 'end':
        fieldProps = {
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
          component: InputYearDegree  
        };
        break; 

      default:
      fieldProps = {
        type: 'text',
        label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
        placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),
        component: InputText
      };
      break;
    }

    return fieldProps;
  }
};

export const AccountEmployeeEducationDetailForm = compose<AccountEmployeeEducationDetailFormProps, OwnProps>(
  setDisplayName('EducationDetailForm'),
  injectIntl,
  withHandlers<AccountEmployeeEducationDetailFormProps, OwnHandlers>(handleCreators)
)(AccountEmployeeEducationDetailFormView);