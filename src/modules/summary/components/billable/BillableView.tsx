import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { BillableProps } from './Billable';
import { BillableDetail } from './BillableDetailView';
import { BillableListFilter } from './BillableListFilter';
import { BillableTableView } from './BillableTableView';

export const BillableView: React.SFC<BillableProps> = props => {
  const { isLoading, response } = props.summaryState.billable;
  const { 
    handleChangeFilter, 
    handleReloadData, 
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
  } = props;

  const render = (
    <React.Fragment>
      <Grid container spacing={16}>
        <Grid item xs={4}>
          <Typography noWrap align="left" variant="caption">
            {props.intl.formatMessage(summaryMessage.billable.note.note)} <br />
            {props.intl.formatMessage(summaryMessage.billable.note.totalHours)} <br />
            {props.intl.formatMessage(summaryMessage.billable.note.billablePercentage)} <br />
            {props.intl.formatMessage(summaryMessage.billable.note.presalesPercentage)}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <BillableListFilter
            isAdmin={props.isAdmin}
            className={props.classes.flex}
            isLoading={isLoading}
            onClickSync={handleReloadData}
            onApply={handleChangeFilter}
          />
        </Grid>
      </Grid>
      <Card square>
        <CardContent>
          {isLoading && (
            <Typography variant="body2">
             <FormattedMessage {...layoutMessage.text.loading} />
            </Typography>
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