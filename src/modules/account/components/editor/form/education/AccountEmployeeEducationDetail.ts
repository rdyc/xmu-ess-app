import { accountMessage } from '@account/locales/messages/accountMessage';
import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputText } from '@layout/components/input/text';
import { InputYearDegree } from '@layout/components/input/yearDegree';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { AccountEmployeeEducationDetailView } from './AccountEmployeeEducationDetailView';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type AccountEmployeeEducationDetailProps =
  OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handleCreators: HandleCreators<AccountEmployeeEducationDetailProps, OwnHandlers> = {
  generateFieldProps: (props: AccountEmployeeEducationDetailProps) => (name: string) => {
    const { intl } = props;

    let fieldProps: SelectSystemOption & any = {};

    switch (name) {

      case 'uid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(accountMessage.education.fieldFor(name, 'fieldPlaceholder')),          
          component: InputText
        };
        break;

      case 'employeeUid':
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

export const AccountEmployeeEducationDetail = compose<AccountEmployeeEducationDetailProps, OwnProps>(
  injectIntl,
  withHandlers<AccountEmployeeEducationDetailProps, OwnHandlers>(handleCreators)
)(AccountEmployeeEducationDetailView);