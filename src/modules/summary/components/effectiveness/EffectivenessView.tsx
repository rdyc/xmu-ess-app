import {  Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import * as React from 'react';
import { FormattedMessage, } from 'react-intl';
import { isArray } from 'util';

export const EffectivenessView: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;

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
              { assignment.project && assignment.project.uid }
            </TableCell>
            <TableCell>
              { assignment.project && assignment.project.customer && assignment.project.customer.name }
            </TableCell>
            <TableCell>
              { assignment.allocateHours }
            </TableCell>
            <TableCell>
              { assignment.actualHours }
            </TableCell>
            <TableCell>
              { assignment.remainHours }
            </TableCell>
            <TableCell>
              { assignment.percentage }
            </TableCell>
          </TableRow>
        )
      )
    );
  };
  
  const RenderList = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <FormattedMessage id="summary.effectiveness.tableHead.name" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="summary.effectiveness.tableHead.positionRole" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="summary.effectiveness.tableHead.project" />
          </TableCell>
          <TableCell>
            <FormattedMessage id="summary.effectiveness.tableHead.customer" />
          </TableCell>
          <TableCell numeric>
            <FormattedMessage id="summary.effectiveness.tableHead.allocated" />
          </TableCell>
          <TableCell numeric>
            <FormattedMessage id="summary.effectiveness.tableHead.actual" />
          </TableCell>
          <TableCell numeric>
            <FormattedMessage id="summary.effectiveness.tableHead.remaining" />
          </TableCell>
          <TableCell numeric>
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
        >
        <RenderList/>
        </Paper>}
    </React.Fragment>
  );

  return render;
};