import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withUser, WithUser } from '@layout/hoc/withUser';
import { GlobalFormat } from '@layout/types';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styles from '@styles';
import { ISummaryWinning } from '@summary/classes/response/winning';
import {
  WinningRatioHeaderDetailClosed,
  WinningRatioHeaderDetailOnProgress,
  WinningRatioHeaderDetailWin
} from '@summary/classes/types/winningRatio/WinningRatioHeaderDetail';
import { WinningRatioType } from '@summary/classes/types/winningRatio/WinningRatioType';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  uid?: string;
  type?: string;
  open: boolean;
  data: ISummaryWinning[] | null | undefined;
  handleDialog: () => void;
}

type AllProps = OwnProps & WithUser & WithLayout & InjectedIntlProps & WithStyles<typeof styles>;

const winningRatioDetail: React.SFC<AllProps> = props => {
  const { uid, type, open, data, handleDialog, intl, classes } = props;

  let header: any[] = [];

  if (type === WinningRatioType.Closed) {
    header = Object.keys(WinningRatioHeaderDetailClosed).map(key => ({
      id: key,
      name: WinningRatioHeaderDetailClosed[key]
    }));
  } else if (type === WinningRatioType.OnProgress) {
    header = Object.keys(WinningRatioHeaderDetailOnProgress).map(key => ({
      id: key,
      name: WinningRatioHeaderDetailOnProgress[key]
    }));
  } else {
    header = Object.keys(WinningRatioHeaderDetailWin).map(key => ({
      id: key,
      name: WinningRatioHeaderDetailWin[key]
    }));
  }

  const render = (
    <div>
      {data &&
        data.map((item, index) =>
          item.employeeUid === uid ? (
            <Dialog
              key={index}
              open={open}
              onClose={handleDialog}
              scroll="paper"
              className={props.layoutState.anchor === 'right' ? props.classes.contentShiftRight : props.classes.contentShiftLeft}
              fullScreen
            >
              <AppBar className={props.classes.appBarDialog}>
                <Toolbar>
                  <IconButton color="inherit" onClick={handleDialog} aria-label="Close">
                    <CloseIcon />
                  </IconButton>

                  <Typography variant="h6" color="inherit" className={props.classes.flex}>
                    {props.intl.formatMessage(summaryMessage.winningRatio.page.detail)}
                  </Typography>

                </Toolbar>
              </AppBar>
              <DialogTitle>
                {type}
              </DialogTitle>
              <DialogContent>
                <Table>
                  <TableHead>
                    <TableRow>
                      {header.map(headerItem => (
                        <TableCell padding="default" key={headerItem.id} className={classes.stickyHeader}>
                          {headerItem.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.categories &&
                      item.categories.map(cat =>
                        cat.name === type
                          ? cat.projects &&
                            cat.projects.map(project => (
                              <TableRow key={project.projectUid}>
                                <TableCell>
                                  {project.projectUid} - {project.name}
                                </TableCell>
                                <TableCell>
                                  {project.childProjectUid !== null ? (
                                    `${project.childProjectUid} - ${project.name}`
                                  ) : intl.formatMessage(summaryMessage.winningRatio.field.null)}
                                </TableCell>
                                <TableCell>
                                  {project.customer && project.customer.name}
                                </TableCell>
                                {type !== WinningRatioType.OnProgress ? (
                                  <TableCell>
                                    {intl.formatDate(project.date, GlobalFormat.Date)}
                                  </TableCell>
                                ) : null}
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

export const WinningRatioDetail = compose<AllProps, OwnProps>(
  injectIntl,
  withUser,
  withLayout,
  withStyles(styles)
)(winningRatioDetail);
