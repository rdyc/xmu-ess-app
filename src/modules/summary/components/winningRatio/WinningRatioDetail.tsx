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
import { ISummaryWinning } from '@summary/classes/response/winning';
import {
  WinningRatioHeaderDetailClosed,
  WinningRatioHeaderDetailOnProgress,
  WinningRatioHeaderDetailWin
} from '@summary/classes/types/winningRatio/WinningRatioHeaderDetail';
import { WinningRatioType } from '@summary/classes/types/winningRatio/WinningRatioType';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  uid?: string;
  type?: string;
  open: boolean;
  data: ISummaryWinning[] | null | undefined;
  handleDialog: () => void;
}

type AllProps = OwnProps;

const winningRatioDetail: React.SFC<AllProps> = props => {
  const { uid, type, open, data, handleDialog } = props;

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
        data.map(item =>
          item.employeeUid === uid ? (
            <Dialog
              open={open}
              onClose={handleDialog}
              scroll="paper"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <FormattedMessage id="summary.winningRatio.detail.title" /> &bull; {type}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {header.map(headerItem => (
                          <TableCell padding="default">
                            {headerItem.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    {item.categories &&
                      item.categories.map(cat =>
                        cat.name === type
                          ? cat.projects &&
                            cat.projects.map((project, index) => (
                              <TableBody>
                                <TableCell>
                                  {project.projectUid} &bull; {project.name}
                                </TableCell>
                                <TableCell>
                                  {project.childProjectUid !== null ? project.childProjectUid : <FormattedMessage id ="summary.winningRatio.detail.projectNull"/> }
                                </TableCell>
                                <TableCell>
                                  {project.customer && project.customer.name}
                                </TableCell>
                                {type !== WinningRatioType.OnProgress ? <TableCell>{project.date}</TableCell> : null}
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

export const WinningRatioDetail = compose<AllProps, OwnProps>()(
  winningRatioDetail
);
