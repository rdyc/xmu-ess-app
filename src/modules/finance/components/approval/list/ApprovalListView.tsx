import { FinanceStatusType } from '@common/classes/types';
import { IFinance } from '@finance/classes/response';
import { ApprovalListProps } from '@finance/components/approval/list/ApprovalList';
import { Button, Checkbox, Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const ApprovalListView: React.SFC<ApprovalListProps> = props => {
  const { handleGoToDetail, handleGoToApproval, handleCheckbox, financeUids } = props;
  const { isLoading, response } = props.financeApprovalState.all;

  const isChecked = (uid: string) => {
    const _uids = new Set(financeUids);
    return _uids.has(uid);
  };

  const renderFinanceList = (finances: IFinance[]) => {
    const len = finances.length - 1;

    return (
      finances.map((finance, i) => 
        <div key={finance.uid}>
          <ListItem 
            button={!isLoading} 
            key={finance.uid} 
          >
            <Grid container spacing={24}>
              <Grid item xs={1} sm={1}>
                {
                  finance.statusType === FinanceStatusType.Approved ||
                  finance.statusType === FinanceStatusType.Hold ? 
                    <Checkbox
                      key={finance.uid} 
                      onChange={() => handleCheckbox(finance.uid)}
                      checked={isChecked(finance.uid)}
                    />
                  : ''
                }
              </Grid>
              <Grid item xs={7} sm={7} onClick={() => handleGoToDetail(finance.uid)}>
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
                  {finance.notes}
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4} onClick={() => handleGoToDetail(finance.uid)}>
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
                  {parseChanges(finance.changes)}
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
          {len !== i && <Divider />}
        </div>
      )
    );
  };
  
  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader
          component="div"
        >
          {
            response &&
            response.metadata && 
            response.metadata.paginate &&
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural one="finance" other="finances" value={response.metadata.total} />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          }
        </ListSubheader>
      }
    >
      {
        response &&
        isArray(response.data) && 
        renderFinanceList(response.data)
      }
    </List>
  );

  const render = (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        <RenderList/>
          <Button
            fullWidth
            variant="contained"
            type="button"
            color="primary"
            size="large"
            disabled={!financeUids || financeUids.length <= 0}
            onClick={() => handleGoToApproval()}
          > APPROVAL
          </Button>
        </Paper>}
    </React.Fragment>
  );

  return render;
};