import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { RegistrationDetailFormView } from '@project/components/registration/editor/forms/RegistrationDetailFormView';
import { WithAllowedProjectType, withAllowedProjectType } from '@project/hoc/withAllowedProjectType';
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

export type RegistrationDetailFormProps 
  = OwnProps
  & OwnHandlers
  & WithAllowedProjectType
  & InjectedIntlProps;

const handlerCreators: HandleCreators<RegistrationDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: RegistrationDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, formCurrencyType, isCurrencyIdr, 
      onChangeCurrencyType, onChangeValueIdr, 
      onChangeRate, allowedProjectTypes 
    } = props;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (fieldName) {
      case 'uid':
      case 'ownerEmployeeUid':
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
        };
        break;

      case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputCustomer
        };
        break;
      
      case 'projectType':
        fieldProps = {
          required: formMode === FormMode.New,
          category: 'project',
          disabled: formMode === FormMode.Edit,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: SelectSystem,
          onlyForTypes: allowedProjectTypes
        };
        break;

      case 'name': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
        };
        break;
  
      case 'currencyType': 
        fieldProps = {
          required: true,
          category: 'currency',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'start': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
      
      case 'rate':
        fieldProps = {
          type: 'number',
          required: !isCurrencyIdr,
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'valueUsd':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputNumber,
          onChange: onChangeValueIdr
        };
        break;

      case 'valueIdr':
        fieldProps = {
          type: 'number',
          disabled: true,
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const RegistrationDetailForm = compose<RegistrationDetailFormProps, OwnProps>(
  injectIntl,
  withAllowedProjectType,
  withHandlers<RegistrationDetailFormProps, OwnHandlers>(handlerCreators),
)(RegistrationDetailFormView);