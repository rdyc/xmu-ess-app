import { layoutMessage } from '@layout/locales/messages';
import { Grid, Paper, Typography } from '@material-ui/core';
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
      <Grid container spacing={8}>
        <Grid item xs={12}>
        <Paper square elevation={1} className={props.classes.paperPaging}>
          <BillableListFilter
            isAdmin={props.isAdmin}
            className={props.classes.flex}
            isLoading={isLoading}
            onClickSync={handleReloadData}
            onApply={handleChangeFilter}
          />
        </Paper>
        <Paper square elevation={1}>
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
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return render;
};