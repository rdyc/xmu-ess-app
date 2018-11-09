import {  Paper, Typography } from '@material-ui/core';
// import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import * as React from 'react';
// import { FormattedMessage, } from 'react-intl';
import { Column, Table } from 'react-virtualized';
// import { isArray } from 'util';

export const EffectivenessView: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;
  // const { hasFinishLoad, handleFinishLoad } = props;

  const effectivenesses: any[] = [];

  const loadData = () => {
    if (response && response.data) {
        response.data.map(effectiveness => {
        if (effectiveness.assignments) {
          effectiveness.assignments.map(assignment => {
            const _effectiveness: any = ({
              name: effectiveness.employee.fullName,
              positionRole: `${assignment.position && assignment.position.name} - ${assignment.role}`,
              project: `${assignment.project && assignment.project.uid} - ${assignment.project && assignment.project.uid}`,
              customer: assignment.project && assignment.project.customer && assignment.project.customer.name,
              allocated: assignment.allocateHours,
              actual: assignment.actualHours,
              remaining: assignment.remainHours,
              progress: assignment.percentage
            });
            effectivenesses.push(_effectiveness);
          });
        }
      });
    }
  };
  
  const RenderList = () => {
    return (
      // <AutoSizer>
      // {({ width, height }) => 
        <Table
          height={800}
          width={1000}
          rowHeight={20}
          rowCount={effectivenesses.length}
          headerHeight={30}
          rowGetter={({index}) => effectivenesses[index]}
        >
          <Column
            label="name"
            dataKey="name"
            width={60}
          />
          <Column
            label="positionRole"
            dataKey="positionRole"
            width={60}
          />
          <Column
            label="project"
            dataKey="project"
            width={60}
          />
          <Column
            label="customer"
            dataKey="customer"
            width={60}
          />
          <Column
            label="allocated"
            dataKey="allocated"
            width={60}
          />
          <Column
            label="actual"
            dataKey="actual"
            width={60}
          />
          <Column
            label="remaining"
            dataKey="remaining"
            width={60}
          />
          <Column
            label="progress"
            dataKey="progress"
            width={60}
          />
        </Table>
      // }
      // </AutoSizer>
    );
  };

  const render = (
    <React.Fragment>
      {isLoading && response && <Typography variant="body2">loading</Typography>}     
      {response &&
        <Paper 
          square 
          elevation={1}
        >
        {
          !isLoading &&
          loadData()
        }
        {
          !isLoading &&
          effectivenesses.length > 0 &&
          RenderList()
        }
        </Paper>}
    </React.Fragment>
  );

  return render;
};