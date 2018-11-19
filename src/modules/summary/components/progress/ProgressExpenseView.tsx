import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { ISummaryModuleCost } from '@summary/classes/response/progress';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps } from 'react-intl';

interface OwnProps {
  expenses: ISummaryModuleCost[];
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  expenseProjectUid: string;
  handleDialogClose: () => void;
}

type AllProps
  = OwnProps
  & WithStyles
  & InjectedIntlProps;

export const ProgressExpenseView: React.SFC<AllProps> = props => {
  const { dialogFullScreen, dialogOpen, handleDialogClose, expenses, classes, expenseProjectUid, intl } = props;
  const expenseFields = ['type', 'date', 'documentUid', 'requester'];

  return (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="progress-expense-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="progress-expense-dialog-title">
        <FormattedMessage id="summary.progress.dialog.title" />
        {expenseProjectUid}
      </DialogTitle>
      <DialogContent>
        <Table
          padding= "dense"
        >
          <TableHead>
            <TableRow>
              {
                expenseFields.map(expenseField =>
                  <TableCell
                    className= {classNames(classes.stickyHeader)}
                  >
                    <FormattedMessage id={`summary.progress.tableHead.${expenseField}`} />
                  </TableCell>
                )
              }
              <TableCell 
                numeric
                className= {classNames(classes.stickyHeader)}
              >
                <FormattedMessage id="summary.progress.tableHead.amount" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              expenses.map(expense =>
                <TableRow>
                  <TableCell>
                    {expense.module}
                  </TableCell>
                  <TableCell>
                    {intl.formatDate(expense.date, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    {expense.documentUid}
                  </TableCell>
                  <TableCell>
                    {expense.employee && expense.employee.fullName}
                  </TableCell>
                  <TableCell numeric>
                    {intl.formatNumber(expense.amount)}
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          <FormattedMessage id="summary.progress.dialog.close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};