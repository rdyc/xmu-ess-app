import AppMenu from '@constants/AppMenu';
import { IBaseChanges } from '@generic/interfaces';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withNavBottom, WithNavBottom } from '@layout/hoc/withNavBottom';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { IPurchase } from '@purchase/classes/response/purchaseRequest';
import { PurchaseField } from '@purchase/classes/types';
import withApiPurchaseRequestAll, { WithApiPurchaseRequestAllHandler } from '@purchase/enhancers/purchaseRequest/withApiPurchaseRequestAll';
import withPurchaseRequestAll, { WithPurchaseRequestAll } from '@purchase/enhancers/purchaseRequest/withPurchaseRequestAll';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps 
  = WithPurchaseRequestAll
  & WithLayout
  & WithNavBottom
  & WithApiPurchaseRequestAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const registrationList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.purchaseAllState;

  const handleClick = (purchaseUid: string) => {
    if (!isLoading) {
      history.push(`/purchase/purchaserequest/details/${purchaseUid}`);
    } 
  };

  const parseChanges = (changes: IBaseChanges | null) => {
    let result = 'Unknown';
    
    if (!changes) {
      return result;
    }

    if (changes.updatedBy !== null) {
      result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
    } else {
      result = changes.created ? changes.created.fullName : changes.createdBy;
    }

    return result;
  };

  const renderPurchaseRequestList = (purchases: IPurchase[]) => {
    const len = purchases.length - 1;

    return (
      purchases.map((purchase, i) => 
        <div key={purchase.uid}>
          <ListItem 
            button={!isLoading} 
            key={purchase.uid} 
            onClick={() => handleClick(purchase.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {purchase.notes}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {purchase.customer && purchase.customer.name} &bull; {purchase.customer && purchase.customer.company && purchase.customer.company.name}}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {purchase.projectUid} &bull; {purchase.project && purchase.project.description} &bull; &nbsp;
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
        response &&
        isArray(response.data) && 
        renderPurchaseRequestList(response.data)
      }
    </List>
  );

  return (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() { 
    const { 
      handleNext, handlePrev, handleSync, 
      handleOrder, handleSize, handleSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.PurchaseRequest,
      parentUid: AppMenu.Purchase,
      title: intl.formatMessage({id: 'purchase.title'}),
      subTitle : intl.formatMessage({id: 'purchase.subTitle'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleNext,
      onPrevCallback: handlePrev,
      onSyncCallback: handleSync,
      onOrderCallback: handleOrder,
      onDirectionCallback: handleSort,
      onAddCallback: () => history.push('/purchase/purchaseRequest/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(PurchaseField)
      .map(key => ({ id: key, name: PurchaseField[key] }));

    navBottomDispatch.assignFields(items);
  },

  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('PurchaseRequestList'),
  withApiPurchaseRequestAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withPurchaseRequestAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(registrationList);