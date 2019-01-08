import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField, withStyles, WithStyles } from '@material-ui/core';
import { IPurchaseItem } from '@purchase/classes/response/purchaseSettlement';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPurchaseItem | null | undefined;
  title: string;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const settlementItemInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.title}
    />
    <CardContent>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
        value={props.data && props.data.description || ''}
        multiline
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.request)}
        value={props.intl.formatNumber(props.data && props.data.requestValue || 0)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.actual)}
        value={props.intl.formatNumber(props.data && props.data.actualValue || 0)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        InputProps={{ 
          className: (props.data && props.data.varianceValue || 0) >= 0 
          ? props.classes.colorBlue 
          : props.classes.colorRed, 
          disableUnderline: true,
          readOnly: true 
        }}
        margin="dense"
        label={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
        value={(props.data && props.data.varianceValue || 0) >= 0
          ? props.intl.formatNumber(props.data && props.data.varianceValue || 0) 
          : props.intl.formatNumber((props.data && props.data.varianceValue || 0) * -1)
        }
      />

      {props.children}
    </CardContent>
  </Card>
  );

export const SettlementItemInformation = compose<AllProps, OwnProps>(
  injectIntl, 
  withStyles(styles)
)(settlementItemInformation);