import { SelectSystem, SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { PurchaseRequestDetailFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestDetailFormView';
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

export type PurchaseRequestDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<PurchaseRequestDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: PurchaseRequestDetailFormProps) => (name: string) => { 
    const { 
      intl, formMode, formCurrencyType, isCurrencyIdr, 
      onChangeCurrencyType, onChangeValueIdr, 
      onChangeRate 
    } = props;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: SelectSystemOption & any = {};
  
    switch (fieldName) {
      case 'uid':
      
      case 'customerUid': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder`}),
          component: InputCustomer
        };
        break;

      case 'projectUid':
        fieldProps = {
          required: formMode === FormMode.New,
          // required: true,
          category: 'project',
          // disabled: formMode === FormMode.Edit,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: SelectSystem,
        };
        break;

      case 'currencyType': 
        fieldProps = {
          required: true,
          category: 'currency',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'date': 
        fieldProps = {
          required: true,
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'rate':
        fieldProps = {
          type: 'number',
          required: !isCurrencyIdr,
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'request':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputNumber,
          onChange: onChangeValueIdr,
          disabled: true
        };
        break;

       case 'requestIDR':
         fieldProps = {
           type: 'number',
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'advance':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputNumber
        };
        break;
  
      case 'notes':
        fieldProps = {
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText
        };
        break;
        
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `purchase.field.${name}.placeholder`}),
          component: InputText
        };
        break;
    }

    return fieldProps;
  }
};

export const PurchaseRequestDetailForm = compose<PurchaseRequestDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<PurchaseRequestDetailFormProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestDetailFormView);