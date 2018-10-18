import AppMenu from '@constants/AppMenu';
import { IFinance } from '@finance/classes/response';
import { FinanceField } from '@finance/classes/types';
import withApiFinanceAll, { WithApiFinanceAllHandler } from '@finance/enhancers/approval/withApiFinanceAll';
import withFinanceAll, { WithFinanceAll } from '@finance/enhancers/approval/withFinanceAll';
import { IBaseChanges } from '@generic/interfaces';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { withNavBottom, WithNavBottom } from '@layout/hoc/withNavBottom';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
import { isArray } from 'util';

type AllProps 
  = WithFinanceAll
  & WithLayout
  & WithNavBottom
  & WithApiFinanceAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const registrationList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.financeAllState;

  const handleClick = (financeUid: string) => {
    if (!isLoading) {
      history.push(`/finance/details/${financeUid}`);
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

  const renderFinanceList = (finances: IFinance[]) => {
    const len = finances.length - 1;

    return (
      finances.map((finance, i) => 
        <div key={finance.uid}>
          <ListItem 
            button={!isLoading} 
            key={finance.uid} 
            onClick={() => handleClick(finance.uid)}
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
                {finance.document.changes.created && finance.document.changes.created.fullName} &nbsp;&bull;&nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={finance.document.changes.updatedAt || ''} 
                  />
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
      uid: AppMenu.FinanceApproval,
      parentUid: AppMenu.Finance,
      title: intl.formatMessage({id: 'finance.title'}),
      subTitle : intl.formatMessage({id: 'finance.subTitle'})
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
      onAddCallback: () => history.push('/finance/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(FinanceField)
      .map(key => ({ id: key, name: FinanceField[key] }));

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
  setDisplayName('FinanceList'),
  withApiFinanceAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withFinanceAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(registrationList);