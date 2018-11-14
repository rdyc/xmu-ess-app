import {
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
    classes,
    start,
    end,
    size,
    orderBy,
    page,
    direction,
    open,
    handleChangeStart,
    handleChangeEnd,
    handleChangePage,
    handleChangeSize,
    handleGoToNext,
    handleGoToPrevious,
    handleChangeSort,
    handleChangeFind,
    handleDialog,
    handleDetail
  } = props;

  const _handlePage = (_page: any) => {
    return handleChangePage(_page);
  };

  const _handledialog = (uid: string, type: string) => {
    return handleDialog(), handleDetail(uid, type);
  };

  const renderBillableList = (billable: ISummaryBillable[]) => {
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
            {billable.map((item, index) => (
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
                    onClick={() => _handledialog(item.employee.uid, 'Non Presales')}
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
          {response && response.metadata && response.metadata.paginate && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={response.metadata.total}
                  rowsPerPage={size}
                  // rowsPerPageOptions={[5, 10, 15, 25]}
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

  const renderBillableDetail = (uid?: string, type?: string) => {
    return (
      <Dialog open={open} onClose={handleDialog} scroll="paper" fullWidth maxWidth="md">
        <div>
          {response &&
            response.data &&
            response.data.map(item =>
              item.employee.uid === uid ? (
                <div>
                  <DialogTitle>
                    {item.employee.fullName} &bull; {user && user.company.name}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <Table className={classes.minTableDialog}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Project</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Allocation Hours</TableCell>
                            <TableCell>Billable Hours</TableCell>
                            <TableCell>Billable (%)</TableCell>                            
                          </TableRow>
                        </TableHead>
                          {item.categories && item.categories.map(cat => (
                            cat.name === type ? (
                              cat.assignments && cat.assignments.map((asign, index) => (
                        <TableBody>
                                <TableCell>{asign.project && asign.project.customer && asign.project.customer.name} - {index}</TableCell>
                                <TableCell>{asign.projectUid} - {asign.project && asign.project.name}</TableCell>
                                <TableCell>{asign.position && asign.position.name}</TableCell>
                                <TableCell>{asign.allocatedHours}</TableCell>
                                <TableCell>{asign.actualHours}</TableCell>
                                <TableCell>{asign.actualPercentage} %</TableCell>
                                </TableBody>
                              ))
                            ) : null
                          ))}
                        
                      </Table>
                    </DialogContentText>
                  </DialogContent>
                </div>
              ) : null
            )}
        </div>

        <DialogActions>
          <Button onClick={handleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
      value={start}
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
      label={intl.formatMessage({ id: 'billable.field.end' })}
      showTodayButton
      disableFuture
      value={end}
      onChange={(moment: Moment) => handleChangeEnd(moment.toISOString(true))}
    />
  );

  const renderFilter = () => {
    return (
      <Grid container spacing={16}>
        <Grid item xs md>
          <TextField
            disabled
            margin="normal"
            label={<FormattedMessage id="billable.field.company" />}
            value={user && user.company.name}
          />
        </Grid>
        <Grid item xs md>
          <TextField
            margin="normal"
            label={<FormattedMessage id="billable.field.name" />}
            onChange={e => handleChangeFind(e.target.value)}
          />
        </Grid>
        <Grid item xs md>
          <TextField
            margin="normal"
            InputProps={{
              inputComponent: inputDateStart
            }}
          />
        </Grid>
        <Grid item xs md>
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
          {renderBillableDetail(props.uid, props.type)}
          <Typography noWrap align="left" variant="caption">
            Note: <br />
            *Total available Hours = 2080 Hour : <br />
            *Billable (%) = (Billable Hours / 2080) * 100%
          </Typography>
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
