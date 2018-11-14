import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { ISummaryBillable } from '@summary/classes/response/billable';
import * as React from 'react';
import { compose } from 'recompose';

interface OwnProps {
  uid?: string;
  type?: string;
  open: boolean;
  data: ISummaryBillable[] | null | undefined;
  handleDialog: () => void;
}

type AllProps = OwnProps & WithUser;

const billableDetail: React.SFC<AllProps> = props => {
  const { uid, type, open, data, handleDialog } = props;
  const { user } = props.userState;

  const header: string[] = [
    'Customer Name',
    'Project',
    'Position',
    'Allocation Hours',
    'Billable Hours',
    'Billable (%)'
  ];

  const render = (
    <div>
      {data &&
        data.map(item =>
          item.employee.uid === uid ? (
            <Dialog
              open={open}
              onClose={handleDialog}
              scroll="paper" fullWidth maxWidth="md" >
              <DialogTitle>
                {item.employee.fullName} &bull; {user && user.company.name}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {header.map(headerItem => (
                          <TableCell padding="default">{headerItem}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {item.categories &&
                      item.categories.map(cat =>
                        cat.name === type
                          ? cat.assignments &&
                            cat.assignments.map((asign, index) => (
                              <TableBody>
                                <TableCell>
                                  {asign.project &&
                                    asign.project.customer &&
                                    asign.project.customer.name}
                                </TableCell>
                                <TableCell>
                                  {asign.projectUid} - {asign.project && asign.project.name}
                                </TableCell>
                                <TableCell>
                                  {asign.position && asign.position.name}
                                </TableCell>
                                <TableCell>{asign.allocatedHours}</TableCell>
                                <TableCell>{asign.actualHours}</TableCell>
                                <TableCell>
                                  {asign.actualPercentage} %
                                </TableCell>
                              </TableBody>
                            ))
                          : null
                      )}
                  </Table>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialog} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          ) : null
        )}
    </div>
  );

  return render;
};

export const BillableDetail = compose<AllProps, OwnProps>(withUser)(
  billableDetail
);
