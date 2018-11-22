import { Card, CardContent, CardHeader, TextField,
} from '@material-ui/core';
import { IPurchaseItem } from '@purchase/classes/response/purchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseItem;
  title: string;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

const settlementItemInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.title}
    />
    <CardContent>
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.uid)}
        value={props.data.uid}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
        value={props.data.description}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.request)}
        value={props.intl.formatNumber(props.data.requestValue)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.actual)}
        value={props.intl.formatNumber(props.data.actualValue)}
      />
      <TextField
        {...styled}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
        value={props.intl.formatNumber(props.data.varianceValue)}
      />

      {props.children}
    </CardContent>
  </Card>
  );

export const SettlementItemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(settlementItemInformation);