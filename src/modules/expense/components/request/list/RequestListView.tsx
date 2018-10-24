import { IExpense } from '@expense/classes/response';
import { RequestListProps } from '@expense/components/request/list/RequestList';
import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
import { parseChanges } from '@utils/parseChanges';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const RequestListView: React.SFC<RequestListProps> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.expenseRequestState.all;

  const renderExpenseList = (expenses: IExpense[]) => {
    const len = expenses.length - 1;

    return (
      expenses.map((expense, i) => 
        <div key={expense.uid}>
          <ListItem 
            button={!isLoading} 
            key={expense.uid} 
            onClick={() => handleGoToDetail(expense.uid)}
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
                  {expense.customer && expense.customer.name} {expense.client && `(${expense.client.name})`} &bull;&nbsp;
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

  const render = (
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

  return render;
};