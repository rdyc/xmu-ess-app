import AppMenu from '@constants/AppMenu';
import { IBaseChanges } from '@generic/interfaces';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withNavBottom, WithNavBottom } from '@layout/hoc/withNavBottom';
import { ILeaveRequest } from '@leave/classes/response';
import { LeaveRequestField } from '@leave/classes/types';
import withApiLeaveRequestAll, { WithApiLeaveRequestAllHandler } from '@leave/enhancers/request/withApiLeaveRequestAll';
import withLeaveRequestAll, { WithLeaveRequestAll } from '@leave/enhancers/request/withLeaveRequestAll';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps 
  = WithLeaveRequestAll
  & WithLayout
  & WithNavBottom
  & WithApiLeaveRequestAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const requestList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.leaveRequestAllState;

  const handleClick = (leaveRequestUid: string) => {
    if (!isLoading) {
      history.push(`/leave/details/${leaveRequestUid}`);
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

  const renderLeaveRequestList = (leaves: ILeaveRequest[]) => {
    const len = leaves.length - 1;

    return (
      leaves.map((leave, i) => 
        <div key={leave.uid}>
          <ListItem 
            button={!isLoading} 
            key={leave.uid} 
            onClick={() => handleClick(leave.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {leave.reason}
                </Typography>
                {/* <Typography 
                  noWrap
                  variant="body1"
                >
                  {leave.employee && leave.employee.fullName}
                </Typography> */}
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {leave.uid} &bull; {leave.leave && leave.leave.value} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={leave.start || ''} 
                  />
                  &nbsp;to&nbsp; 
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={leave.end || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {leave.status && leave.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(leave.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {leave.changes && moment(leave.changes.updatedAt ? leave.changes.updatedAt : leave.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="leave" other="leaves" value={response.metadata.total} />
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
        renderLeaveRequestList(response.data)
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
      uid: AppMenu.LeaveRequest,
      parentUid: AppMenu.Leave,
      title: intl.formatMessage({id: 'leaveRequest.title'}),
      subTitle : intl.formatMessage({id: 'leaveRequest.subTitle'})
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
      onAddCallback: () => history.push('/leave/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(LeaveRequestField)
      .map(key => ({ id: key, name: LeaveRequestField[key] }));

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
  setDisplayName('LeaveRequestList'),
  withApiLeaveRequestAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withLeaveRequestAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(requestList);