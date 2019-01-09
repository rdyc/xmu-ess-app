import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { BillableDetail } from '@summary/components/billable/BillableDetailView';
import { BillableListProps } from '@summary/components/billable/BillableList';
import { BillableTableView } from '@summary/components/billable/BillableTableView';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { BillableFilterForm } from './billableFilterForm/BillableFilterForm';

export const BillableListView: React.SFC<BillableListProps> = props => {
  const { isLoading, response } = props.summaryState.billable;
  const {
    size,
    orderBy,
    page,
    direction,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSort,
    handleDialog,
    handleDetail,
    handleChangeFilter
  } = props;

  const renderFilter = () => {
    return (
      <BillableFilterForm 
        onFilterChange={handleChangeFilter}
      />
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
                {props.intl.formatMessage(summaryMessage.billable.note.billablePercentage)} <br />
                {props.intl.formatMessage(summaryMessage.billable.note.presalesPercentage)}
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
