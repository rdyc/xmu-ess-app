import { IFinance } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IFinance;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const financeSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.status)}
          value={props.data.status ? props.data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={props.intl.formatMessage(financeMessage.approval.field.notes)}
          value={props.data.notes || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.uid)}
          value={props.data.uid}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.moduleName)}
          value={props.data.module ? props.data.module.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.documentUid)}
          value={props.data.documentUid ? props.data.documentUid : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.requestor)}
          value={props.data.document.changes.created ? props.data.document.changes.created.fullName : 'N/A'}
        />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.approvalDate)}
          value={props.data.document.changes.updatedAt ? 
            props.intl.formatDate(props.data.document.changes.updatedAt, GlobalFormat.Date) : ''}
        />
        {
          (props.data.document.amount &&
          props.data.document.amount.advance) &&
          <TextField
          {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(financeMessage.approval.field.advance)}
            value={props.intl.formatNumber(props.data.document.amount.advance)}
          /> || ''
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(financeMessage.approval.field.total)}
          value={props.data.document.amount ?
            props.intl.formatNumber(props.data.document.amount.total || 0) : 0}
        />
    </Grid>
    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
          {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const FinanceSummary = compose<AllProps, OwnProps>(
  injectIntl
)(financeSummary);