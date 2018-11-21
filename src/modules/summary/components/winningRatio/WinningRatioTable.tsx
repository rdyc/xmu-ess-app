import { IBaseMetadata } from '@generic/interfaces';
import {
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  withStyles,
  WithStyles
} from '@material-ui/core';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@material-ui/icons';
import styles from '@styles';
import { ISummaryWinning } from '@summary/classes/response/winning';
import { WinningRatioHeaderList } from '@summary/classes/types/winningRatio/WinningRatioHeaderList';
import { WinningRatioType } from '@summary/classes/types/winningRatio/WinningRatioType';
import * as React from 'react';
import { compose } from 'recompose';

interface OwnProps {
  page: number;
  size: number;
  orderBy: string | undefined;
  direction: string | undefined;
  metadata: IBaseMetadata | undefined;
  data: ISummaryWinning[] | null | undefined;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleDialog: () => void;
  handleDetail: (uid: string, type: string) => void;
  handleGoToPrevious: () => void;
  handleGoToNext: () => void;
  handleChangeSize: (value: number) => void;
}

type AllProps = OwnProps & WithStyles<typeof styles>;

const winningRatioTable: React.SFC<AllProps> = props => {
  const {
    classes,
    data,
    page,
    size,
    orderBy,
    direction,
    metadata,
    handleChangePage,
    handleChangeSort,
    handleDetail,
    handleDialog,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSize
  } = props;

  const _handlePage = (_page: any) => {
    return handleChangePage(_page);
  };

  const _handledialog = (uid: string, type: string) => {
    return handleDialog(), handleDetail(uid, type);
  };

  const header = Object.keys(WinningRatioHeaderList).map(key => ({
    id: key,
    name: WinningRatioHeaderList[key]
  }));

  const tablePaginationAction = (total: any) => (
    <div className={classes.tableReportAction}>
      <IconButton
        onClick={() => handleChangePage(1)}
        disabled={page === 1}
        aria-label="First Page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleGoToPrevious}
        disabled={page === 1}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleGoToNext}
        disabled={page >= Math.ceil(total / size)}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => _handlePage(Math.max(0, Math.ceil(total / size)))}
        disabled={page >= Math.ceil(total / size)}
        aria-label="Last Page"
      >
        <LastPage />
      </IconButton>
    </div>
  );

  const render = (
    <div className={classes.table}>
      <Table className={classes.minTable}>
        <TableHead>
          <TableRow>
            {header.map(item => (
              <TableCell
                key={item.id}
                numeric={item.id === 'fullName' ? false : true}
                padding="default"
                sortDirection={
                  orderBy === item.id
                    ? direction === 'ascending'
                      ? 'asc'
                      : 'desc'
                    : false
                }
              >
                {item.id === 'fullName' ? (
                  <Tooltip
                    title="Sort"
                    disableFocusListener
                  >
                    <TableSortLabel
                      active={orderBy === item.id}
                      direction={direction === 'ascending' ? 'asc' : 'desc'}
                      onClick={() =>
                        handleChangeSort(
                          direction === 'ascending' ? true : false
                        )
                      }
                    >
                      {item.name}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  item.name
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell numeric>{index + 1 + (page - 1) * size}</TableCell>
                <TableCell>{item.employee && item.employee.fullName}</TableCell>
                <TableCell numeric>{item.ratio} %</TableCell>
                <TableCell numeric>
                  <Tooltip title="Closed" disableFocusListener>
                    <Chip
                      label={item.categories.map(cat =>
                        cat.name === WinningRatioType.Closed ? cat.total : null
                      )}
                      onClick={() =>
                        _handledialog(item.employeeUid, WinningRatioType.Closed)
                      }
                    />
                  </Tooltip>
                </TableCell>
                <TableCell numeric>
                  <Tooltip title="On Progress" disableFocusListener>
                    <Chip
                      label={item.categories.map(cat =>
                        cat.name === WinningRatioType.OnProgress ? cat.total : null
                      )}
                      onClick={() =>
                        _handledialog(item.employeeUid, WinningRatioType.OnProgress)
                      }
                    />
                  </Tooltip>
                </TableCell>
                <TableCell numeric>
                  <Tooltip title="Win" disableFocusListener>
                    <Chip
                      label={item.categories.map(cat =>
                        cat.name === WinningRatioType.Winning ? cat.total : null
                      )}
                      onClick={() =>
                        _handledialog(item.employeeUid, WinningRatioType.Winning)
                      }
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            {metadata && (
              <TablePagination
                count={metadata.total}
                rowsPerPage={size}
                page={page - 1}
                onChangePage={_handlePage}
                onChangeRowsPerPage={e =>
                  handleChangeSize(Number(e.target.value))
                }
                ActionsComponent={() => tablePaginationAction(metadata.total)}
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );

  return render;
};

export const WinningRatioTable = compose<AllProps, OwnProps>(
  withStyles(styles)
)(winningRatioTable);
