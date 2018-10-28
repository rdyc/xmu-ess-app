import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { IMileageRequestItem } from '@mileage/classes/response';
import * as React from 'react';
import {
  FormattedDate,
  FormattedMessage,
  InjectedIntlProps,
  injectIntl
} from 'react-intl';
import { compose } from 'recompose';
import { Field } from 'redux-form';

interface OwnProps {
  items: IMileageRequestItem[] | null | undefined;
  approval: boolean;
}

type AllProps = OwnProps & InjectedIntlProps;

const mileageItem: React.SFC<AllProps> = props => {
  const { items, intl, approval } = props;
  const len = items && items.length - 1;

  // debugger;
  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="mileage.request.itemsTitle" />}
        subheader={<FormattedMessage id="mileage.request.itemsSubTitle" />}
      />
      <CardContent>
        <List>
          {items &&
            items.length === 0 && (
              <ListItem>
                <ListItemText
                  primary={<FormattedMessage id="mileage.request.item.empty" />}
                  primaryTypographyProps={{ align: 'center' }}
                />
              </ListItem>
            )}
          {items && !approval &&
            items.map((item, index) => (
              <div key={item.uid}>
                <ListItem disableGutters key={item.uid}>
                  <Grid container spacing={24}>
                    <Grid item xs={8} sm={8}>
                      <Typography noWrap color="primary" variant="body2">
                        {item.customer && item.customer.name}
                      </Typography>
                      <Typography>APPROVAL {approval}</Typography>
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
                        color="secondary"
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
            ))}
            {items && approval && items.map((item, index) => (
              <div key={index}>
                <FormControlLabel 
                  label={item.uid}
                  control={
                    <Field 
                      type="checkbox"
                      name={`${item.uid}`}
                      component={
                        ({ input, meta }: any) => (
                          <Checkbox 
                            {...input}
                            value={item.uid}
                            disabled={meta.submitting}
                            onFocus={undefined}
                            onBlur={undefined}
                          />
                        )
                      }
                    />
                  }
                />
              </div>
            ))}
        </List>
      </CardContent>
    </Card>
  );

  return render;
};

export const MileageItem = compose<AllProps, OwnProps>(injectIntl)(mileageItem);
