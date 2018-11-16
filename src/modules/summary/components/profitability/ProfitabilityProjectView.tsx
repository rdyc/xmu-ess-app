import { Button, Card, CardContent, CardHeader, Grid, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { ISummaryAssignmentTimesheet, ISummaryModuleCost, ISummaryProfitabilityProject } from '@summary/classes/response/profitability';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';

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
                <FormattedMessage id="summary.profitability.tableHead.consultant" />
              </TableCell>
              {
                assignmentFields.map(assignmentField =>
                  <TableCell>
                    <FormattedMessage id={`summary.profitability.tableHead.${assignmentField}`} />
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
                    {intl.formatNumber(assignment.allocatedHours)}
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
                              className={classNames(classes.cellWidthXXS)}
                            >
                              <FormattedMessage id={`summary.profitability.tableHead.${projectField}`} />
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
                            variant="contained"
                            onClick={() => handleDialogOpen(isMobile, project.moduleCosts ? project.moduleCosts : [], project.projectUid)}
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
      }
    </Grid>
  );
  return RenderProfitabilityProject;
};