import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { BillableDate } from '@summary/components/billable/BillableDate';
import { WinningRatioProps } from '@summary/components/winningRatio/WinningRatio';
import { WinningRatioDetail } from '@summary/components/winningRatio/WinningRatioDetail';
import { WinningRatioTable } from '@summary/components/winningRatio/WinningRatioTable';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

export const WinningRatioView: React.SFC<WinningRatioProps> = props => {
  const { isLoading, response } = props.summaryState.winning;
  const { user } = props.userState;
  const {
    intl,
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
            label={intl.formatMessage(summaryMessage.winningRatio.field.company)}
            value={user && user.company.name}
          />
        </Grid>
        <Grid item xs md>
          <TextField
            margin="normal"
            label={intl.formatMessage(summaryMessage.winningRatio.field.name)}
            onChange={e => handleChangeFind(e.target.value)}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={start}
            label={intl.formatMessage(summaryMessage.winningRatio.field.start)}
            handleChange={handleChangeStart}
            disableFuture={false}
          />
        </Grid>
        <Grid item xs md>
          <BillableDate
            val={end}
            label={intl.formatMessage(summaryMessage.winningRatio.field.end)}
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
            <Grid item xs md>
              {renderFilter()}
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
