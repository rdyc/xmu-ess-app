import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithVariables, withVariables } from '@layout/hoc/withVariables';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import { PurchaseRequestItemFormData } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestForm';
import { PurchaseRequestItemFormView } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemFormView';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<PurchaseRequestItemFormData>;
}

interface OwnHandlers {
  handleSelected: (items: IPurchaseItemRequest) => boolean;
}

export type PurchaseRequestItemFormProps
  = OwnProps
  & OwnHandlers
  & WithUser
  & WithLayout
  & WithStyles
  & WithWidth
  & WithVariables
  & InjectedIntlProps;

const handlerCreators: HandleCreators<PurchaseRequestItemFormProps, OwnHandlers> = {
  handleSelected: (props: PurchaseRequestItemFormProps) => (items: IPurchaseItemRequest): boolean => {
    const { context, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    try {
      // get all
      const _items = context.fields.getAll();

      // check existing
      const isExist = _items.filter(item => item.uid === items.uid).length > 0;

      // don't insert if exist
      if (isExist) {
        alertAdd({
          time: new Date,
          message: intl.formatMessage({ id: 'purchase.message.purchaseRequest.item.duplication' })
        });

        return false;
      }

      // go away
      context.fields.push({
        uid: items.uid,
        description: items.description,
        request: items.requestValue
      });

      return true;
    } catch (error) {
      return false;
    }
  }
};

export const PurchaseRequestItemForm = compose<PurchaseRequestItemFormProps, OwnProps>(
  withUser,
  withLayout,
  withStyles(styles),
  withWidth(),
  withVariables,
  injectIntl,
  withHandlers<PurchaseRequestItemFormProps, OwnHandlers>(handlerCreators),
)(PurchaseRequestItemFormView);