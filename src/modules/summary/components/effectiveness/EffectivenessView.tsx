import { Grid, Paper, TableCell } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { EffectivenessProps } from '@summary/components/effectiveness/Effectiveness';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { AutoSizer, Column, Table as VirtualizedTable } from 'react-virtualized';
import { EffectivenessFilter } from './EffectivenessFilter';

export type IEffectiveness = {
  name: string;
  positionRole: string;
  project: string;
  customer: string;
  allocated: string;
  actual: string;
  remaining: string;
  progress: string;
};

export const EffectivenessView: React.SFC<EffectivenessProps> = props => {
  const { isLoading, response } = props.summaryState.effectiveness;
  const { width, classes, handleChangeFilter, handleReloadData, intl, isStartup } = props;

  const isMobile = isWidthDown('sm', width);

  const renderEffectiveness = (effectivenesses: ISummaryEffectiveness[]) => {
    const effectivenessVirtual: IEffectiveness[] = [];
    
    effectivenesses.map(effectiveness => 
      effectiveness.assignments && effectiveness.assignments.map((assignment, i) => 
      effectivenessVirtual.push({
        name: effectiveness.employee.fullName,
        positionRole: `${assignment.position && assignment.position.name } - ${assignment.role}`,
        project: `${assignment.project && assignment.project.uid } - ${ assignment.project && assignment.project.name}`,
        customer: `${ assignment.project && assignment.project.customer && assignment.project.customer.name }`,
        allocated: intl.formatNumber(assignment.allocateHours),
        actual: intl.formatNumber(assignment.actualHours),
        remaining: intl.formatNumber(assignment.remainHours),
        progress: `${intl.formatNumber(assignment.percentage)} %`,
      })
    ));

    const numericColumn = ['allocated', 'actual', 'remaining', 'progress'];

    const cellRenderer = (cellData: any, dataKey: string) => (
      <TableCell
        component="div"
        className={classNames(classes.virtualizedTableCell, classes.virtualizedFlexContainer)}
        variant="body"
        padding="dense"
        numeric={numericColumn.some(numeric => numeric === dataKey)}
        style={{ height: 56 }}
      >
        {cellData}
      </TableCell>
    );

    const headerRenderer = (header: any, dataKey: string) => (
      <TableCell
        component="div"
        className={classNames(classes.virtualizedTableCell, classes.virtualizedFlexContainer)}
        variant="head"
        padding="dense"
        numeric={numericColumn.some(numeric => numeric === dataKey)}
        style={{ height: 56 }}
      >
        {header}
      </TableCell>
    );
    
    return (
    <AutoSizer defaultWidth={1010}>
      {// tslint:disable-next-line:no-shadowed-variable
        ({height, width}) => (
        <VirtualizedTable
          className={classNames(classes.virtualizedTable)}
          width={width > 1010 ? width : 1010}
          height={height}
          headerHeight={56}
          rowHeight={56}
          rowClassName={classNames(classes.virtualizedTableRow, classes.virtualizedFlexContainer)}
          rowCount={effectivenessVirtual.length}
          rowGetter={({ index }) => effectivenessVirtual[index]}
        >
          <Column
            dataKey={'name'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.name)}
            width={120}
            flexGrow={1}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
           <Column
            dataKey={'positionRole'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.positionRole)}
            width={200}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
           <Column
            dataKey={'project'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.project)}
            width={160}
            flexGrow={1}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
           <Column
            dataKey={'customer'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.customer)}
            width={130}
            flexGrow={1}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
           <Column
            dataKey={'allocated'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.allocated)}
            width={100}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
           <Column
            dataKey={'actual'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.actual)}
            width={100}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
          <Column
            dataKey={'remaining'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.remaining)}
            width={100}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
          />
          <Column
            dataKey={'progress'}
            label={intl.formatMessage(summaryMessage.effectiveness.header.progress)}
            width={100}
            flexShrink={0}
            cellRenderer={({cellData, dataKey}) => cellRenderer(cellData, dataKey)}
            headerRenderer={({label, dataKey}) => headerRenderer(label, dataKey)}
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
                isStartup={isStartup}
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
            {response && Array.isArray(response.data) && renderEffectiveness(response.data)}
            </Paper>
          }
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return render;
};