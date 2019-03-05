import { Card, CardContent, CardHeader, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { ISummaryAssignmentTimesheet, ISummaryModuleCost, ISummaryProfitabilityProject } from '@summary/classes/response/profitability';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';

interface OwnProps {
  projects: ISummaryProfitabilityProject[];
  handleDialogOpen: (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => void;
}

type AllProps
  = OwnProps
  & WithStyles
  & WithWidth
  & InjectedIntlProps;

export const ProfitabilityProjectView: React.SFC<AllProps> = props => {
  const { projects, width, classes, intl, handleDialogOpen } = props;

  const isMobile = isWidthDown('sm', width);
  const assignmentFields = ['allocated', 'actual', 'remaining', 'progressAssignment', 'actualRate'];
  const projectFields = ['maxHours', 'allocatedHours', 'actualHours', 'remainHours', 'progress', 'actualRates', 'actualCosts', 'cogs'];

  const RenderProgressAssignment = (assignments: ISummaryAssignmentTimesheet[]) => {
    return (
      <CardContent>
        <Table
          padding="dense"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage(summaryMessage.profitability.header.consultant)}
              </TableCell>
              {
                assignmentFields.map(assignmentField =>
                  <TableCell numeric key={assignmentField}>
                    {intl.formatMessage(summaryMessage.profitability.headerFor(assignmentField))}
                  </TableCell>
                )
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              assignments.map(assignment =>
                <TableRow key={`${assignment.employeeUid}-${assignment.role}`}>
                  <TableCell>
                    {assignment.employee && assignment.employee.fullName}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(assignment.allocatedHours)}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(assignment.actualHours)}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(assignment.remainHours)}
                  </TableCell>
                  <TableCell numeric>
                    {`${intl.formatNumber(assignment.progress)} %`}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(assignment.actualRate)}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </CardContent>
    );
  };
  const RenderProfitabilityProject = (
    <Grid container spacing={16}>
      {
        projects.map(project =>
          <Grid item xs={12}>
            <Card
              square
              className={!isMobile ? classNames(classes.reportPaperPartial) : classNames(classes.reportPaperPartialMobile)}
            >
              <CardHeader
                title={`${project.projectUid} - ${project.name}`}
              />
              <div
                className={classNames(classes.reportContentScrollable)}
              >
                <CardContent>
                  <Table
                    className={classNames(classes.reportTable)}
                    padding="dense"
                  >
                    <TableHead>
                      <TableRow>
                        {
                          projectFields.map(projectField =>
                            <TableCell
                              numeric
                              key={projectField}
                              className={classNames(classes.cellWidthXXS)}
                            >
                              {intl.formatMessage(summaryMessage.profitability.headerFor(projectField))}
                            </TableCell>
                          )
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell numeric>
                          {intl.formatNumber(project.maxHours)}
                        </TableCell>
                        <TableCell numeric>
                          {intl.formatNumber(project.allocatedHours)}
                        </TableCell>
                        <TableCell numeric>
                          {intl.formatNumber(project.actualHours)}
                        </TableCell>
                        <TableCell numeric>
                          {intl.formatNumber(project.remainHours)}
                        </TableCell>
                        <TableCell numeric>
                          {`${intl.formatNumber(project.progress)} %`}
                        </TableCell>
                        <TableCell numeric>
                          {intl.formatNumber(project.actualRates)}
                        </TableCell>
                        <TableCell numeric>
                          {
                            project.moduleCosts &&
                            project.moduleCosts.length > 0 &&
                            <Chip
                              onClick={() => handleDialogOpen(isMobile, project.moduleCosts ? project.moduleCosts : [], project.projectUid)}
                              label={intl.formatNumber(project.actualCosts)}
                            /> ||
                            <Chip
                              variant={'outlined'}
                              label={intl.formatNumber(project.actualCosts)}
                            />
                          }
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
      }
    </Grid>
  );
  return RenderProfitabilityProject;
};