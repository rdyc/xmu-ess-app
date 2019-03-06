import { GlobalFormat } from '@layout/types';
import {
  AppBar,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  WithStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ISummaryModuleCost } from '@summary/classes/response/profitability';
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

export const ProfitabilityExpenseView: React.SFC<AllProps> = props => {
  const { dialogOpen, handleDialogClose, expenses, classes, expenseProjectUid, intl } = props;
  const expenseFields = ['type', 'date', 'documentUid', 'requester'];

  return (
    <Dialog
      fullScreen
      className={props.classes.shift}
      open={dialogOpen}
      aria-labelledby="profitability-expense-dialog-title"
      fullWidth
      maxWidth="md"
    >
      <AppBar 
        elevation={0}
        position="fixed" 
        color="default"
        className={props.classes.appBarDialog}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleDialogClose} aria-label="Close">
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" color="inherit" className={props.classes.flex}>
            {props.intl.formatMessage(summaryMessage.profitability.dialog.title)}{expenseProjectUid}
          </Typography>

        </Toolbar>
      </AppBar>

      <Divider/>
      
      <DialogContent>
        <Table
          padding="dense"
        >
          <TableHead>
            <TableRow>
              {
                expenseFields.map(expenseField =>
                  <TableCell
                    key={expenseField}
                    className={classNames(classes.stickyHeader)}
                  >
                    {intl.formatMessage(summaryMessage.profitability.headerFor(expenseField))}
                  </TableCell>
                )
              }
              <TableCell
                numeric
                className={classNames(classes.stickyHeader)}
              >
                {intl.formatMessage(summaryMessage.profitability.header.amount)}
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
    </Dialog>
  );
};