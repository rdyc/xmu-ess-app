import {
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { WinningRatioProps } from '@summary/components/winningRatio/WinningRatio';
import { WinningRatioDetail } from '@summary/components/winningRatio/WinningRatioDetail';
import { WinningRatioTable } from '@summary/components/winningRatio/WinningRatioTable';
import * as React from 'react';
// import { BillableFilterForm } from '../billable/billableFilterForm/BillableFilterForm';

export const WinningRatioView: React.SFC<WinningRatioProps> = props => {
  const { isLoading, response } = props.summaryState.winning;
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
    // handleChangeFilter
  } = props;

  // const renderFilter = () => {
  //   return (
  //     <BillableFilterForm 
  //       onFilterChange={handleChangeFilter}
  //     />
  //   );
  // };

  const render = (
    <React.Fragment>
      <Card square>
        <CardContent>
          <Grid container spacing={16}>
            <Grid item xs md>
              {/* {renderFilter()} */}
            </Grid>
          </Grid>
          {isLoading && !response && (
            <Typography variant="body2">Loading</Typography>
          )}
          <WinningRatioDetail 
            uid={props.uid}
            type={props.type}
            open={props.open}
            handleDialog={handleDialog}
            data={response && response.data}
          />
          {!isLoading && response && (
            <WinningRatioTable
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
