import { Grid, Paper, TableCell } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { AutoSizer, Table as VirtualizedTable, Column } from 'react-virtualized';
import { isArray } from 'util';
import { EffectivenessFilter } from './EffectivenessFilter';

export type IEffectiveness = {
  fullName: string;
  position: string;
  project: string;
  customer: string;
  allocate: number;
  actual: number;
  remain: number;
  percentage: number;
};

export const EffectivenessViewVirtualized: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;
  const { width, classes, handleChangeFilter, intl, handleReloadData } = props;

  const isMobile = isWidthDown('sm', width);

  const renderEffectivenessVirtualized = (effectivenesses: ISummaryEffectiveness[]) => {
    const effectivenessVirtual: IEffectiveness[] = [];
    
    effectivenesses.map(effectiveness => 
      effectiveness.assignments && effectiveness.assignments.map((assignment, i) => 
      effectivenessVirtual.push({
        fullName: effectiveness.employee.fullName,
        position: `${assignment.position && assignment.position.name } - ${assignment.role}`,
        project: `${assignment.project && assignment.project.uid } - ${ assignment.project && assignment.project.name}`,
        customer: `${ assignment.project && assignment.project.customer && assignment.project.customer.name }`,
        allocate: assignment.allocateHours,
        actual: assignment.actualHours,
        remain: assignment.remainHours,
        percentage: assignment.percentage,
      })
    ));
    
    return (
    <AutoSizer>
      {// tslint:disable-next-line:no-shadowed-variable
        ({height, width}) => (
        <VirtualizedTable
          width={width}
          height={height}
          headerHeight={20}
          rowHeight={30}
          rowCount={effectivenessVirtual.length}
          rowGetter={({ index }) => effectivenessVirtual[index]}
        >
          <Column
            
          />
        </VirtualizedTable>
      )}
    </AutoSizer>
    );
  };

  const render = (
    <React.Fragment>
      <Grid container spacing={8}>
        <Grid item xs={12}>  
          <Paper
            square
            elevation={1}
          >
            <EffectivenessFilter 
                className={props.classes.flex}
                isLoading={isLoading}
                onClickSync={handleReloadData}
                onApply={handleChangeFilter}
            />
          </Paper>   
          {
            !isLoading &&
            response &&
            <Paper 
              square 
              elevation={1}
              className={!isMobile ? classNames(classes.reportPaper) : classNames(classes.reportPaperMobile)}
            >
            {/* <RenderList/> */}
            {response && isArray(response.data) && renderEffectivenessVirtualized(response.data)}
            </Paper>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return render;
};