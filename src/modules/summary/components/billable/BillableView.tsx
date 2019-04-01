// import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

import { BillableProps } from './Billable';
import { BillableDetail } from './BillableDetailView';
import { BillableListFilter } from './BillableListFilter';
import { BillableTableView } from './BillableTableView';

export const BillableView: React.SFC<BillableProps> = props => {
  const { isLoading, response} = props.summaryState.billable;

  const render = (
    <React.Fragment>
      <BillableListFilter
        isAdmin={props.isAdmin}
        initialProps={{
          companyUid: props.companyUid,
          employeeUid: props.employeeUid,
          start: props.start,
          end: props.end
        }}
        isLoading={isLoading}
        onClickSync={props.handleReloadData}
        onApply={props.handleChangeFilter}
      />

      {/* <PreloaderWithError 
        state={props.summaryState.billable} 
        waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
        onRetry={props.handleReloadData}
      > */}
        <Paper square elevation={1}>
          {
            isLoading &&
            <div className={props.classes.preloader}>
              <div className={props.classes.preloaderContent}>
                <CircularProgress 
                  style={{margin: 'auto'}} 
                  color="secondary"
                />

                <Typography
                  className={props.classes.marginFarTop}
                >
                  {props.intl.formatMessage(layoutMessage.text.waiting)}
                </Typography>
              </div>    
            </div>
          }
          {
            !isLoading &&
            response &&
            response.data &&
            <React.Fragment>
              <BillableDetail
                uid={props.uid}
                type={props.type}
                isDetailOpen={props.isDetailOpen}
                handleDialogDetail={props.handleDialogDetail}
                data={response.data}
              />

              <BillableTableView
                page={props.page}
                size={props.size}
                orderBy={props.orderBy}
                direction={props.direction}
                metadata={response.metadata}
                data={response.data}
                handleChangePage={props.handleChangePage}
                handleChangeSize={props.handleChangeSize}
                handleChangeSort={props.handleChangeSort}
                handleDetail={props.handleDetail}
                handleDialogDetail={props.handleDialogDetail}
                handleGoToNext={props.handleGoToNext}
                handleGoToPrevious={props.handleGoToPrevious}
              />
            </React.Fragment>
          }
        </Paper>
      <div className={props.classes.marginFarTop}>
        <Typography
          noWrap
          variant="caption"
          className={props.classes.flex}
          align="left"
          component="p"
        >
          {props.intl.formatMessage(summaryMessage.billable.note.note)} <br />
          {props.intl.formatMessage(summaryMessage.billable.note.totalHours)} <br />
          {props.intl.formatMessage(summaryMessage.billable.note.billablePercentage)} <br />
          {props.intl.formatMessage(summaryMessage.billable.note.presalesPercentage)}
        </Typography>
      </div>
      {/* </PreloaderWithError> */}

    </React.Fragment>
  );

  return render;
};