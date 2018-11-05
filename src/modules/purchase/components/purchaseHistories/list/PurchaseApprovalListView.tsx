import { Divider, Grid, LinearProgress, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseApprovalListProps } from '@purchase/components/purchaseHistories/list/PurchaseApprovalList';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const PurchaseApprovalListView: React.SFC<PurchaseApprovalListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.purchaseApprovalState.all;

  const renderPurchaseList = (purchases: IPurchase[]) => {
    const len = purchases.length - 1;

    return (
      purchases.map((purchase, i) => 
        <div key={purchase.uid}>
          <ListItem 
            button={!isLoading} 
            key={purchase.uid} 
            onClick={() => handleGoToDetail(purchase.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {purchase.uid} &bull; {purchase.notes} &bull; {purchase.request}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {purchase.customer && purchase.customer.name} {purchase.customer && purchase.customer.company && `(${purchase.customer.company.name})`} &bull;&nbsp;
                  {purchase.projectUid} {` - ${purchase.project && purchase.project.name}`}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >{` Advance Payment: ${purchase.advance}`} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={purchase.date || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {purchase.status && purchase.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(purchase.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {purchase.changes && moment(purchase.changes.updatedAt ? purchase.changes.updatedAt : purchase.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="purchase" other="purchases" value={response.metadata.total} />
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
        (response &&
        isArray(response.data) && 
        renderPurchaseList(response.data))
      }
    </List>
  );

  const RenderNull = () => (
    <Typography variant="body2" align="center">Lost in The Force, Padawan, you are.</Typography>  
  );

  const render = (
    <React.Fragment>
      { isLoading && response && <LinearProgress />}
      { response &&
          <Paper
            square
            elevation={1}
          >
          {response.metadata.paginate === null ? <RenderNull/> : <RenderList />} 
          </Paper> }
    </React.Fragment>
  );
  return render;
};