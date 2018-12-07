import { InputCustomer } from '@lookup/components/customer/input';
import { Grid } from '@material-ui/core';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

interface OwnProps {
  handleFind: (event: any, newValue: string, oldValue: string) => void;
}

const formName = 'PurchaseSettlementFilter';

type AllProps = OwnProps & InjectedIntlProps;

const purchaseSettlementFilter: React.SFC<AllProps> = props => (
  <Grid container spacing={16}>
    <Grid item xs={12} md={6}>
      <Field 
        type="text"
        name="customerUid"
        label={props.intl.formatMessage(purchaseMessage.request.field.customerUid)}
        placeholder={props.intl.formatMessage(purchaseMessage.request.field.customerUidPlaceholder)}
        component={InputCustomer}
        onChange={props.handleFind}
      />
    </Grid>
  </Grid>
);

const enhance = compose<AllProps, OwnProps & InjectedFormProps<{}, OwnProps>>(injectIntl)(purchaseSettlementFilter);

export const PurchaseSettlementFilter = reduxForm<{}, OwnProps>({
  form: formName,
  destroyOnUnmount: true
})(enhance);