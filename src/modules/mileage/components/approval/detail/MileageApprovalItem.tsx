import { WorkflowStatusType } from '@common/classes/types';
import { GlobalFormat } from '@layout/types';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import { IMileageRequestItem } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IMileageRequestItem[] | null | undefined;
  handleCheckbox: (ItemUid: string) => void;
  ItemUids: string[];
}

type AllProps = OwnProps & InjectedIntlProps;

const mileageApprovalItem: React.SFC<AllProps> = props => {
  const { intl, data, handleCheckbox, ItemUids } = props;

  const len = data && data.length - 1;

  const isChecked = (mileageItemUid: string) => {
    const _mileageItemUids = new Set(ItemUids);
    return _mileageItemUids.has(mileageItemUid);
  };

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(mileageMessage.request.field.itemTitle)}
        subheader={intl.formatMessage(
          mileageMessage.request.field.itemSubHeader
        )}
      />
      <CardContent>
        <List>
          {data &&
            data.map((item, index) => (
              <div key={item.uid}>
                <ListItem disableGutters key={item.uid}>
                  <Grid container spacing={24}>
                    <Grid item xs={2} sm={2}>
                      {item.status &&
                        item.status.type === WorkflowStatusType.Submitted && (
                          <Checkbox
                            key={item.uid}
                            onChange={() => handleCheckbox(item.uid)}
                            checked={isChecked(item.uid)}
                          />
                        )}
                    </Grid>
                    <Grid item xs={6} sm={6}>
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
                        {item.projectUid} &bull;
                        {item.project && item.project.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <Typography noWrap variant="body1" align="right">
                        {item.site && item.site.name}
                      </Typography>
                      {item.status &&
                        item.status.type !== WorkflowStatusType.Submitted && (
                          <Typography
                            noWrap
                            color={
                              item.status.type === WorkflowStatusType.Rejected
                                ? 'error'
                                : 'secondary'
                            }
                            variant="body1"
                            align="right"
                          >
                            {item.status && item.status.value}
                          </Typography>
                        )}
                      <Typography noWrap variant="body1" align="right">
                        {intl.formatNumber(Number(item.amount), GlobalFormat.CurrencyDefault)}
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

export const MileageApprovalItem = compose<AllProps, OwnProps>(injectIntl)(
  mileageApprovalItem
);
