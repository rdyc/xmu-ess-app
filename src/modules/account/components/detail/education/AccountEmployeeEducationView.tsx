import { IEmployeeEducationList } from '@account/classes/response/employeeEducation';
import { AccountEmployeeEducationHeaderTable } from '@account/classes/types';
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
import { AccountEmployeeEducationProps } from './AccountEmployeeEducation';

export const AccountEmployeeEducationView: React.SFC<
  AccountEmployeeEducationProps
> = props => {
  const { classes } = props;
  const { response, isLoading } = props.accountEmployeeEducationState.list;

  const header = Object.keys(AccountEmployeeEducationHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeEducationHeaderTable[key]
  }));

  const renderEducation = (data: IEmployeeEducationList[]) => {
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
                    <TableCell>
                      {item.degree ? item.degree.value : 'N/A'}
                    </TableCell>
                    <TableCell>{item.institution}</TableCell>
                    <TableCell>{item.major}</TableCell>
                    <TableCell>{item.start}</TableCell>
                    <TableCell>{item.end ? item.end : 'N/A'}</TableCell>
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
      {response && response.data && response.data.length >= 1 && renderEducation(response.data)}
    </React.Fragment>
  );
};
