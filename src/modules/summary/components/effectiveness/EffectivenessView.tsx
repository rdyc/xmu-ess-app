import {  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, } from 'react-intl';
import { isArray } from 'util';

export const EffectivenessView: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;
  const { width, classes } = props;

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
            <FormattedMessage id="summary.effectiveness.tableHead.name" />
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthMd, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.positionRole" />
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthMd, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.project" />
          </TableCell>
          <TableCell
            className={classNames(classes.cellWidthSm, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.customer" />
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.allocated" />
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.actual" />
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.remaining" />
          </TableCell>
          <TableCell 
            numeric
            className={classNames(classes.cellWidthXS, classes.stickyHeader)}
          >
            <FormattedMessage id="summary.effectiveness.tableHead.progress" />
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
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
          className={!isMobile ? classNames(classes.reportPaper) : classNames(classes.reportPaperMobile)}
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );

  return render;
};