import {
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Typography
} from '@material-ui/core';
import { IMileageRequest } from '@mileage/classes/response';
import { MileageRequestListProps } from '@mileage/components/request/list/MileageRequestList';
import * as React from 'react';
import {
  FormattedMessage,
  FormattedNumber,
  FormattedPlural
} from 'react-intl';
import { isArray } from 'util';

export const MileageRequestListView: React.SFC<
  MileageRequestListProps
> = props => {
  const { handleGoToDetail, intl } = props;
  const { isLoading, response } = props.mileageRequestState.all;

  const renderMileageList = (mileages: IMileageRequest[]) => {
    const len = mileages.length - 1;

    return mileages.map((mileage, i) => (
      <div key={mileage.uid}>
        <ListItem
          button={!isLoading}
          key={mileage.uid}
          onClick={() => handleGoToDetail(mileage.uid)}
        >
          <Grid container spacing={24}>
            <Grid item xs={8} sm={8}>
              <Typography noWrap variant="body1">
                {intl.formatDate(new Date(mileage.year, mileage.month - 1), {
                  year: 'numeric',
                  month: 'long',
                })}
              </Typography>
              <Typography noWrap color="primary" variant="body1">
                {mileage.uid}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography noWrap align="right" variant="caption">
                {mileage.employee && mileage.employee.fullName}
              </Typography>
              <Typography
                noWrap
                align="right"
                variant="body1"
                color="secondary"
              >
                {mileage.status && mileage.status.value}
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
          {response && response.metadata && response.metadata.paginate && (
            <Grid container spacing={24}>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" color="primary">
                  <FormattedNumber value={response.metadata.total} /> &nbsp;
                  <FormattedPlural
                    one="mileage"
                    other="mileages"
                    value={response.metadata.total}
                  />
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography variant="caption" align="right" color="primary">
                  <FormattedNumber value={response.metadata.paginate.current} />{' '}
                  of{' '}
                  <FormattedNumber value={response.metadata.paginate.total} />
                </Typography>
              </Grid>
            </Grid>
          )}
        </ListSubheader>
      }
    >
      {response && isArray(response.data) && renderMileageList(response.data)}
    </List>
  );

  const render = (
    <React.Fragment>
      {isLoading && response && (
        <Typography variant="body2">loading</Typography>
      )}

      {response &&
        response.data &&
        (response.data.length >= 1 ? (
          <Paper square elevation={1}>
            <RenderList />
          </Paper>
        ) : (
          <Paper>
            <List>
              <ListItem>
                <Grid container spacing={24}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="body2" color="error">
                      <FormattedMessage id="mileage.request.noData" />
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Paper>
        ))}
    </React.Fragment>
  );

  return render;
};
