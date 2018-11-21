import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import { ItemFormProps } from '@mileage/components/request/editor/forms/MileageRequestItemForm';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { ITimesheetMileages } from '@timesheet/classes/response/ITimesheetMileages';
import * as React from 'react';
import { FormattedDate } from 'react-intl';

export const MileageRequestItemFormView: React.SFC<ItemFormProps> = props => {
  const { isLoading, response } = props.timesheetMileagesState;
  const { intl } = props;
  let { nolValue } = props;

  const renderFilter = (items: ITimesheetMileages[]) => {
    items.map(item => {
      if (item.value !== 0) {
        nolValue = true;
      }
    });

    return nolValue;
  };

  const renderItem = (items: ITimesheetMileages[]) => {
    const len = items.length - 1;

    return (
      <List>
        {items.map((item, i) => (
          <div key={i}>
            <ListItem>
              <Grid container spacing={24}>
                <Grid item xs={8} sm={8}>
                  <Typography noWrap color="primary" variant="body2">
                    {item.customer && item.customer.name}
                  </Typography>
                  <Typography noWrap variant="body1">
                    {item.projectUid} &bull; {item.project && item.project.name}
                  </Typography>
                  <Typography noWrap color="textSecondary" variant="caption">
                    <FormattedDate
                      year="numeric"
                      month="short"
                      day="numeric"
                      value={item.date}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography noWrap variant="body1" align="right">
                    {item.site && item.site.name}
                  </Typography>
                  <Typography
                    noWrap
                    color="secondary"
                    variant="caption"
                    align="right"
                  >
                    {item.value}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            {len !== i && <Divider />}
          </div>
        ))}
      </List>
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(mileageMessage.request.field.itemTitle)}
        subheader={intl.formatMessage(mileageMessage.request.field.itemSubHeader)}
      />
      <CardContent>
        <Grid>
          {!isLoading &&
            response &&
            response.data &&
            renderFilter(response.data) &&
            !nolValue && (
              <Typography variant="body2">
                {intl.formatMessage(mileageMessage.request.field.noData)}
              </Typography>
            )}
          {!isLoading &&
            (!response ||
              (response.data && response.data.length < 1) ||
              !nolValue) && (
              <Typography variant="body2">
                {intl.formatMessage(mileageMessage.request.field.noData)}
              </Typography>
            )}
          {!isLoading &&
            response &&
            response.data &&
            nolValue &&
            renderItem(response.data)}
        </Grid>
      </CardContent>
    </Card>
  );

  return render;
};
