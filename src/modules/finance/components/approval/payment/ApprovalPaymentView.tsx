import { IFinance } from '@finance/classes/response';
import { ApprovalPaymentProps } from '@finance/components/approval/payment/ApprovalPayment';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { WorkflowApprovalForm } from '@organization/components/workflow/approval/WorkflowApprovalForm';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

export const ApprovalPaymentView: React.SFC<ApprovalPaymentProps> = props => {
  const { 
    approvalTitle, approvalSubHeader, approvalChoices, approvalTrueValue, approvalRemarkLabel, approvalRemarkPlaceholder,
    approvalDialogTitle, approvalDialogContentText, approvalDialogCancelText, approvalDialogConfirmedText, finances,
    handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail,
  } = props;

  const renderDetails = (_finances: IFinance[] | null | undefined) => {
    return (
      finances && finances.map(finance => finance &&
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
                  variant="body1"
                >
                  {finance.document.changes.created && finance.document.changes.created.fullName} &bull;&nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={finance.document.changes.updatedAt || ''} 
                  /> &bull;&nbsp;
                  {finance.uid}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
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
                  variant="body1" 
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
    );
  };

  const render = (
    <React.Fragment>
      {
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Card square>
              <CardHeader 
                title={finances && finances.length > 1 ? <FormattedMessage id="finance.title"/> : <FormattedMessage id="finance.infoTitle"/>}
                subheader={<FormattedMessage id="finance.infoSubTitle" />}
              />
              <CardContent>
                <List>
                {
                  finances &&
                  renderDetails(finances)
                }
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={16}>
                <Grid item>
                  <WorkflowApprovalForm
                    approvalTitle={approvalTitle}
                    approvalSubHeader={approvalSubHeader}
                    approvalChoices={approvalChoices}
                    approvalTrueValue={approvalTrueValue}
                    approvalDialogTitle={approvalDialogTitle}
                    approvalDialogContentText={approvalDialogContentText}
                    approvalDialogCancelText={approvalDialogCancelText}
                    approvalDialogConfirmedText={approvalDialogConfirmedText}
                    approvalRemarkLabel={approvalRemarkLabel}
                    approvalRemarkPlaceholder={approvalRemarkPlaceholder}
                    validate={handleValidate}
                    onSubmit={handleSubmit} 
                    onSubmitSuccess={handleSubmitSuccess}
                    onSubmitFail={handleSubmitFail}
                  />
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
  return render;
};