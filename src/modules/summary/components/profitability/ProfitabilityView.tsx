import {  Card, CardContent, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ProfitabilityProps } from '@summary/components/profitability/Profitability';
import { FilterForm } from '@summary/components/profitability/sharedFilterForm/FilterForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { ProfitabilityExpenseView } from './ProfitabilityExpenseView';
import { ProfitabilityProjectView } from './ProfitabilityProjectView';

export const ProfitabilityView: React.SFC<ProfitabilityProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, expenseProjectUid, intl, handleChangeFilter } = props;
  const { isLoading, response } = props.summaryState.profitability;  

  const RenderProfitability = (profitability: ISummaryProfitability) => {
    return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
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
                        <FormattedMessage id="summary.profitability.tableHead.totalValue" />
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(profitability.totalValue)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.profitability.tableHead.totalCogs" />
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(profitability.totalCogs)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.profitability.tableHead.profit" />
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(profitability.profit)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.profitability.tableHead.percentage" />
                      </TableCell>
                      <TableCell numeric>
                        {`${profitability.percentage} %`}
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
          <Typography variant="body2">loading</Typography>
        }
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