import AppMenu from '@constants/AppMenu';
// import { IBaseChanges } from '@generic/interfaces';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withNavBottom, WithNavBottom } from '@layout/hoc/withNavBottom';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core';

import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestField } from '@mileage/classes/types';

import withApiMileageRequestAll, {
  WithApiMileageRequestAllHandler
} from '@mileage/enhancers/request/withApiMileageRequestAll';
import withMileageRequestAll, {
  WithMileageRequestAll
} from '@mileage/enhancers/request/withMileageRequestAll';

// import * as moment from 'moment';
import * as React from 'react';
import {
  // FormattedDate,
  FormattedNumber,
  FormattedPlural,
  InjectedIntlProps,
  injectIntl
} from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName
} from 'recompose';
import { isArray } from 'util';

type AllProps = WithMileageRequestAll &
  WithLayout &
  WithNavBottom &
  WithApiMileageRequestAllHandler &
  RouteComponentProps &
  InjectedIntlProps;

const mileagerequestList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.mileagerequestAllState;

  const handleClick = (mileageUid: string) => {
    if (!isLoading) {
      history.push(`/mileage/details/${mileageUid}`);
    }
  };

  const renderMileageRequestList = (mileages: IMileageRequest[]) => {
    const len = mileages.length - 1;

    return mileages.map((mileage, i) => (
      <div key={mileage.uid}>
        <ListItem
          button={!isLoading}
          key={mileage.uid}
          onClick={() => handleClick(mileage.uid)}
        >
          <Grid container spacing={24}>
            <Grid item xs={8} sm={8}>
              <Typography noWrap color="primary" variant="body2">
                {mileage.employee && mileage.employee.fullName}
              </Typography>
              <Typography noWrap variant="body1">
                {mileage.uid}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography noWrap align="right" variant="body1">
                {mileage.statusType}
              </Typography>
              <Typography noWrap align="right" variant="caption">
                {mileage.month} &bull; {mileage.year}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        {len !== i && <Divider />}
      </div>
    ));
  };

  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          {response &&
            response.metadata && (
              <Grid container spacing={24}>
                <Grid item xs={6} sm={6}>
                  <Typography variant="caption" color="primary">
                    <FormattedNumber value={response.metadata.total} /> &nbsp;
                    <FormattedPlural
                      one="mileage"
                      other="mileages"
                      value={response.metadata.total}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="caption" align="right" color="primary">
                    <FormattedNumber
                      value={response.metadata.paginate.current}
                    />{' '}
                    of{' '}
                    <FormattedNumber value={response.metadata.paginate.total} />
                  </Typography>
                </Grid>
              </Grid>
            )}
        </ListSubheader>
      }
    >
      {response &&
        isArray(response.data) &&
        renderMileageRequestList(response.data)}
    </List>
  );

  return (
    <React.Fragment>
      {isLoading &&
        response && <Typography variant="body2">Loading</Typography>}
      {response && (
        <Paper square elevation={1}>
          <RenderList />
        </Paper>
      )}
    </React.Fragment>
  );
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const {
      handleNext,
      handlePrev,
      handleSync,
      handleOrder,
      handleSize,
      handleSort,
      layoutDispatch,
      navBottomDispatch,
      history,
      intl
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({ id: 'mileage.request.title' }),
      subTitle: intl.formatMessage({ id: 'mileage.request.subTitle' })
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
      onAddCallback: () => history.push('/mileage/form'),
      onSizeCallback: handleSize
    });

    const items = Object.keys(MileageRequestField).map(key => ({
      id: key,
      name: MileageRequestField[key]
    }));

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
  setDisplayName('MileageRequestList'),
  withApiMileageRequestAll({
    orderBy: 'uid',
    direction: 'descending'
  }),
  withMileageRequestAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles)
)(mileagerequestList);
