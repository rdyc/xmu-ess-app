import { IFinance } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { Card, CardContent, CardHeader, Grid, ListItem, Typography } from '@material-ui/core';
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
      // subheader={props.intl.formatMessage(financeMessage.approval.section.infoSubTitle)}
    />
    <CardContent>
      {
        props.data.map(finance => finance &&
          <ListItem 
           key={finance.uid}
           disableGutters
          >
            <Grid 
              container 
              spacing={16}
            >
              <Grid 
                item 
                xs={12}
              >
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
                {finance.document && finance.document.amount && finance.document.amount.advance && props.intl.formatNumber(finance.document.amount.advance)} &nbsp;&bull;&nbsp;
                {finance.document && finance.document.amount && finance.document.amount.total && props.intl.formatNumber(finance.document.amount.total)}
                </Typography>
                <Typography 
                  noWrap
                  variant="body2"
                >
                  {finance.document && finance.document.changes && finance.document.changes.created && finance.document.changes.created.fullName} &bull;&nbsp;
                  {finance.uid}
                </Typography>
                {
                  finance &&
                  <Typography 
                    noWrap
                    color="textSecondary" 
                    variant="caption"
                  > 
                    {finance.notes}
                  </Typography>
                }
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