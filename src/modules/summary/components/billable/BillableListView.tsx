import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { BillableDate } from '@summary/components/billable/BillableDate';
import { BillableDetail } from '@summary/components/billable/BillableDetail';
import { BillableListProps } from '@summary/components/billable/BillableList';
import { BillableTableView } from '@summary/components/billable/BillableTableView';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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
            label={<FormattedMessage id="billable.field.company" />}
            value={user && user.company.name}
          />
        </Grid>
        <Grid item xs md>
          <TextField
            margin="normal"
            label={<FormattedMessage id="billable.field.name" />}
            onChange={e => handleChangeFind(e.target.value)}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={start}
            handleChange={handleChangeStart}
            disableFuture={false}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={end}
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
          {renderFilter()}
          <Typography noWrap align="left" variant="caption">
            <FormattedMessage id="billable.note" /> <br/>
            <FormattedMessage id="billable.totalhours" /> <br />
            <FormattedMessage id="billable.percentage" />
          </Typography>
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
