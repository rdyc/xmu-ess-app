import { Card, CardContent, CardHeader, 
  // Grid, List, ListItem, ListItemText, 
  TextField, 
  // Typography 
} from '@material-ui/core';
import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { FormattedMessage, 
  // FormattedNumber, 
  InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseItemRequest;
  title: string;
  // subheader: string;
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

const purchaseItemInformation: React.SFC<AllProps> = props => (
    <Card square>
      <CardHeader
        title={props.title}
        // subheader={<FormattedMessage id="purchase.itemSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          margin="dense"
          // label={props.intl.formatMessage(purchaseMessage.field.itemUid)}
          label={<FormattedMessage id="purchase.itemTitle.uid"/>} 
          value={props.data.uid}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="purchase.itemTitle.description"/>} 
          value={props.data.description}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="purchase.itemTitle.request"/>} 
          value={props.intl.formatNumber(props.data.requestValue)}
        />
        
        {props.children}
      </CardContent>
    </Card>
  );

export const PurchaseItemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseItemInformation);