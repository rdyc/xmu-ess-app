import { WorkflowStatusType } from '@common/classes/types';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  ListItem,
  Typography
} from '@material-ui/core';
import { IMileageRequestItem } from '@mileage/classes/response';
import { MileageApprovalDetailProps } from '@mileage/components/approval/detail/MileageApprovalDetail';
import { MileageInformation } from '@mileage/components/request/detail/shared/MileageInformation';
import { MileageItem } from '@mileage/components/request/detail/shared/MileageItem';
import { WorkflowHistory } from '@organization/components/workflow/history/WorkflowHistory';
import * as React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { WorkflowMileageApproval } from './WorkflowMileageApproval';

export const MileageApprovalDetailView: React.SFC<
  MileageApprovalDetailProps
> = props => {
  const {
    handleCheckbox,
    mileageItemUids,
    approvalTitle,
    approvalSubHeader,
    approvalChoices,
    approvalTrueValue,
    approvalDialogTitle,
    approvalDialogContentText,
    approvalDialogCancelText,
    approvalDialogConfirmedText
  } = props;
  const {
    intl,
    handleValidate,
    handleSubmit,
    handleSubmitFail,
    handleSubmitSuccess
  } = props;
  const { isLoading, response } = props.mileageApprovalState.detail;

  const isChecked = (mileageItemUid: string) => {
    const _mileageItemUids = new Set(mileageItemUids);
    return _mileageItemUids.has(mileageItemUid);
  };

  const renderItem = (items: IMileageRequestItem[]) => {
    const len = items.length - 1;
    
    return (
      <Card square>
        <CardHeader
          title={<FormattedMessage id="mileage.request.itemsTitle" />}
          subheader={<FormattedMessage id="mileage.request.itemsSubTitle" />}
        />
        <CardContent>
          {items.map((item, index) => (
            <div key={item.uid}>
              <ListItem disableGutters key={item.uid}>
                <Grid container spacing={24}>
                  <Grid item xs={1} sm={1}>
                    {item.status &&
                      item.status.type === WorkflowStatusType.Submitted && (
                        <Checkbox
                          key={item.uid}
                          onChange={() => handleCheckbox(item.uid)}
                          checked={isChecked(item.uid)}
                        />
                      )}
                  </Grid>
                  <Grid item xs={7} sm={7}>
                    <Typography noWrap color="primary" variant="body2">
                      {item.customer && item.customer.name}
                    </Typography>
                    <Typography noWrap variant="body1">
                      {item.projectUid} &bull;
                      {item.project && item.project.name}
                    </Typography>
                    <Typography noWrap color="textSecondary" variant="caption">
                      <FormattedDate
                        year="numeric"
                        month="short"
                        day="numeric"
                        value={item.date}
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <Typography noWrap variant="body1" align="right">
                      {item.site && item.site.name}
                    </Typography>
                    {item.status &&
                      item.status.type !== WorkflowStatusType.Submitted && (
                        <Typography
                          noWrap
                          color={
                            item.status.type === WorkflowStatusType.Rejected
                              ? 'error'
                              : 'secondary'
                          }
                          variant="body1"
                          align="right"
                        >
                          {item.status && item.status.value}
                        </Typography>
                      )}
                    <Typography noWrap variant="body1" align="right">
                      {intl.formatNumber(Number(item.amount))}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {len !== index && <Divider />}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  };

  const render = (
    <React.Fragment>
      {isLoading && (
        <Typography variant="body2">
          <FormattedMessage id="global.loading" />
        </Typography>
      )}
      {!isLoading &&
        response &&
        response.data && (
          <Grid container spacing={24}>
            <Grid item xs={12} md={4}>
              <MileageInformation data={response.data} />
            </Grid>
            <Grid item xs={12} md={8}>
              {response.data.items &&
              response.data.workflow &&
              !response.data.workflow.isApproval ? (
                <MileageItem items={response.data.items} />
              ) : (
                renderItem(response.data.items)
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <WorkflowHistory data={response.data.workflow} />
            </Grid>
            <Grid item xs={12} md={4}>
              {response.data.workflow &&
                response.data.workflow.isApproval && (
                  <WorkflowMileageApproval
                    itemTrue={mileageItemUids.length < 1 ? true : false}
                    approvalTitle={approvalTitle}
                    approvalSubHeader={approvalSubHeader}
                    approvalChoices={approvalChoices}
                    approvalTrueValue={approvalTrueValue}
                    approvalDialogTitle={approvalDialogTitle}
                    approvalDialogContentText={approvalDialogContentText}
                    approvalDialogCancelText={approvalDialogCancelText}
                    approvalDialogConfirmedText={approvalDialogConfirmedText}
                    validate={handleValidate}
                    onSubmit={handleSubmit}
                    onSubmitSuccess={handleSubmitSuccess}
                    onSubmitFail={handleSubmitFail}
                  />
                )}
            </Grid>
          </Grid>
        )}
    </React.Fragment>
  );

  return render;
};
