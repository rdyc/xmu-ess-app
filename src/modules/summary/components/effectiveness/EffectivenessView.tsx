import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { isArray } from 'util';
import { EffectivenessFilter } from './EffectivenessFilter';

export const EffectivenessView: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;
  const { width, classes, handleChangeFilter, intl, handleReloadData } = props;

  const isMobile = isWidthDown('sm', width);

  const renderEffectiveness = (effectivenesses: ISummaryEffectiveness[]) => {

    return (
      effectivenesses.map(effectiveness => 
        effectiveness.assignments &&
        effectiveness.assignments.map((assignment, i) => 
          <TableRow key={i}>
            <TableCell>
              {effectiveness.employee.fullName}
            </TableCell>
            <TableCell>
              { assignment.position && assignment.position.name } &ndash;&nbsp;
              { assignment.role }
            </TableCell>
            <TableCell>
              { assignment.project && assignment.project.uid } &ndash;&nbsp;
              { assignment.project && assignment.project.name }
            </TableCell>
            <TableCell>
              { assignment.project && assignment.project.customer && assignment.project.customer.name }
            </TableCell>
            <TableCell numeric>
              { assignment.allocateHours }
            </TableCell>
            <TableCell numeric>
              { assignment.actualHours }
            </TableCell>
            <TableCell numeric>
              { assignment.remainHours }
            </TableCell>
            <TableCell numeric>
              { `${assignment.percentage} %` }
            </TableCell>
          </TableRow>
        )
      )
    );
  };
  
  const RenderList = () => (
    <Table
      className={classNames(classes.reportTable)}
      padding= "dense"
    >
      <TableHead>
        <TableRow>
          <TableCell 
            className={classNames(classes.cellWidthSm, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.name)}
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthMd, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.positionRole)}
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthMd, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.project)}
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthSm, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.customer)}
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.allocated)}
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.actual)}
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.remaining)}
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            {intl.formatMessage(summaryMessage.effectiveness.header.progress)}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          response &&
          isArray(response.data) && 
          renderEffectiveness(response.data)
        }
      </TableBody>
    </Table>
  );

  const render = (
    <React.Fragment>
      <Grid container spacing={8}>
        <Grid item xs={12}>  
          <EffectivenessFilter 
              className={props.classes.flex}
              isLoading={isLoading}
              onFilterChange={handleChangeFilter}
              onClickSync={handleReloadData}
          />
        </Grid>
        <Grid item xs={12}>     
          {
            !isLoading &&
            response &&
            <Paper 
              square 
              elevation={1}
              className={!isMobile ? classNames(classes.reportPaper) : classNames(classes.reportPaperMobile)}
            >
            <RenderList/>
            </Paper>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return render;
};