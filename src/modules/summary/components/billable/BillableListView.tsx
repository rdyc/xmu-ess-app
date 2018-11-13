import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage
} from '@material-ui/icons';
// import { BillableField } from '@summary/classes/types';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { BillableListProps } from '@summary/components/billable/BillableList';
import DatePicker from 'material-ui-pickers/DatePicker';
import { Moment } from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const BillableListView: React.SFC<BillableListProps> = props => {
  const { isLoading, response } = props.summaryState.billable;
  const { user } = props.userState;
  const {
    intl,
    _start,
    _end,
    size,
    // orderBy,
    // direction,
    page,
    handleChangeStart,
    handleChangeEnd,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    classes
  } = props;

  const _handlePage = (_page: any) => {
    return handleChangePage(_page);
  };

  const renderBillableList = (billable: ISummaryBillable[]) => {
    const header: any[] = [
      // { id: 'no', numeric: true, disablePadding: false, label: 'No' },
      {
        id: 'name',
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

    return (
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
                  // sortDirection={}
                >
                  <Tooltip
                    title="sort"
                    placement={item.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                    // active={}
                    // direction={}
                    // onClick={}
                    >
                      {item.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {billable.map((item, index) => (
              <TableRow key={index}>
                <TableCell numeric>{index + 1 + page * size}</TableCell>
                <TableCell>{item.employee.fullName}</TableCell>
                <TableCell numeric>
                  {item.categories &&
                    item.categories.map(cat =>
                      cat.name === 'Presales'
                        ? null
                        : Math.round(cat.billable.hours)
                    )}
                </TableCell>
                <TableCell numeric>
                  {item.categories &&
                    item.categories.map(cat =>
                      cat.name === 'Presales' ? null : cat.billable.percentage
                    )}
                </TableCell>
                <TableCell numeric>
                  {item.categories &&
                    item.categories.map(cat =>
                      cat.name === 'Presales'
                        ? Math.round(cat.billable.hours)
                        : null
                    )}
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
          {response && response.metadata && response.metadata.paginate && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={response.metadata.total}
                  rowsPerPage={size}
                  page={page}
                  onChangePage={_handlePage}
                  onChangeRowsPerPage={e =>
                    handleChangeSize(Number(e.target.value))
                  }
                  ActionsComponent={() =>
                    tablePaginationAction(response.metadata.total)
                  }
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    );
  };

  const tablePaginationAction = (metadata: any) => (
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
        disabled={page >= Math.ceil(metadata / size) - 1}
        aria-label="Next Page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={() => _handlePage(Math.max(0, Math.ceil(metadata / size) - 1))}
        disabled={page >= Math.ceil(metadata / size) - 1}
        aria-label="Last Page"
      >
        <LastPage />
      </IconButton>
    </div>
  );

  const inputDateStart = () => (
    <DatePicker
      okLabel={intl.formatMessage({ id: 'global.action.ok' })}
      cancelLabel={intl.formatMessage({ id: 'global.action.cancel' })}
      clearLabel={intl.formatMessage({ id: 'global.action.clear' })}
      todayLabel={intl.formatMessage({ id: 'global.date.today' })}
      emptyLabel={intl.formatMessage({ id: 'global.date.empty' })}
      leftArrowIcon={<ChevronLeft />}
      rightArrowIcon={<ChevronRight />}
      format={'MMM DD, YYYY'}
      label={intl.formatMessage({ id: 'billable.field.start' })}
      showTodayButton
      value={_start}
      onChange={(moment: Moment) => handleChangeStart(moment.toISOString(true))}
    />
  );

  const inputDateEnd = () => (
    <DatePicker
      okLabel={intl.formatMessage({ id: 'global.action.ok' })}
      cancelLabel={intl.formatMessage({ id: 'global.action.cancel' })}
      clearLabel={intl.formatMessage({ id: 'global.action.clear' })}
      todayLabel={intl.formatMessage({ id: 'global.date.today' })}
      emptyLabel={intl.formatMessage({ id: 'global.date.empty' })}
      leftArrowIcon={<ChevronLeft />}
      rightArrowIcon={<ChevronRight />}
      format={'MMM DD, YYYY'}
      label={intl.formatMessage({ id: 'billable.field.start' })}
      showTodayButton
      disableFuture
      value={_end}
      onChange={(moment: Moment) => handleChangeEnd(moment.toISOString(true))}
    />
  );

  const renderFilter = () => {
    return (
      <Grid container spacing={16}>
        <Grid item xs>
          <TextField
            disabled
            margin="normal"
            label={<FormattedMessage id="billable.field.company" />}
            value={user && user.company.name}
          />
        </Grid>
        <Grid item xs>
          <TextField
            margin="normal"
            label={<FormattedMessage id="billable.field.name" />}
          />
        </Grid>
        <Grid item xs>
          <TextField
            margin="normal"
            InputProps={{
              inputComponent: inputDateStart
            }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            margin="normal"
            InputProps={{
              inputComponent: inputDateEnd
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const render = (
    <React.Fragment>
      <Card square>
        <CardContent>
          {renderFilter()}
          {isLoading && !response && (
            <Typography variant="body2">loading</Typography>
          )}
          {!isLoading &&
            response &&
            response.data &&
            renderBillableList(response.data)}
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return render;
};
