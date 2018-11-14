// import { SelectSystemOption } from '@common/components/select';
import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
// import { InputCustomer } from '@lookup/components/customer/input';
import { PurchaseSettlementDetailFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementDetailFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  isCurrencyIdr: boolean;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
  onChangeRequestItem: (event: any, newValue: number, oldValue: number) => void;
}

interface OwnHandlers {
  generateFieldProps: (name: string) => any;
}

export type PurchaseSettlementDetailFormProps 
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const handlerCreators: HandleCreators<PurchaseSettlementDetailFormProps, OwnHandlers> = {
  generateFieldProps: (props: PurchaseSettlementDetailFormProps) => (name: string) => { 
    const { 
      intl,
      // isCurrencyIdr, 
      onChangeValueIdr,
      // onChangeRequestItem
    } = props;
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: 
    // SelectSystemOption & 
    any = {};
  
    switch (fieldName) {
      case 'uid': 
      fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText
        };
      break;
      
      case 'customerUid': 
        fieldProps = {
          disabled: true,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText
        };
        break;

      case 'projectUid':
        fieldProps = {
          disabled: true,
          category: 'project',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText,
        };
        break;

      case 'currencyType': 
        fieldProps = {
          disabled: true,
          category: 'currency',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputText,
        };
        break;

      case 'date': 
        fieldProps = {
          required: true,
          category: 'date',
          label: intl.formatMessage({id: `purchase.field.information.settlementdate`}),
          placeholder: intl.formatMessage({id: `purchase.field.settlementdate.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'rate':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          disabled: true,
          component: InputNumber,
        };
        break;

      case 'request':
        fieldProps = {
          type: 'number',
          component: InputNumber,
          disabled: true
        };
        break;

       case 'requestInIDR':
         fieldProps = {
           type: 'number',
           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'actual':
        fieldProps = {
          type: 'number',
          onChange: onChangeValueIdr,
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          component: InputNumber,
          disabled: true
        };
        break;

       case 'actualInIDR':
         fieldProps = {
           type: 'number',
           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'difference':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          onChange: onChangeValueIdr,
          component: InputNumber,
          disabled: true
        };
        break;

       case 'differenceInIDR':
         fieldProps = {
           type: 'number',
           placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'advance':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          disabled: true,
          component: InputNumber
        };
        break;
  
      case 'balanceDue':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({ id: `purchase.field.${name}.placeholder` }),
          disabled: true,
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

export const PurchaseSettlementDetailForm = compose<PurchaseSettlementDetailFormProps, OwnProps>(
  injectIntl,
  withHandlers<PurchaseSettlementDetailFormProps, OwnHandlers>(handlerCreators),
)(PurchaseSettlementDetailFormView);