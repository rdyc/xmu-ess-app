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
  onDifferenceChange: (event: any, newValue: number, oldValue: number) => void;
}

interface OwnHandlers {
  generateFieldProps: (items: string) => any;
}

// interface FormValueProps {
//   formActual: number | 0;
//   formDifference: number | 0;
//   formRequest: number | 0;
// }

export type PurchaseSettlementItemFormProps
  = OwnProps
  & OwnHandlers
  // & FormValueProps
  & InjectedIntlProps;

export const PurchaseSettlementItemForm = compose<PurchaseSettlementItemFormProps, OwnProps>(
  injectIntl,
  // withHandlers<PurchaseSettlementItemFormProps, OwnHandlers>(handlerCreators),
)(PurchaseSettlementItemFormView);