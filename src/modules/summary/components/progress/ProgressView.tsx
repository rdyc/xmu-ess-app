import {  Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryAssignment, ISummaryProgress, ISummaryProgressProject } from '@summary/classes/response/progress';
import { ProgressProps } from '@summary/components/progress/Progress';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
export const ProgressView: React.SFC<ProgressProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, expenseProjectUid, intl } = props;
  const { isLoading, response } = props.summaryState.progress;  

  const isMobile = isWidthDown('sm', width);
  
  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="progress-expense-dialog-title"
      fullWidth
    >
      <DialogTitle id="progress-expense-dialog-title">
        <FormattedMessage id="summary.progress.dialog.title" />
        {expenseProjectUid}
      </DialogTitle>
      <DialogContent>
        <Table
          padding= "dense"
        >
          <TableHead>
            <TableRow>
              <TableCell
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.type" />
              </TableCell>
              <TableCell
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.date" />
              </TableCell>
              <TableCell
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.documentUid" />
              </TableCell>
              <TableCell
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.requester" />
              </TableCell>
              <TableCell 
                numeric
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.amount" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              expenses.map(expense =>
                <TableRow>
                  <TableCell>
                    {expense.module}
                  </TableCell>
                  <TableCell>
                    {intl.formatDate(expense.date, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    {expense.documentUid}
                  </TableCell>
                  <TableCell>
                    {expense.employee && expense.employee.fullName}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(expense.amount)}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          <FormattedMessage id="summary.progress.dialog.close" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  const RenderProgressAssignment = (assignments: ISummaryAssignment[]) => {
    return (
      <CardContent>
        <Table
          padding= "dense"
        >
          <TableHead>
            <TableRow>
              <TableCell numeric>
                <FormattedMessage id="summary.progress.tableHead.consultant" />
              </TableCell>
              <TableCell numeric>
                <FormattedMessage id="summary.progress.tableHead.allocated" />
              </TableCell>
              <TableCell numeric>
                <FormattedMessage id="summary.progress.tableHead.actual" />
              </TableCell>
              <TableCell numeric>
                <FormattedMessage id="summary.progress.tableHead.remaining" />
              </TableCell>
              <TableCell numeric>
                <FormattedMessage id="summary.progress.tableHead.progress" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              assignments.map(assignment =>
                <TableRow>
                  <TableCell>
                    {assignment.employee && assignment.employee.fullName}
                  </TableCell>
                  <TableCell numeric>
                    {assignment.allocatedHours}
                  </TableCell>
                  <TableCell numeric>
                    {assignment.actualHours}
                  </TableCell>
                  <TableCell numeric>
                    {assignment.remainHours}
                  </TableCell>
                  <TableCell numeric>
                    {`${assignment.progress} %`}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardContent>
    );
  };

  const RenderProgressProject = (projects: ISummaryProgressProject[]) => {
    return (
      projects.map(project =>
        <Grid item xs={12}>
          <Card
            square
            className= {!isMobile ? classNames(classes.reportPaperPartial) : classNames(classes.reportPaperPartialMobile)}
          >
            <CardHeader
              title={`${project.projectUid} - ${project.name}`}
            />
            <div
              className= {classNames(classes.reportContentScrollable)}
            >
              <CardContent>
                <Table
                  className= {classNames(classes.reportTable)}
                  padding= "dense"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalMax" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalAllocated" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalActual" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalRemaining" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalProgress" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalRates" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalExpense" />
                      </TableCell>
                      <TableCell 
                        numeric
                        className= {classNames(classes.cellWidthXXS)}
                      >
                        <FormattedMessage id="summary.progress.tableHead.totalCogs" />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                    <TableCell numeric>
                        {project.maxHours}
                      </TableCell>
                      <TableCell numeric>
                        {project.allocatedHours}
                      </TableCell>
                      <TableCell numeric>
                        {project.actualHours}
                      </TableCell>
                      <TableCell numeric>
                        {project.remainHours}
                      </TableCell>
                      <TableCell numeric>
                        {`${project.progress} %`}
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(project.actualRates)}
                      </TableCell>
                      <TableCell numeric>
                        <Button 
                          color= "primary"
                          onClick= {() => handleDialogOpen(isMobile, project.moduleCosts ? project.moduleCosts : [], project.projectUid)}
                        >
                          {intl.formatNumber(project.actualCosts)}
                        </Button>
                      </TableCell>
                      <TableCell numeric>
                        {intl.formatNumber(project.cogs)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              {
                project.assignments &&
                project.assignments.length > 0 &&
                RenderProgressAssignment(project.assignments)
                  
              }
            </div>
          </Card>
        </Grid>
      )
    );
  };

  const RenderProgress = (progress: ISummaryProgress) => {
    return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container spacing={16}>
            {
              progress.projects &&
              RenderProgressProject(progress.projects)
            }
            </Grid>
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
                        <FormattedMessage id="summary.progress.tableHead.value" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.totalValue}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.allCogs" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.totalCogs}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.profitValue" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.profit}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.profitPercent" />
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
          <Paper 
            square 
            elevation={1}
          >
            {/* <RenderFilter /> */}
          </Paper>
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
          RenderProgress(response.data)
        }
        </Grid>
      </Grid>
      {renderDialog}
    </React.Fragment>
  );

  return render;
};