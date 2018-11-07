import { Paper, Typography } from '@material-ui/core';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { BillableListProps } from '@summary/components/billable/BillableList';
import * as React from 'react';
import { Column, Table } from 'react-virtualized';

export const BillableListView: React.SFC<BillableListProps> = props => {
  const { isLoading, response } = props.summaryState.billable;

  const renderBillableList = (billable: ISummaryBillable[]) => {
    return (
      <Table
        headerHeight={30}
        height={30}
        rowCount={50}
        rowHeight={30}
        width={30}
      >
        {billable.map(item => (
          <Column 
            width={50}
            disableSort
            dataKey={item.employee}
          />
        ))}
      </Table>
    );
  };

  const render = (
    <React.Fragment>
      {isLoading &&
        response && <Typography variant="body2">loading</Typography>}

      {!isLoading && response && response.data && (
        <Paper square elevation={1}>
          {renderBillableList(response.data)}
        </Paper>
      )}
    </React.Fragment>
  );

  return render;
};
