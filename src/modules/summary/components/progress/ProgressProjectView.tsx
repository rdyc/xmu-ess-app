import { Card, CardContent, CardHeader, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { ISummaryAssignment, ISummaryModuleCost, ISummaryProgressProject } from '@summary/classes/response/progress';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';

interface OwnProps {
  projects: ISummaryProgressProject[];
  handleDialogOpen: (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => void;
}

type AllProps
  = OwnProps
  & WithStyles
  & WithWidth
  & InjectedIntlProps;

export const ProgressProjectView: React.SFC<AllProps> = props => {
  const { projects, width, classes, intl, handleDialogOpen } = props;
  
  const isMobile = isWidthDown('sm', width);
  const assignmentFields = ['allocated', 'actual', 'remaining', 'progressAssignment'];
  const projectFields = ['maxHours', 'allocatedHours', 'actualHours', 'remainHours', 'progress', 'actualRates', 'actualCosts', 'cogs'];
  
  const RenderProgressAssignment = (assignments: ISummaryAssignment[]) => {
    return (
      <CardContent>
        <Table padding= "dense">
          <TableHead>
            <TableRow>
              <TableCell numeric>
                {intl.formatMessage(summaryMessage.progress.header.consultant)}
              </TableCell>
              {
                assignmentFields.map(assignmentField =>
                  <TableCell numeric key={assignmentField}>
                    {intl.formatMessage(summaryMessage.progress.headerFor(assignmentField))}
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

  const RenderProgressProject = (
    <Grid container spacing={16}>
    {
      projects.map(project =>
        <Grid item xs={12} key={project.projectUid} >
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
                            key= {projectField}
                            className= {classNames(classes.cellWidthXXS)}
                          >
                            {intl.formatMessage(summaryMessage.progress.headerFor(projectField))}
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
                        <Chip 
                          onClick= {() => handleDialogOpen(isMobile, project.moduleCosts ? project.moduleCosts : [], project.projectUid)}
                          label= {intl.formatNumber(project.actualCosts)}
                        />
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

  return RenderProgressProject;
};