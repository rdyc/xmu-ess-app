import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withWidth
} from '@material-ui/core';
import { isWidthDown, WithWidth } from '@material-ui/core/withWidth';
import { ISummaryBillable } from '@summary/classes/response/billable';
import {
  BillableHeaderDetailNonPresales,
  BillableHeaderDetailPresales
} from '@summary/classes/types/billable/BillableHeaderDetail';
import { BillableType } from '@summary/classes/types/billable/BillableType';
import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  uid?: string;
  type?: string;
  open: boolean;
  data: ISummaryBillable[] | null | undefined;
  handleDialog: () => void;
}

type AllProps = OwnProps & WithUser & WithWidth;

const billableDetail: React.SFC<AllProps> = props => {
  const { uid, type, open, data, handleDialog, width } = props;
  const { user } = props.userState;

  const isMobile = isWidthDown('sm', width);

  const headerNonPresales = Object.keys(BillableHeaderDetailNonPresales).map(
    key => ({ id: key, name: BillableHeaderDetailNonPresales[key] })
  );

  const headerPresales = Object.keys(BillableHeaderDetailPresales).map(key => ({
    id: key,
    name: BillableHeaderDetailPresales[key]
  }));

  const render = (
    <div>
      {data &&
        data.map((item, index) =>
          item.employee.uid === uid ? (
            <Dialog
              key={index}
              open={open}
              onClose={handleDialog}
              scroll="paper"
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
            >
              <DialogTitle>
                {item.employee.fullName} &bull; {user && user.company.name}
              </DialogTitle>
              <DialogContent>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {type === BillableType.Presales
                          ? headerPresales.map(headerItem => (
                              <TableCell key={headerItem.id} padding="default">
                                {headerItem.name}
                              </TableCell>
                            ))
                          : headerNonPresales.map(headerItem => (
                              <TableCell key={headerItem.id} padding="default">
                                {headerItem.name}
                              </TableCell>
                            ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {item.categories &&
                      item.categories.map(cat =>
                        cat.name === type
                          ? cat.assignments &&
                            cat.assignments.map((asign) => (
                              <TableRow key={asign.projectUid}>
                                <TableCell>
                                  {asign.project &&
                                    asign.project.customer &&
                                    asign.project.customer.name}
                                </TableCell>
                                <TableCell>
                                  {asign.projectUid} &bull; {asign.project && asign.project.name}
                                </TableCell>
                                <TableCell>
                                  {asign.position && asign.position.name}
                                </TableCell>
                                <TableCell><FormattedNumber value={asign.allocatedHours} /></TableCell>
                                <TableCell><FormattedNumber value={asign.actualHours} /></TableCell>
                                <TableCell>
                                  <FormattedNumber value={asign.actualPercentage} /> %
                                </TableCell>
                              </TableRow>
                            ))
                          : null
                      )}
                    </TableBody>
                  </Table>
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

export const BillableDetail = compose<AllProps, OwnProps>(withUser, withWidth())(
  billableDetail
);
