import { WorkflowStatusType } from '@common/classes/types';
import { GlobalFormat } from '@layout/types';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import { IMileageRequestItem } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  items: IMileageRequestItem[] | null | undefined;
}

type AllProps = OwnProps & InjectedIntlProps;

const mileageItem: React.SFC<AllProps> = props => {
  const { items, intl } = props;
  const len = items && items.length - 1;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(mileageMessage.request.item.title)}
        subheader={intl.formatMessage(mileageMessage.request.item.subHeader)}
      />
      <CardContent>
        <List>
          {items && items.length === 0 && (
            <ListItem>
              <ListItemText
                primary={intl.formatMessage(mileageMessage.request.item.empty)}
                primaryTypographyProps={{ align: 'center' }}
              />
            </ListItem>
          )}
          {items &&
            items.map((item, index) => (
              <div key={item.uid}>
                <ListItem disableGutters key={item.uid}>
                  <Grid container spacing={24}>
                    <Grid item xs={8} sm={8}>
                      <Typography noWrap color="primary" variant="body2">
                        {intl.formatDate(item.date, GlobalFormat.MonthYear)}
                      </Typography>
                      <Typography noWrap variant="body1">
                        {item.customer && item.customer.name}
                      </Typography>
                      <Typography
                        noWrap
                        color="textSecondary"
                        variant="caption"
                      >
                        {item.projectUid} &bull; {item.project && item.project.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography noWrap variant="body1" align="right">
                        {item.site && item.site.name}
                      </Typography>
                      <Typography
                        noWrap
                        color={
                          item.status &&
                          item.status.type === WorkflowStatusType.Rejected
                            ? 'error'
                            : 'secondary'
                        }
                        variant="body1"
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
        </List>
      </CardContent>
    </Card>
  );

  return render;
};

export const MileageItem = compose<AllProps, OwnProps>(injectIntl)(mileageItem);
