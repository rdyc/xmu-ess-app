import { IEmployeeAccessHistoryList } from '@account/classes/response/employeeAccessHistory';
import { AccountEmployeeHistoryHeaderTable } from '@account/classes/types';
import { GlobalFormat } from '@layout/types';
import {
  Fade,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import * as React from 'react';
import { AccountEmployeeAccessHistoryProps } from './AccountEmployeeAccessHistory';

export const AccountEmployeeAccessHistoryView: React.SFC<
  AccountEmployeeAccessHistoryProps
> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeAccessHistoryState.list;

  const header = Object.keys(AccountEmployeeHistoryHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeHistoryHeaderTable[key]
  }));

  const renderAccessHistory = (data: IEmployeeAccessHistoryList[]) => {
    return (
      <Fade in={!isLoading} timeout={1000} mountOnEnter unmountOnExit>
        <Paper className={classes.table}>
          <Table className={classes.minTable}>
            <TableHead>
              <TableRow>
                {header.map(headerIdx => (
                  <TableCell
                    key={headerIdx.id}
                    numeric={headerIdx.id === 'No' ? true : false}
                    padding="default"
                  >
                    {headerIdx.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.company && item.company.name}</TableCell>
                    <TableCell>{item.unit ? item.unit.value : 'N/A'}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      {item.level ? item.level.value : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.position ? item.position.name : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {intl.formatDate(item.start, GlobalFormat.Date)}
                    </TableCell>
                    <TableCell>
                      {item.end
                        ? intl.formatDate(item.end, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Fade>
    );
  };

  return (
    <React.Fragment>
      {((response && !response.data) ||
        (response && response.data && response.data.length === 0)) && (
        <Typography>No Data</Typography>
      )}
      {response && response.data && response.data.length >= 1 && renderAccessHistory(response.data)}
    </React.Fragment>
  );
};
