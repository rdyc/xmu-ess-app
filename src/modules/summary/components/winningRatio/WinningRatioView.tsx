import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WinningRatioProps } from './WinningRatio';
import { WinningRatioDetail } from './WinningRatioDetail';
import { WinningRatioFilter } from './WinningRatioFilter';
import { WinningRatioTable } from './WinningRatioTable';

export const WinningRatioView: React.SFC<WinningRatioProps> = props => {
  const { isLoading, response } = props.summaryState.winning;
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
        <Grid item xs={12}>
          <WinningRatioFilter
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