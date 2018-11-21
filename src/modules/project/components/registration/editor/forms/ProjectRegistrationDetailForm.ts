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
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  formCurrencyType: string | null | undefined;
  isCurrencyIdr: boolean;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type ProjectRegistrationDetailFormProps 
  = OwnProps
  & OwnHandlers
  & WithAllowedProjectType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<ProjectRegistrationDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: ProjectRegistrationDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, formCurrencyType, isCurrencyIdr, 
      onChangeCurrencyType, onChangeValueIdr, 
      onChangeRate, allowedProjectTypes 
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
          required: true,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputCustomer
        };
        break;
      
      case 'projectType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'project',
          disabled: formMode === FormMode.Edit,
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: SelectSystem,
          onlyForTypes: allowedProjectTypes
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
          required: true,
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
          required: !isCurrencyIdr,
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
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          placeholder: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldPlaceholder')),
          component: InputNumber,
          onChange: onChangeValueIdr
        };
        break;

      case 'valueIdr':
        fieldProps = {
          type: 'number',
          label: intl.formatMessage(projectMessage.registration.fieldFor(name, 'fieldName')),
          disabled: true,
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

export const ProjectRegistrationDetailForm = compose<ProjectRegistrationDetailFormProps, OwnProps>(
  injectIntl,
  withAllowedProjectType,
  withHandlers<ProjectRegistrationDetailFormProps, OwnHandlers>(handlerCreators),
)(ProjectRegistrationDetailFormView);