import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { AccountEmployeeFamilyHeaderTable } from '@account/classes/types';
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
import { AccountEmployeeFamilyListProps } from './AccountEmployeeFamilyList';

export const AccountEmployeeFamilyListView: React.SFC<
  AccountEmployeeFamilyListProps
> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeFamilyState.list;

  const header = Object.keys(AccountEmployeeFamilyHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeFamilyHeaderTable[key]
  }));

  const renderFamily = (data: IEmployeeFamily[]) => {
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
                    <TableCell>{item.family && item.family.value}</TableCell>
                    <TableCell>{item.fullName}</TableCell>
                    <TableCell>{item.gender && item.gender.value}</TableCell>
                    <TableCell>{item.birthPlace}</TableCell>
                    <TableCell>
                      {item.birthDate
                        ? intl.formatDate(item.birthDate, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                    <TableCell></TableCell>>
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
      {response && response.data && response.data.length >= 1 && renderFamily(response.data)}
    </React.Fragment>
  );
};
