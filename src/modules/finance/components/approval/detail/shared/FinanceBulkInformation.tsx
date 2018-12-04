import { IFinance } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { GlobalFormat } from '@layout/types';
import { Card, CardContent, CardHeader, Grid, ListItem, Typography } from '@material-ui/core';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IFinance[];
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const financeBulkInformation: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(financeMessage.approval.section.infoTitle)}
      subheader={props.intl.formatMessage(financeMessage.approval.section.infoSubTitle)}
    />
    <CardContent>
      {
        props.data.map(finance => finance &&
          <ListItem 
           key={finance.uid}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {finance.module && finance.module.value} {finance.documentUid && `(ID: ${finance.documentUid})`}
                </Typography>
                <Typography 
                  noWrap
                  variant="body2"
                >
                  {finance.document.changes.created && finance.document.changes.created.fullName} &bull;&nbsp;
                  {props.intl.formatDate(finance.document.changes.updatedAt || '', GlobalFormat.Date)} &bull;&nbsp;
                  {finance.uid}
                </Typography>
                <Typography 
                  noWrap
                  variant="body2"
                >
                {finance.document.amount && finance.document.amount.advance} &nbsp;&bull;&nbsp;
                {finance.document.amount && finance.document.amount.total}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                > 
                  {finance && finance.notes}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body2" 
                  align="right"
                >
                  {finance.status && finance.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(finance.changes || null)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {finance.changes && moment(finance.changes.updatedAt ? finance.changes.updatedAt : finance.changes.createdAt).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        )
      }
    </CardContent>
  </Card>
);

export const FinanceBulkInformation = compose<AllProps, OwnProps>(
  injectIntl
)(financeBulkInformation);