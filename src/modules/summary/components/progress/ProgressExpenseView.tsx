import { GlobalFormat } from '@layout/types';
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
  WithStyles,
  WithTheme,
} from '@material-ui/core';
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
  & WithTheme
  & InjectedIntlProps;

export const ProgressExpenseView: React.SFC<AllProps> = props => {
  const { dialogOpen, handleDialogClose, expenses, classes, expenseProjectUid, intl } = props;
  const expenseFields = ['type', 'date', 'documentUid', 'requester'];

  return (
    <Dialog
      fullScreen
      className={props.theme.direction === 'rtl' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
      open={dialogOpen}
      aria-labelledby="progress-expense-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="progress-expense-dialog-title">
        {intl.formatMessage(summaryMessage.progress.dialog.title)}
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
                    key= {expenseField}
                    className= {classNames(classes.stickyHeader)}
                  >
                    {intl.formatMessage(summaryMessage.progress.headerFor(expenseField))}
                  </TableCell>
                )
              }
              <TableCell 
                numeric
                className= {classNames(classes.stickyHeader)}
              >
                {intl.formatMessage(summaryMessage.progress.header.amount)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              expenses.map(expense =>
                <TableRow key={expense.documentUid}>
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
          {intl.formatMessage(summaryMessage.progress.dialog.close)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};