import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { ProgressProps } from '@summary/components/progress/Progress';
import { FilterForm } from '@summary/components/progress/sharedFilterForm/FilterForm';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { ProgressExpenseView } from './ProgressExpenseView';
import { ProgressProjectView } from './ProgressProjectView';

export const ProgressView: React.SFC<ProgressProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, expenseProjectUid, intl, handleChangeFilter } = props;
  const { isLoading, response } = props.summaryState.progress;  

  const RenderProgress = (progress: ISummaryProgress) => {
    return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            {
              progress.projects &&
              <ProgressProjectView 
                projects={progress.projects}
                handleDialogOpen={handleDialogOpen}
                classes={classes}
                intl={intl}
                width={width}
              />
            }
          </Grid>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6}>
            <Card
              square
            >
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head">
                        {intl.formatMessage(summaryMessage.progress.header.totalValue)}
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(progress.totalValue)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        {intl.formatMessage(summaryMessage.progress.header.totalCogs)}
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(progress.totalCogs)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        {intl.formatMessage(summaryMessage.progress.header.profit)}
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(progress.profit)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        {intl.formatMessage(summaryMessage.progress.header.percentage)}
                      </TableCell>
                      <TableCell numeric>
                        {`${progress.percentage} %`}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
    );
  };

  const render = (
    <React.Fragment>
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Card 
            square 
          >
            <CardContent>
              <FilterForm 
                onProjectSelected= {handleChangeFilter}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
        {
          isLoading &&
          <Typography>
            {intl.formatMessage(layoutMessage.text.loading)}
          </Typography>
        }
        {
          !isLoading &&
          response &&
          response.data &&
          RenderProgress(response.data)
        }
        </Grid>
      </Grid>
      <ProgressExpenseView 
        expenses={expenses}
        dialogFullScreen={dialogFullScreen}
        dialogOpen={dialogOpen}
        expenseProjectUid={expenseProjectUid}
        handleDialogClose={handleDialogClose}
        classes={classes}
        intl={intl}
      />
    </React.Fragment>
  );

  return render;
};