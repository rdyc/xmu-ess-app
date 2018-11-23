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

export type PurchaseRequestItemFormProps
  = OwnProps
  & InjectedIntlProps;

export const PurchaseRequestItemForm = compose<PurchaseRequestItemFormProps, OwnProps>(
  injectIntl,
)(PurchaseRequestItemFormView);