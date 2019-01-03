import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import * as React from 'react';
import { LeaveCalculationFilterForm } from './form/LeaveCalculationFilterForm';
import { LeaveCalculationListProps } from './LeaveCalculationList';
import { LeaveCalculationTableView } from './LeaveCalculationTableView';

export const LeaveCalculationListView: React.SFC<LeaveCalculationListProps> = props => {
  const { isLoading, response } = props.leaveCalculationState.all;
  const {
    year,
    size,
    orderBy,
    page,
    direction,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSort,
    handleChangeFilter
  } = props;

  const renderFilter = () => {
    return (
      <LeaveCalculationFilterForm 
        onYearSelected={handleChangeFilter}
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
            </Grid>
          </Grid>
          {isLoading && !response && (
            <Typography variant="body2">loading</Typography>
          )}
          {!isLoading && response && (
            <LeaveCalculationTableView
              year={year}
              page={page}
              size={size}
              orderBy={orderBy}
              direction={direction}
              metadata={response.metadata}
              data={response.data}
              handleChangePage={handleChangePage}
              handleChangeSize={handleChangeSize}
              handleChangeSort={handleChangeSort}
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
