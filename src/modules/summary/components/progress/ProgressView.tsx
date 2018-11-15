import {  Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryAssignment, ISummaryProgress, ISummaryProgressProject } from '@summary/classes/response/progress';
import { ProgressProps } from '@summary/components/progress/Progress';
import { FilterForm } from '@summary/components/progress/sharedFilterForm/FilterForm';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const ProgressView: React.SFC<ProgressProps> = props => {
  const { classes, width, dialogFullScreen, dialogOpen, handleDialogClose, handleDialogOpen, expenses, expenseProjectUid, intl, handleChangeFilter } = props;
  const { isLoading, response } = props.summaryState.progress;  

  const isMobile = isWidthDown('sm', width);
  const expenseFields = ['type', 'date', 'documentUid', 'requester'];
  const assignmentFields = ['allocated', 'actual', 'remaining', 'progressAssignment'];
  const projectFields = ['maxHours', 'allocatedHours', 'actualHours', 'remainHours', 'progress', 'actualRates', 'actualCosts', 'cogs'];
  
  const renderExpense = (
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
              {
                expenseFields.map(expenseField =>
                  <TableCell
                    className= {classNames(classes.stickyHeader)}
                  >
                    <FormattedMessage id={`summary.progress.tableHead.${expenseField}`} />
                  </TableCell>
                )
              }
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
              {
                assignmentFields.map(assignmentField =>
                  <TableCell numeric>
                    <FormattedMessage id={`summary.progress.tableHead.${assignmentField}`} />
                  </TableCell>
                )
              }
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
                      {
                        projectFields.map(projectField => 
                          <TableCell 
                            numeric
                            className= {classNames(classes.cellWidthXXS)}
                          >
                            <FormattedMessage id={`summary.progress.tableHead.${projectField}`} />
                          </TableCell>
                        )
                      }
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
                          variant= "contained"
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
                        <FormattedMessage id="summary.progress.tableHead.totalValue" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.totalValue}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.totalCogs" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.totalCogs}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.profit" />
                      </TableCell>
                      <TableCell numeric>
                        {progress.profit}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head">
                        <FormattedMessage id="summary.progress.tableHead.percentage" />
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
      {renderExpense}
    </React.Fragment>
  );

  return render;
};