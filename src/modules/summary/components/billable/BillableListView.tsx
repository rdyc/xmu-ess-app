import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { BillableDate } from '@summary/components/billable/BillableDate';
import { BillableDetail } from '@summary/components/billable/BillableDetailView';
import { BillableListProps } from '@summary/components/billable/BillableList';
import { BillableTableView } from '@summary/components/billable/BillableTableView';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

export const BillableListView: React.SFC<BillableListProps> = props => {
  const { isLoading, response } = props.summaryState.billable;
  const { user } = props.userState;
  const {
    start,
    end,
    size,
    orderBy,
    page,
    direction,
    handleChangeStart,
    handleChangeEnd,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSort,
    handleChangeFind,
    handleDialog,
    handleDetail
  } = props;

  const renderFilter = () => {
    return (
      <Grid container spacing={16}>
        <Grid item xs md>
          <TextField
            disabled
            margin="normal"
            label={props.intl.formatMessage(summaryMessage.billable.field.company)}
            value={user && user.company.name}
          />
        </Grid>
        <Grid item xs md>
          <TextField
            margin="normal"
            label={props.intl.formatMessage(summaryMessage.billable.field.name)}
            onChange={e => handleChangeFind(e.target.value)}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={start}
            label={props.intl.formatMessage(summaryMessage.billable.field.start)}
            handleChange={handleChangeStart}
            disableFuture={false}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={end}
            label={props.intl.formatMessage(summaryMessage.billable.field.end)}
            handleChange={handleChangeEnd}
            disableFuture={true}
          />
        </Grid>
      </Grid>
    );
  };

  const render = (
    <React.Fragment>
      <Card square>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs={12} md={12}>
              {renderFilter()}
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography noWrap align="left" variant="caption">
                {props.intl.formatMessage(summaryMessage.billable.note.note)} <br />
                {props.intl.formatMessage(summaryMessage.billable.note.totalHours)} <br />
                {props.intl.formatMessage(summaryMessage.billable.note.percentage)}
              </Typography>
            </Grid>
          </Grid>
          {isLoading && !response && (
            <Typography variant="body2">loading</Typography>
          )}
          <BillableDetail
            uid={props.uid}
            type={props.type}
            open={props.open}
            handleDialog={handleDialog}
            data={response && response.data}
          />
          {!isLoading && response && (
            <BillableTableView
              page={page}
              size={size}
              orderBy={orderBy}
              direction={direction}
              metadata={response.metadata}
              data={response.data}
              handleChangePage={handleChangePage}
              handleChangeSize={handleChangeSize}
              handleChangeSort={handleChangeSort}
              handleDetail={handleDetail}
              handleDialog={handleDialog}
              handleGoToNext={handleGoToNext}
              handleGoToPrevious={handleGoToPrevious}
            />
          )}
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return render;
};
