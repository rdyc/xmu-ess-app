import { IEmployeeAccessList } from '@account/classes/response/employeeAccess';
import { AccountEmployeeMultiAccessHeaderTable } from '@account/classes/types';
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
import { AccountEmployeeMultiAccessProps } from './AccountEmployeeMultiAccess';

export const AccountEmployeeMultiAccessView: React.SFC<AccountEmployeeMultiAccessProps> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeAccessState.list;

  const header = Object.keys(AccountEmployeeMultiAccessHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeMultiAccessHeaderTable[key]
  }));

  const renderMultiAccess = (data: IEmployeeAccessList[]) => {
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
                    <TableCell>
                      {item.company && item.company.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.unit && item.unit.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.department && item.department.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.level && item.level.value || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.role && item.role.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.position && item.position.name || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.start && intl.formatDate(item.start, GlobalFormat.Date) || 'N/A'}
                    </TableCell>
                    <TableCell>
                      {item.end && intl.formatDate(item.end, GlobalFormat.Date) || 'N/A'}
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
      {response && response.data && response.data.length >= 1 && renderMultiAccess(response.data)}
    </React.Fragment>
  );
};
