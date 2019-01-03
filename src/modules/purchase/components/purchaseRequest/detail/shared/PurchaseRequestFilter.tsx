import { InputCustomer } from '@lookup/components/customer/input';
import { Grid } from '@material-ui/core';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, withHandlers } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  handleFind: (customerUid: string) => void;
  callbackForceReload: () => void;
}

interface OwnHandlers {
  handleChangeFilter: (event: any, newValue: string, oldValue: string) => void;
}

const handlerCreators: HandleCreators<AllProps, OwnHandlers> = {
  handleChangeFilter: (props: AllProps) => (event: any, newValue: string, oldValue: string) => {
    props.handleFind(newValue);
    props.callbackForceReload();
  },
};

const formName = 'PurchaseRequestFilter';

type AllProps
  = OwnProps
  & OwnHandlers
  & InjectedIntlProps;

const requestFilter: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Field
        type="text"
        name="customerUid"
        label={props.intl.formatMessage(purchaseMessage.request.field.customerUid)}
        placeholder={props.intl.formatMessage(purchaseMessage.request.field.customerUidPlaceholder)}
        component={InputCustomer}
        onChange={props.handleChangeFilter}
      />
    </Grid>
  </Grid>
);

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(
  injectIntl,
  withHandlers<AllProps, OwnHandlers>(handlerCreators),
)(requestFilter);

export const PurchaseRequestFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);