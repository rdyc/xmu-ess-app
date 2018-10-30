import { WorkflowStatusType } from '@common/classes/types';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import { ItemFormProps } from '@mileage/components/approval/detail/forms/MileageItem';
import * as React from 'react';
import { FormattedDate } from 'react-intl';
import { Field } from 'redux-form';

export const MileageItemView: React.SFC<ItemFormProps> = props => {
  const { isLoading, response } = props.mileageApprovalState.detail;
  const { intl } = props;
  // const mileageUid = props.mileageApprovalState.detail.response && props.mileageApprovalState.detail.response.data && props.mileageApprovalState.detail.response.data.uid;

  const len =
    response &&
    response.data &&
    response.data.items &&
    response.data.items.length - 1;
    
  // debugger;

  const render = (
    <List>
      {!isLoading &&
        response &&
        response.data &&
        response.data.items &&
        response.data.items.map(
          (item, index) =>
            (item.status &&
              item.status.type === WorkflowStatusType.Submitted && (
                <FormControlLabel
                  label={
                    <div key={index}>
                      <ListItem key={item.uid}>
                        <Grid container spacing={24}>
                          {/* <Grid item xs={12} sm={8} /> */}
                          {/* <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra nisl ex. Nunc nec est vel erat aliquam efficitur. 
                          </Typography> */}
                          <Grid item xs={8} sm={8}>
                            <Typography noWrap variant="body2">
                              {item.projectUid} &bull;{' '}
                              {item.project && item.project.name}
                            </Typography>
                            <Typography noWrap color="primary" variant="body1">
                              {item.customer && item.customer.name}
                            </Typography>
                            <Typography
                              noWrap
                              color="textSecondary"
                              variant="caption"
                            >
                              <FormattedDate
                                year="numeric"
                                month="short"
                                day="numeric"
                                value={item.date}
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={3} sm={3}>
                            <Typography noWrap variant="body1" align="right">
                              {item.site && item.site.name}
                            </Typography>
                            <Typography noWrap variant="body1" align="right">
                              {intl.formatNumber(Number(item.amount))}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      {len !== index && <Divider />}
                    </div>
                  }
                  control={
                    <Field
                      type="checkbox"
                      name={`items[${index}].${item.uid}`}
                      // name={`${mileageUid}[${index}]`}
                      component={({ input, meta }: any) => (
                        <Checkbox
                          {...input}
                          value={item.uid}
                          disabled={meta.submitting}
                          onFocus={undefined}
                          onBlur={undefined}
                        />
                      )}
                    />
                  }
                />
              )) ||
            (item.status &&
              item.status.type !== WorkflowStatusType.Submitted && (
                <div>
                  <ListItem disableGutters key={item.uid}>
                    <Grid container spacing={24}>
                      <Grid item xs={8} sm={8}>
                        <Typography noWrap color="primary" variant="body2">
                          {item.customer && item.customer.name}
                        </Typography>
                        <Typography noWrap variant="body1">
                          {item.projectUid} &bull;{' '}
                          {item.project && item.project.name}
                        </Typography>
                        <Typography
                          noWrap
                          color="textSecondary"
                          variant="caption"
                        >
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
                          color={
                            item.status.type === WorkflowStatusType.Approved
                              ? 'secondary'
                              : 'error'
                          }
                          variant="caption"
                          align="right"
                        >
                          {item.status && item.status.value}
                        </Typography>
                        <Typography noWrap variant="body1" align="right">
                          {intl.formatNumber(Number(item.amount))}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {len !== index && <Divider />}
                </div>
              ))
        )}
    </List>
  );

  return render;
};
