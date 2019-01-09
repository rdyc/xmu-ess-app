// import { layoutMessage } from '@layout/locales/messages';
import {  Card, CardContent, Grid, Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ProfitabilityProps } from '@summary/components/profitability/Profitability';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { ProfitabilityExpenseView } from './ProfitabilityExpenseView';
import { ProfitabilityProjectView } from './ProfitabilityProjectView';
import { ProfitabilityFormFilter } from './shared/ProfitabilityFormFilter';

export const ProfitabilityView: React.SFC<ProfitabilityProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, expenseProjectUid, intl, handleChangeFilter, handleReloadData } = props;
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
        {/* <Grid item xs={12}>
          <Card 
            square 
          >
            <CardContent>
              <FilterForm 
                onProjectSelected= {handleChangeFilter}
              />
            </CardContent>
          </Card>
        </Grid> */}
        <Grid item xs={12}>
          <ProfitabilityFormFilter 
            className={props.classes.flex}
            isLoading={isLoading}
            onClickSync={handleReloadData}
            onApply={handleChangeFilter}
          />
        </Grid>
        <Grid item xs={12}>
        {/* {
          isLoading &&
          <Typography>
            {intl.formatMessage(layoutMessage.text.loading)}
          </Typography>
        } */}
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