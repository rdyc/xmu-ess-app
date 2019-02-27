import { PreloaderWithError } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Paper, Typography } from '@material-ui/core';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';

import { BillableProps } from './Billable';
import { BillableDetail } from './BillableDetailView';
import { BillableListFilter } from './BillableListFilter';
import { BillableTableView } from './BillableTableView';

export const BillableView: React.SFC<BillableProps> = props => (
  <React.Fragment>
    <BillableListFilter
      isAdmin={props.isAdmin}
      isLoading={props.summaryState.billable.isLoading}
      onClickSync={props.handleReloadData}
      onApply={props.handleChangeFilter}
    />

    <PreloaderWithError 
      state={props.summaryState.billable} 
      waitingText={props.intl.formatMessage(layoutMessage.text.waiting)}
      onRetry={props.handleReloadData}
    >
      <Paper square elevation={1}>
        {
          props.summaryState.billable.response &&
          <React.Fragment>
            <BillableDetail
              uid={props.uid}
              type={props.type}
              isDetailOpen={props.isDetailOpen}
              handleDialogDetail={props.handleDialogDetail}
              data={props.summaryState.billable.response.data}
            />

            <BillableTableView
              page={props.page}
              size={props.size}
              orderBy={props.orderBy}
              direction={props.direction}
              metadata={props.summaryState.billable.response.metadata}
              data={props.summaryState.billable.response.data}
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
    </PreloaderWithError>

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
  </React.Fragment>
);