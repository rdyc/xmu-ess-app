import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader,
  TextField,
} from '@material-ui/core';
import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseItemRequest | null | undefined ;
  title: string;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const purchaseItemInformation: React.SFC<AllProps> = props => (
    <Card square>
      <CardHeader
        title={props.title}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(purchaseMessage.request.items.description)} 
          value={props.data && props.data.description || ''}
          multiline
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(purchaseMessage.request.items.request)} 
          value={props.intl.formatNumber(props.data && props.data.requestValue || 0)}
        />
        
        {props.children}
      </CardContent>
    </Card>
  );

export const PurchaseItemInformation = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseItemInformation);