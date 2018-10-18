import AppMenu from '@constants/AppMenu';
import { IExpense } from '@expense/classes/response';
import { ExpenseField } from '@expense/classes/types';
import withApiExpenseAll, { WithApiExpenseAllHandler } from '@expense/enhancers/request/withApiExpenseAll';
import withExpenseAll, { WithExpenseAll } from '@expense/enhancers/request/withExpenseAll';
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
  = WithExpenseAll
  & WithLayout
  & WithNavBottom
  & WithApiExpenseAllHandler
  & RouteComponentProps
  & InjectedIntlProps;

const registrationList: React.SFC<AllProps> = props => {
  const { history } = props;
  const { isLoading, response } = props.expenseAllState;

  const handleClick = (expenseUid: string) => {
    if (!isLoading) {
      history.push(`/expense/details/${expenseUid}`);
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

  const renderExpenseList = (expenses: IExpense[]) => {
    const len = expenses.length - 1;

    return (
      expenses.map((expense, i) => 
        <div key={expense.uid}>
          <ListItem 
            button={!isLoading} 
            key={expense.uid} 
            onClick={() => handleClick(expense.uid)}
          >
            <Grid container spacing={24}>
              <Grid item xs={8} sm={8}>
                <Typography 
                  noWrap 
                  color="primary" 
                  variant="body2"
                >
                  {expense.notes}
                </Typography>
                <Typography 
                  noWrap
                  variant="body1"
                >
                  {expense.customer && expense.customer.name} {expense.client && `(${expense.client.name})`} &bull; 
                  {expense.projectUid} {` - ${expense.project.name}`}
                </Typography>
                <Typography 
                  noWrap
                  color="textSecondary" 
                  variant="caption"
                >
                  {expense.uid} &bull; {expense.expense && expense.expense.value} &bull; &nbsp;
                  <FormattedDate 
                    year="numeric"
                    month="short"
                    day="numeric"
                    value={expense.date || ''} 
                  />
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography 
                  noWrap 
                  variant="body1" 
                  align="right"
                >
                  {expense.status && expense.status.value}
                </Typography>
                <Typography 
                  noWrap 
                  color="secondary"
                  variant="caption" 
                  align="right"
                >
                  {parseChanges(expense.changes)}
                </Typography>
                <Typography 
                  noWrap
                  variant="caption" 
                  align="right"
                >
                  {expense.changes && moment(expense.changes.updatedAt ? expense.changes.updatedAt : expense.changes.createdAt).fromNow()}
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
                  <FormattedPlural one="expense" other="expenses" value={response.metadata.total} />
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
        renderExpenseList(response.data)
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
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: 'expense.title'}),
      subTitle : intl.formatMessage({id: 'expense.subTitle'})
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
      onAddCallback: () => history.push('/expense/form'),
      onSizeCallback: handleSize,
    });

    const items = Object.keys(ExpenseField)
      .map(key => ({ id: key, name: ExpenseField[key] }));

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
  setDisplayName('ExpenseList'),
  withApiExpenseAll({ 
    orderBy: 'uid',
    direction: 'descending',
  }),
  withExpenseAll,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  lifecycle<AllProps, {}>(lifecycles),
)(registrationList);