import AppMenu from '@constants/AppMenu';
import { IBaseChanges } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { ITravelRequest } from '@travel/classes/response';
import { TravelRequestField } from '@travel/classes/types';
import withApiTravelRequestAll, { WithApiTravelRequestAllHandler } from '@travel/enhancers/request/withApiTravelRequestAll';
import withTravelRequestAll, { WithTravelRequestAll } from '@travel/enhancers/request/withTravelRequestAll';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps
  = WithTravelRequestAll
  & WithLayout
  & WithNavBottom
  & WithApiTravelRequestAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const requestList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.travelAllState;

  const handleClick = (travelUid: string) => {
    if (!isLoading) {
      history.push(`/travel/details/${travelUid}`);
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

  const renderTravelList = (travels: ITravelRequest[]) => {
    const len = travels.length - 1;

    return (
      travels.map((travel, i) => 
        <div key={travel.uid}>
          <ListItem 
            button={!isLoading} 
            key={travel.uid} 
            onClick={() => handleClick(travel.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {travel.destination && travel.destination.value}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {travel.customer && travel.customer.name} &bull; {travel.customer && travel.customer.company && travel.customer.company.name} 
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {travel.uid} &bull; {travel.total} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={travel.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={travel.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {travel.status && travel.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(travel.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {travel.changes && moment(travel.changes.updatedAt ? travel.changes.updatedAt : travel.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="travel" other="travels" value={response.metadata.total} />
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
        renderTravelList(response.data)
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
      uid: AppMenu.TravelRequest,
      parentUid: AppMenu.TravelRequest,
      title: intl.formatMessage({id: 'travel.title'}),
      subTitle : intl.formatMessage({id: 'travel.subTitle'})
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
      onAddCallback: () => history.push('/travel/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(TravelRequestField)
      .map(key => ({ id: key, name: TravelRequestField[key] }));

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
  setDisplayName('TravelRequestList'),
  withApiTravelRequestAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withTravelRequestAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(requestList);