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
import { ISummaryBillable } from '@summary/classes/response/billable';
import * as React from 'react';
import { compose } from 'recompose';

interface OwnProps {
  page: number;
  size: number;
  orderBy: string | undefined;
  direction: string | undefined;
  metadata: IBaseMetadata | undefined;
  data: ISummaryBillable[] | null | undefined;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleDialog: () => void;
  handleDetail: (uid: string, type: string) => void;
  handleGoToPrevious: () => void;
  handleGoToNext: () => void;
  handleChangeSize: (value: number) => void;
}

type AllProps = OwnProps & WithStyles<typeof styles>;

const billableTableView: React.SFC<AllProps> = props => {
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

  const header: any[] = [
    {
      id: 'fullName',
      numeric: false,
      disablePadding: false,
      label: 'Employee Name'
    },
    {
      id: 'hours',
      numeric: true,
      disablePadding: false,
      label: 'Billable Hours'
    },
    {
      id: 'percentage',
      numeric: true,
      disablePadding: false,
      label: 'Billable (%)'
    },
    {
      id: 'presalesHours',
      numeric: true,
      disablePadding: false,
      label: 'Presales Billable Hours'
    },
    {
      id: 'presalesPercentage',
      numeric: true,
      disablePadding: false,
      label: 'Presales Billable (%)'
    }
  ];

  const tablePaginationAction = (total: any) => (
    <div className={classes.tableReportAction}>
      <IconButton
        onClick={() => _handlePage(0)}
        disabled={page === 0}
        aria-label="First Page"
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleGoToPrevious}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleGoToNext}
        disabled={page >= Math.ceil(total / size) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => _handlePage(Math.max(0, Math.ceil(total / size) - 1))}
        disabled={page >= Math.ceil(total / size) - 1}
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
            <TableCell numeric>No</TableCell>
            {header.map(item => (
              <TableCell
                key={item.id}
                numeric={item.numeric}
                padding={item.disablePadding ? 'none' : 'default'}
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
                    placement={item.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
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
                      {item.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  item.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell numeric>{index + 1 + page * size}</TableCell>
                <TableCell>{item.employee.fullName}</TableCell>
                <TableCell numeric>
                  <Chip
                    label={
                      item.categories &&
                      item.categories.map(cat =>
                        cat.name === 'Presales'
                          ? null
                          : Math.round(cat.billable.hours)
                      )
                    }
                    onClick={() =>
                      _handledialog(item.employee.uid, 'Non Presales')
                    }
                  />
                </TableCell>
                <TableCell numeric>
                  {item.categories &&
                    item.categories.map(cat =>
                      cat.name === 'Presales' ? null : cat.billable.percentage
                    )}
                </TableCell>
                <TableCell numeric>
                  <Chip
                    label={
                      item.categories &&
                      item.categories.map(cat =>
                        cat.name === 'Presales'
                          ? Math.round(cat.billable.hours)
                          : null
                      )
                    }
                    onClick={() => _handledialog(item.employee.uid, 'Presales')}
                  />
                </TableCell>
                <TableCell numeric>
                  {item.categories &&
                    item.categories.map(cat =>
                      cat.name === 'Presales' ? cat.billable.percentage : null
                    )}
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
                // rowsPerPageOptions={[5, 10, 15, 25]}
                page={page}
                onChangePage={_handlePage}
                onChangeRowsPerPage={e =>
                  handleChangeSize(Number(e.target.value))
                }
                ActionsComponent={() =>
                  tablePaginationAction(metadata.total)
                }
              />
            )}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );

  return render;
};

export const BillableTableView = compose<AllProps, OwnProps>(withStyles(styles))(
  billableTableView
);
