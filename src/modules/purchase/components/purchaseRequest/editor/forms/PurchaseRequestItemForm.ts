// import { InputNumber } from '@layout/components/input/number';
// import { InputText } from '@layout/components/input/text';
// import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import { PurchaseRequestItemFormData } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestItemFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemFormView';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, 
  // HandleCreators, withHandlers 
} from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<PurchaseRequestItemFormData>;
  onRequestChange: (event: any, newValue: number, oldValue: number) => void;
}

// interface OwnHandlers {
//   generateFieldProps: (items: string) => any;
// }

export type PurchaseRequestItemFormProps
  = OwnProps
  // & OwnHandlers
  & InjectedIntlProps;

// const handlerCreators: HandleCreators<PurchaseRequestItemFormProps, OwnHandlers> = {
//   generateFieldProps: (props: PurchaseRequestItemFormProps) => (items: string) => { 
//     const { intl, 
//       // onRequestChange 
//     } = props;
    
//     const fieldName = items.replace('information.', '');
    
//     let fieldProps: any = {};
  
//     switch (fieldName) {
//       case 'uid':
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           component: InputText
//         };
//         break;

//       case 'description': 
//         fieldProps = {
//           required: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           component: InputText
//         };
//         break;

//       case 'requestValue':
//         fieldProps = {
//           required: true,
//           type: 'number',
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           component: InputNumber,
//           // onChange: onRequestChange
//         };
//         break;
    
//       default:
//         fieldProps = {
//           disabled: true,
//           placeholder: intl.formatMessage({id: `purchase.itemTitle.${name}`}),
//           component: InputText
//         };
//         break;
//     }

//     return fieldProps;
//   }
// };

export const PurchaseRequestItemForm = compose<PurchaseRequestItemFormProps, OwnProps>(
  injectIntl,
  // withHandlers<PurchaseRequestItemFormProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestItemFormView);