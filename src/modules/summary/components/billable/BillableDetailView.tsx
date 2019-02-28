import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogTitle,
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
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import { ISummaryBillable } from '@summary/classes/response/billable';
import {
  BillableHeaderDetailNonPresales,
  BillableHeaderDetailPresales,
} from '@summary/classes/types/billable/BillableHeaderDetail';
import { BillableType } from '@summary/classes/types/billable/BillableType';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  uid?: string;
  type?: string;
  isDetailOpen: boolean;
  data: ISummaryBillable[] | null | undefined;
  handleDialogDetail: () => void;
}

type AllProps = OwnProps & WithUser & WithLayout & InjectedIntlProps & WithStyles<typeof styles>;

const billableDetail: React.SFC<AllProps> = props => {
  const { uid, type, isDetailOpen, data, handleDialogDetail, classes } = props;
  const { user } = props.userState;

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
              open={isDetailOpen}
              onClose={handleDialogDetail}
              scroll="paper"
              className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
              fullScreen
              disableBackdropClick
            >
              <AppBar 
                elevation={0}
                position="fixed" 
                color="default"
                className={props.classes.appBarDialog}
              >
                <Toolbar>
                  <IconButton color="inherit" onClick={handleDialogDetail} aria-label="Close">
                    <CloseIcon />
                  </IconButton>

                  <Typography variant="h6" color="inherit" className={props.classes.flex}>
                    {props.intl.formatMessage(summaryMessage.billable.page.detail, {type: props.type === BillableType.NonPresales ? BillableType.Billable : BillableType.Presales})}
                  </Typography>

                </Toolbar>
              </AppBar>

              <Divider/>

              <DialogTitle>
                {item.employee.fullName} &bull; {user && user.company.name}
              </DialogTitle>

              <DialogContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      {type === BillableType.Presales
                        ? headerPresales.map(headerItem => (
                            <TableCell key={headerItem.id} padding="default" className={classes.stickyHeader}>
                              {headerItem.name}
                            </TableCell>
                          ))
                        : headerNonPresales.map(headerItem => (
                            <TableCell key={headerItem.id} padding="default" className={classes.stickyHeader}>
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
                              <TableCell><FormattedNumber value={Number(asign.allocatedHours.toFixed(2))} /></TableCell>
                              <TableCell><FormattedNumber value={Number(asign.actualHours.toFixed(2))} /></TableCell>
                              <TableCell>
                                <FormattedNumber value={Number(asign.actualPercentage.toFixed(2))} /> %
                              </TableCell>
                            </TableRow>
                          ))
                        : null
                    )}
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          ) : null
        )}
    </div>
  );

  return render;
};

export const BillableDetail = compose<AllProps, OwnProps>(
  withUser, 
  withLayout,  
  injectIntl,
  withStyles(styles)
)(billableDetail);
