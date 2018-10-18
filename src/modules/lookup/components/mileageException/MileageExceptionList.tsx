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

import { IMileageException } from '@lookup/classes/response';
import { MileageExceptionField } from '@lookup/classes/types';
import withApiMileageExceptionAll, {
  WithApiMileageExceptionAllHandler
} from '@lookup/enhancers/mileageException/withApiMileageExceptionAll';
import withMileageExceptionAll, {
  WithMileageExceptionAll
} from '@lookup/enhancers/mileageException/withMileageExceptionAll';

// import * as moment from 'moment';
import * as React from 'react';
import {
  FormattedDate,
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

type AllProps = WithMileageExceptionAll &
  WithLayout &
  WithNavBottom &
  WithApiMileageExceptionAllHandler &
  RouteComponentProps &
  InjectedIntlProps;

const mileageExceptionList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.mileageExceptionAllState;

  const handleClick = (mileageExceptionUid: string) => {
    if (!isLoading) {
      history.push(`/lookup/mileageexception/details/${mileageExceptionUid}`);
    }
  };

  const renderMileageExceptionList = (mileageExcs: IMileageException[]) => {
    const len = mileageExcs.length - 1;

    return mileageExcs.map((mileageExc, i) => (
      <div key={mileageExc.uid}>
        <ListItem
          button={!isLoading}
          key={mileageExc.uid}
          onClick={() => handleClick(mileageExc.uid)}
        >
          <Grid container spacing={24}>
            <Grid item xs={8} sm={8}>
              <Typography noWrap color="primary" variant="body2">
                {mileageExc.role.name} &bull;{' '}
                {mileageExc.role.company && mileageExc.role.company.name}
              </Typography>
              <Typography noWrap variant="body1">
                {mileageExc.projectUid} &bull;{' '}
                {mileageExc.project && mileageExc.project.name}
              </Typography>
              <Typography noWrap color="textSecondary" variant="caption">
                {mileageExc.reason}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography noWrap variant="body1" align="right">
                <FormattedDate
                  year="numeric"
                  month="short"
                  day="numeric"
                  value={mileageExc.inactiveDate || ' '}
                />
              </Typography>
              <Typography noWrap variant="caption" align="right">
                {mileageExc.type && mileageExc.type.value}
              </Typography>
              <Typography noWrap variant="caption" align="right">
                {mileageExc.percentage}
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
                  <FormattedPlural one="Mileage Exception" other="Mileage Exceptions" value={response.metadata.total} />
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
        renderMileageExceptionList(response.data)
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
      uid: AppMenu.LookupMileageException,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage({id: 'lookup.mileageexception.title'}),
      subTitle : intl.formatMessage({id: 'lookup.mileageexception.subTitle'})
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
      onAddCallback: () => history.push('/lookup/mileageexception/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(MileageExceptionField)
      .map(key => ({ id: key, name: MileageExceptionField[key] }));

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
  setDisplayName('MileageExceptionList'),
  withApiMileageExceptionAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withMileageExceptionAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(mileageExceptionList);