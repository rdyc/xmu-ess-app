import { IBaseMetadata } from '@generic/interfaces';
import { GlobalFormat } from '@layout/types';
import { ILeaveCalculation } from '@lookup/classes/response';
import { LeaveCalculationHeaderList } from '@lookup/classes/types/leave/LeaveCalculationHeaderList';
import {
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
import * as React from 'react';
import { FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  // year: number;
  page: number;
  size: number;
  orderBy: string | undefined;
  direction: string | undefined;
  metadata: IBaseMetadata | undefined;
  data: ILeaveCalculation[] | null | undefined;
  handleChangeSort: (direction: boolean) => void;
  handleChangePage: (page: number) => void;
  handleGoToPrevious: () => void;
  handleGoToNext: () => void;
  handleChangeSize: (value: number) => void;
}

type AllProps = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

const leaveCalculationTableView: React.SFC<AllProps> = props => {
  const {
    classes,
    intl,
    data,
    page,
    size,
    orderBy,
    direction,
    metadata,
    handleChangePage,
    handleChangeSort,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSize
  } = props;

  const _handlePage = (_page: any) => {
    return handleChangePage(_page);
  };

  const header = Object.keys(LeaveCalculationHeaderList).map(key => ({id : key, name: LeaveCalculationHeaderList[key]}));

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
              <TableCell>{item.employee ? item.employee.fullName : 'N/A'}</TableCell>
              <TableCell>{item.employee ? intl.formatDate(item.employee.joinDate, GlobalFormat.Date) : 'N/A'}</TableCell>
              <TableCell numeric>
                <FormattedNumber value={Number(item.previousRemain)}/>
              </TableCell>
              <TableCell numeric>
              <FormattedNumber value={Number(item.quota)}/>
              </TableCell>
              <TableCell numeric>
              <FormattedNumber value={Number(item.annualLeave)}/>
              </TableCell>
              <TableCell numeric>
              <FormattedNumber value={Number(item.leaveTaken)}/>
              </TableCell>
              <TableCell numeric>
              <FormattedNumber value={Number(item.remain)}/>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {metadata && (
            <TablePagination
              rowsPerPageOptions={[10, 15, 25]}
              count={metadata.total}
              rowsPerPage={size}
              page={page - 1}
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
  );

  return render;
};

export const LeaveCalculationTableView = compose<AllProps, OwnProps>(injectIntl, withStyles(styles))(
  leaveCalculationTableView
);
