import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { ISummaryBillable } from '@summary/classes/response/billable';
import { BillableListProps } from '@summary/components/billable/BillableList';
import DatePicker from 'material-ui-pickers/DatePicker';
// import { Column, Table } from 'react-virtualized';
// import { Moment } from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const BillableListView: React.SFC<BillableListProps> = props => {
  const { isLoading, response } = props.summaryState.billable;
  const { user } = props.userState;
  const { intl, handleChangeStart, _start, handleChangeEnd, _end } = props;

  // const renderBillableList = (billable: ISummaryBillable[]) => {
  //   return (
  //     <Table
  //       headerHeight={30}
  //       height={30}
  //       rowCount={50}
  //       rowHeight={30}
  //       width={30}
  //     >
  //       {billable.map(item => (
  //         <Column
  //           width={50}
  //           disableSort
  //           dataKey={item.employee && item.employee.fullName}
  //         />
  //       ))}
  //     </Table>
  //   );
  // };

  const inputDateEnd = () => (
    <DatePicker
      okLabel={intl.formatMessage({ id: 'global.action.ok' })}
      cancelLabel={intl.formatMessage({ id: 'global.action.cancel' })}
      clearLabel={intl.formatMessage({ id: 'global.action.clear' })}
      todayLabel={intl.formatMessage({ id: 'global.date.today' })}
      emptyLabel={intl.formatMessage({ id: 'global.date.empty' })}
      leftArrowIcon={<ChevronLeftIcon />}
      rightArrowIcon={<ChevronRightIcon />}
      format={'MMM DD, YYYY'}
      label={intl.formatMessage({ id: 'billable.field.start' })}
      showTodayButton
      value={_end}
      onChange={handleChangeEnd}
    />
  );

  const inputDateStart = () => (
    <DatePicker
      okLabel={intl.formatMessage({ id: 'global.action.ok' })}
      cancelLabel={intl.formatMessage({ id: 'global.action.cancel' })}
      clearLabel={intl.formatMessage({ id: 'global.action.clear' })}
      todayLabel={intl.formatMessage({ id: 'global.date.today' })}
      emptyLabel={intl.formatMessage({ id: 'global.date.empty' })}
      leftArrowIcon={<ChevronLeftIcon />}
      rightArrowIcon={<ChevronRightIcon />}
      format={'MMM DD, YYYY'}
      label={intl.formatMessage({ id: 'billable.field.start' })}
      showTodayButton
      value={_start}
      onChange={handleChangeStart}
    />
  );

  const renderFilter = () => {
    return (
      <Grid container spacing={16}>
        <Grid item xs>
          <TextField
            disabled
            margin="normal"
            label={<FormattedMessage id="billable.field.employee" />}
            value={user && user.company.uid}
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
      {isLoading && response && (
        <Typography variant="body2">loading</Typography>
      )}
      <Card square>
        <CardHeader
          title={<FormattedMessage id="billable.infoTitle" />}
          subheader={<FormattedMessage id="billable.infoSubTitle" />}
        />
        <CardContent>
          {renderFilter()}
          {/* {!isLoading && response && renderFilter()} */}
          {/* {!isLoading &&
            response &&
            response.data &&
            renderBillableList(response.data)} */}
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return render;
};
