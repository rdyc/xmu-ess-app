// import { InputNumber } from '@layout/components/input/number';
// import { InputText } from '@layout/components/input/text';
// import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseSettlementItemFormData } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementForm';
import { PurchaseSettlementItemFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, 
  // HandleCreators, withHandlers 
} from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<PurchaseSettlementItemFormData>;
  onActualChange: (event: any, newValue: number, oldValue: number) => void;
}

interface OwnHandlers {
  generateFieldProps: (items: string) => any;
}

export type PurchaseSettlementItemFormProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

// const handlerCreators: HandleCreators<PurchaseSettlementItemFormProps, OwnHandlers> = {
//   generateFieldProps: (props: PurchaseSettlementItemFormProps) => (items: string) => { 
//     const { intl } = props;
    
//     const fieldName = items.replace('information.', '');
    
//     let fieldProps: any = {};
  
//     switch (fieldName) {
//       case 'uid':
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputText
//         };
//         break;

//       case 'description': 
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputText
//         };
//         break;

//       case 'requestValue':
//         fieldProps = {
//           disabled: true,
//           type: 'number',
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputNumber
//         };
//         break;

//       case 'actualValue':
//         fieldProps = {
//           required: true,
//           type: 'number',
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputNumber
//         };
//         break;

//       case 'varianceValue':
//         fieldProps = {
//           requeired: true,
//           type: 'number',
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputNumber
//         };
//         break;
    
//       default:
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           // component: InputText
//         };
//         break;
//     }

//     return fieldProps;
//   }
// };

export const PurchaseSettlementItemForm = compose<PurchaseSettlementItemFormProps, OwnProps>(
  injectIntl,
  // withHandlers<PurchaseSettlementItemFormProps, OwnHandlers>(handlerCreators),
)(PurchaseSettlementItemFormView);