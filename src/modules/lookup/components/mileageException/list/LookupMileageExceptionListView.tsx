import { IMileageException } from '@lookup/classes/response';
import { LookupMileageExceptionListProps } from '@lookup/components/mileageException/list/LookupMileageExceptionList';
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core';
import * as React from 'react';
import { FormattedDate, FormattedNumber, FormattedPlural } from 'react-intl';
import { isArray } from 'util';

export const LookupMileageExceptionListView: React.SFC<
  LookupMileageExceptionListProps
> = props => {
  const { handleGoToDetail } = props;
  const { isLoading, response } = props.lookupMileageExceptionState.all;

  const renderMileageExceptionList = (mileageExcs: IMileageException[]) => {
    const len = mileageExcs.length - 1;

    return mileageExcs.map((mileageExc, i) => (
      <div key={mileageExc.uid}>
        <ListItem
          button={!isLoading}
          key={mileageExc.uid}
          onClick={() => handleGoToDetail(mileageExc.uid)}
        >
          <Grid container spacing={24}>
            <Grid item xs={8} sm={8}>
              <Typography noWrap color="primary" variant="body2">
                {mileageExc.role.name} &bull;{' '}
                {mileageExc.role.company && mileageExc.role.company.name}
              </Typography>
              <Typography noWrap variant="body1">
                {mileageExc.projectUid} &bull;{' '}
                {mileageExc.project && mileageExc.project.name}
              </Typography>
              <Typography noWrap color="textSecondary" variant="caption">
                {mileageExc.reason}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography noWrap variant="body1" align="right">
                <FormattedDate
                  year="numeric"
                  month="short"
                  day="numeric"
                  value={mileageExc.inactiveDate || ' '}
                />
              </Typography>
              <Typography noWrap variant="caption" align="right">
                {mileageExc.type && mileageExc.type.value}
              </Typography>
              <Typography noWrap variant="caption" align="right">
                {mileageExc.percentage}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
        {len !== i && <Divider />}
      </div>
    ));
  };

  const RenderList = () => (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          {response &&
            response.metadata &&
            response.metadata.paginate && (
              <Grid container spacing={24}>
                <Grid item xs={6} sm={6}>
                  <Typography variant="caption" color="primary">
                    <FormattedNumber value={response.metadata.total} /> &nbsp;
                    <FormattedPlural
                      one="Mileage Exception"
                      other="Mileage Exceptions"
                      value={response.metadata.total}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography variant="caption" align="right" color="primary">
                    <FormattedNumber
                      value={response.metadata.paginate.current}
                    />{' '}
                    of{' '}
                    <FormattedNumber value={response.metadata.paginate.total} />
                  </Typography>
                </Grid>
              </Grid>
            )}
        </ListSubheader>
      }
    >
      {response &&
        isArray(response.data) &&
        renderMileageExceptionList(response.data)}
    </List>
  );

  const render = (
    <React.Fragment>
      {isLoading &&
        response && <Typography variant="body2">loading</Typography>}
      {response && (
        <Paper square elevation={1}>
          <RenderList />
        </Paper>
      )}
    </React.Fragment>
  );

  return render;
};
