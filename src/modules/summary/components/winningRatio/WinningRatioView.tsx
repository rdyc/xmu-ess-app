import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Paper } from '@material-ui/core';
import * as React from 'react';
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
    handleDialogDetail,
    handleDetail,
  } = props;

  const render = (
    <React.Fragment>
      <WinningRatioFilter
        isAdmin={props.isAdmin}
        initialProps={{
          companyUid: props.companyUid,
          employeeUid: props.employeeUid,
          start: props.start,
          end: props.end
        }}
        isLoading={isLoading}
        onClickSync={handleReloadData}
        onApply={handleChangeFilter}
      />
      <PreloaderWithError 
        state={props.summaryState.winning}
        waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
        onRetry={handleReloadData}
      >
        <Paper square elevation={1}>
          {
            response &&
            <React.Fragment>
              <WinningRatioDetail
                uid={props.uid}
                type={props.type}
                isDetailOpen={props.isDetailOpen}
                handleDialogDetail={handleDialogDetail}
                data={response && response.data}
              />
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
                handleDialogDetail={handleDialogDetail}
                handleGoToNext={handleGoToNext}
                handleGoToPrevious={handleGoToPrevious}
              />
            </React.Fragment>
          }
        </Paper>
      </PreloaderWithError>
    </React.Fragment>
  );

  return render;
};