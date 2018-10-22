import { IFinanceDetail } from '@finance/classes/response';
import { ApprovalDetailProps } from '@finance/components/approval/detail/ApprovalDetail';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const ApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
  const { 
    intl
  } = props;
  const { isLoading, response } = props.financeApprovalState.detail;

  const renderDetail = (finance: IFinanceDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="finance.infoTitle"/>}
        subheader={<FormattedMessage id="finance.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.uid" />}
          value={finance.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.moduleName" />}
          value={finance.module ? finance.module.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.documentUid" />}
          value={finance.documentUid ? finance.documentUid : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.requestor" />}
          value={finance.document.changes.created ? finance.document.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.approvalDate" />}
          value={finance.document.changes.updatedAt ? 
            intl.formatDate(finance.document.changes.updatedAt, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : ''}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.total" />}
          value={finance.document.amount ?
            intl.formatNumber(finance.document.amount.total || 0) : 0}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.status" />}
          value={finance.status ? finance.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.notes" />}
          value={finance.notes || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        response && 
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
  return render;
};