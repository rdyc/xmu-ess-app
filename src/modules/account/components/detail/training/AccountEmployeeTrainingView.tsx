import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { AccountEmployeeTrainingHeaderTable } from '@account/classes/types';
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
import { AccountEmployeeTrainingProps } from './AccountEmployeeTraining';

export const AccountEmployeeTrainingView: React.SFC<
  AccountEmployeeTrainingProps
> = props => {
  const { classes, intl } = props;
  const { response, isLoading } = props.accountEmployeeTrainingState.list;

  const header = Object.keys(AccountEmployeeTrainingHeaderTable).map(key => ({
    id: key,
    name: AccountEmployeeTrainingHeaderTable[key]
  }));

  const renderTraining = (data: IEmployeeTraining[]) => {
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
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {intl.formatDate(item.start, GlobalFormat.Date)}
                    </TableCell>
                    <TableCell>
                      {item.end
                        ? intl.formatDate(item.end, GlobalFormat.Date)
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{item.organizer}</TableCell>
                    <TableCell>
                      {item.training && item.training.value}
                    </TableCell>
                    <TableCell>
                      {item.certification && item.certification.value}
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
      {response && response.data && response.data.length >= 1 && renderTraining(response.data)}
    </React.Fragment>
  );
};
