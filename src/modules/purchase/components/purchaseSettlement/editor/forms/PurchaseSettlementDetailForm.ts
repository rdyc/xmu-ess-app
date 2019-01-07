import { FormMode } from '@generic/types';
import { InputDate } from '@layout/components/input/date';
import { InputColoredNumber, InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { PurchaseSettlementDetailFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementDetailFormView';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { BaseFieldsProps } from 'redux-form';

interface OwnProps {
  formMode: FormMode;
  context: BaseFieldsProps;
  isCurrencyIdr: boolean;
  // settleMinDate?: Date;
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
    
    const fieldName = name.replace('information.', '');
    
    let fieldProps: 
    // SelectSystemOption & 
    any = {};
  
    switch (fieldName) {
      case 'uid': 
      fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(purchaseMessage.settlement.field.uid),
          component: InputText
        };
      break;
      
      case 'customerUid': 
        fieldProps = {
          disabled: true,
          label: props.intl.formatMessage(purchaseMessage.settlement.field.customerUid),
          component: InputText,
          multiline: true,
        };
        break;

      case 'projectUid':
        fieldProps = {
          disabled: true,
          category: 'project',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.projectUid),
          component: InputText,
          multiline: true,
        };
        break;

      case 'currencyType': 
        fieldProps = {
          disabled: true,
          category: 'currency',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.currencyType),
          component: InputText,
        };
        break;

      case 'date': 
        fieldProps = {
          required: true,
          category: 'date',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.date),
          placeholder: props.intl.formatMessage(purchaseMessage.settlement.field.datePlaceholder),
          component: InputDate,
          disablePast: true,
          // minDate: props.settleMinDate
        };
        break;
        
      case 'rate':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.rate),
          disabled: true,
          component: InputNumber,
        };
        break;

      case 'request':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.request),
          component: InputNumber,
          disabled: true
        };
        break;

       case 'requestInIDR':
         fieldProps = {
           type: 'number',
           label: props.intl.formatMessage(purchaseMessage.settlement.field.requestInIDR),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'actual':
        fieldProps = {
          type: 'number',
          // onChange: props.onChangeValueIdr,
          label: props.intl.formatMessage(purchaseMessage.settlement.field.actual),
          component: InputNumber,
          disabled: true
        };
        break;

       case 'actualInIDR':
         fieldProps = {
           type: 'number',
           label: props.intl.formatMessage(purchaseMessage.settlement.field.actualInIDR),
           disabled: true,
           component: InputNumber
         };
         break;
  
      case 'difference':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.difference),
          component: InputColoredNumber,
          disableInput: true
        };
        break;

       case 'differenceInIDR':
         fieldProps = {
           type: 'number',
           label: props.intl.formatMessage(purchaseMessage.settlement.field.differenceInIDR),
           disableInput: true,
           component: InputColoredNumber
         };
         break;
  
      case 'advance':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.advance),
          disabled: true,
          component: InputNumber
        };
        break;
  
      case 'balanceDue':
        fieldProps = {
          type: 'number',
          label: props.intl.formatMessage(purchaseMessage.settlement.field.balanceDue),
          disableInput: true,
          component: InputColoredNumber
        };
        break;
  
      case 'notes':
        fieldProps = {
          label: props.intl.formatMessage(purchaseMessage.settlement.field.notes),
          placeholder: props.intl.formatMessage(purchaseMessage.settlement.field.notesPlaceholder),
          component: InputText,
          multiline: true
        };
        break;
        
      default:
        fieldProps = {
          type: 'text',
          disabled: true,
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