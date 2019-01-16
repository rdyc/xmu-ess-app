import { WithStyles, withStyles } from '@material-ui/core';
import { PurchaseSettlementItemFormData } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementForm';
import { PurchaseSettlementItemFormView } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemFormView';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { InjectedFormProps, WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<PurchaseSettlementItemFormData>;
}

interface OwnHandlers {
  generateFieldProps: (items: string) => any;
}

export type PurchaseSettlementItemFormProps
  = OwnProps
  & OwnHandlers
  & WithStyles<typeof styles>
  & InjectedFormProps<PurchaseSettlementItemFormData, OwnProps>
  & InjectedIntlProps;

export const PurchaseSettlementItemForm = compose<PurchaseSettlementItemFormProps, OwnProps>(
  injectIntl,
  withStyles(styles)
)(PurchaseSettlementItemFormView);