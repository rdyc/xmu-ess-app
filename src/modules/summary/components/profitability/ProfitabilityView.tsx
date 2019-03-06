import { Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ProfitabilityProps } from '@summary/components/profitability/Profitability';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { ProfitabilityFormFilter } from './filter/ProfitabilityFormFilter';
import { ProfitabilityExpenseView } from './ProfitabilityExpenseView';
import { ProfitabilityProjectView } from './ProfitabilityProjectView';

export const ProfitabilityView: React.SFC<ProfitabilityProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, isStartup, expenseProjectUid, intl, handleChangeFilter, handleReloadData } = props;
  const { isLoading, response } = props.summaryState.profitability;

  const RenderProfitability = (profitability: ISummaryProfitability) => {
    return (
      <Grid container spacing={16}>
        <Grid item xs={12} md={12}>
          {
            profitability.projects &&
            <ProfitabilityProjectView
              projects={profitability.projects}
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
                      {intl.formatMessage(summaryMessage.profitability.header.totalValue)}
                    </TableCell>
                    <TableCell numeric>
                      {intl.formatNumber(profitability.totalValue)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {intl.formatMessage(summaryMessage.profitability.header.totalCogs)}
                    </TableCell>
                    <TableCell numeric>
                      {intl.formatNumber(profitability.totalCogs)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {intl.formatMessage(summaryMessage.profitability.header.profit)}
                    </TableCell>
                    <TableCell numeric>
                      {intl.formatNumber(profitability.profit)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">
                      {intl.formatMessage(summaryMessage.profitability.header.percentage)}
                    </TableCell>
                    <TableCell numeric>
                      {`${intl.formatNumber(profitability.percentage)} %`}
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
          <Paper>
            <ProfitabilityFormFilter
              className={props.classes.flex}
              isLoading={isLoading}
              onClickSync={handleReloadData}
              onApply={handleChangeFilter}
              isStartup={isStartup}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {
            !isLoading &&
            response &&
            response.data &&
            RenderProfitability(response.data)
          }
        </Grid>
      </Grid>
      <ProfitabilityExpenseView
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