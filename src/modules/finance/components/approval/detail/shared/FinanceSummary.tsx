import { IFinance } from '@finance/classes/response';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

const styled = {
  fullWidth: true,
  InputProps: {
    disableUnderline: true,
    readOnly: true
  }
};

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
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.status" />}
          value={props.data.status ? props.data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          multiline
          label={<FormattedMessage id="finance.field.notes" />}
          value={props.data.notes || 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.uid" />}
          value={props.data.uid}
        />
      </Grid>
      <Grid xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.moduleName" />}
          value={props.data.module ? props.data.module.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.documentUid" />}
          value={props.data.documentUid ? props.data.documentUid : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.requestor" />}
          value={props.data.document.changes.created ? props.data.document.changes.created.fullName : 'N/A'}
        />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.approvalDate" />}
          value={props.data.document.changes.updatedAt ? 
            props.intl.formatDate(props.data.document.changes.updatedAt, GlobalFormat.Date) : ''}
        />
        {
          (props.data.document.amount &&
          props.data.document.amount.advance) &&
          <TextField
            {...styled}
            margin="normal"
            label={<FormattedMessage id="finance.field.advance" />}
            value={props.intl.formatNumber(props.data.document.amount.advance)}
          /> || ''
        }
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.total" />}
          value={props.data.document.amount ?
            props.intl.formatNumber(props.data.document.amount.total || 0) : 0}
        />
    </Grid>
    
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...styled}
            margin="dense"
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