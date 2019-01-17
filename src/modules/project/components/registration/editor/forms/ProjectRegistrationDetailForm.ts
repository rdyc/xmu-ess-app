import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import {
  ProjectRegistrationDetailFormView,
} from '@project/components/registration/editor/forms/ProjectRegistrationDetailFormView';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, setDisplayName, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface IOwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  formCurrencyType: string | null | undefined;
  isCurrencyIdr: boolean;
  isRequestor: boolean;
  isAdmin: boolean;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
}

interface IOwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type ProjectRegistrationDetailFormProps 
  = IOwnProps
  & IOwnHandlers
  & WithAllowedProjectType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<ProjectRegistrationDetailFormProps, IOwnHandlers> = {
  generateFieldProps: (props: ProjectRegistrationDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, formCurrencyType, isCurrencyIdr, 
      onChangeCurrencyType, onChangeValueIdr, 
      onChangeRate, allowedProjectTypes, isRequestor 
    } = props;
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (name) {
      case 'uid':
      case 'ownerEmployeeUid':
        fieldProps = {
          disabled: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'customerUid': 
        fieldProps = {
          required: isRequestor,
          disabled: !isRequestor,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputCustomer
        };
        break;
      
      case 'projectType':
        fieldProps = {
          category: 'project',
          required: formMode === FormMode.New,
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
          onlyForTypes: allowedProjectTypes
        };
        break;

      case 'contractNumber':
        fieldProps = {
          type: 'text',
          required: isRequestor,
          disabled: !isRequestor,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;

      case 'name': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
  
      case 'currencyType': 
        fieldProps = {
          required: isRequestor,
          disabled: !isRequestor,
          category: 'currency',
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'start': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputDate
        };
        break;
      
      case 'rate':
        fieldProps = {
          type: 'number',
          required: !isCurrencyIdr || isRequestor,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'valueUsd':
        fieldProps = {
          type: 'number',
          disabled: !isRequestor,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber,
          onChange: onChangeValueIdr
        };
        break;

      case 'valueIdr':
        fieldProps = {
          type: 'number',
          disabled: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          component: InputNumber
        };
        break;

      case 'hours':
        fieldProps = {
          type: 'number',
          disabled: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const ProjectRegistrationDetailForm = compose<ProjectRegistrationDetailFormProps, IOwnProps>(
  setDisplayName('ProjectRegistrationDetailForm'),
  injectIntl,
  withAllowedProjectType,
  withHandlers(handlerCreators),
)(ProjectRegistrationDetailFormView);