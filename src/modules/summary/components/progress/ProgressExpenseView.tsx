import { GlobalFormat } from '@layout/types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, WithStyles } from '@material-ui/core';
import { ISummaryModuleCost } from '@summary/classes/response/progress';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';

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
        {summaryMessage.progress.dialog.title}
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
                    {summaryMessage.progress.headerFor(expenseField)}
                  </TableCell>
                )
              }
              <TableCell 
                numeric
                className= {classNames(classes.stickyHeader)}
              >
                {summaryMessage.progress.header.amount}
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
                    {intl.formatDate(expense.date, GlobalFormat.Date)}
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
          {summaryMessage.progress.dialog.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
};