import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IPurchaseItem } from '@purchase/classes/response/purchaseSettlement';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

interface OwnProps {
  data: IPurchaseItem[] | null | undefined;
}

export const SettlementItemInformation: React.SFC<OwnProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="purchase.itemTitle" />}
        subheader={<FormattedMessage id="purchase.itemSubTitle" />}
      />
      <CardContent>
        <List>
          {
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="purchase.field.item.empty" />}
                primaryTypographyProps={{ align: 'center' }}
              />
            </ListItem>
          }
          {
            data &&
            data.map(item =>
              <ListItem disableGutters key={item.uid}>
                <Grid container xs={12}>
                  <Grid container item xs={12} spacing={8}>
                    <ListItemText
                      primary={item.uid}
                      secondary={item.description ? <Typography noWrap variant="body2">{item.description}</Typography> : 'N/A'}
                    />
                    <Grid xs={3}>
                      <ListItemText
                        primary={<FormattedMessage id="purchase.itemTitle.request" />}
                        />
                      <Typography
                      variant="display1"
                      align="left"
                    >
                      <FormattedNumber
                        value={item.requestValue}
                      />
                    </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <ListItemText
                        primary={<FormattedMessage id="purchase.itemTitle.actual" />}
                      />
                    <Typography
                      variant="display1"
                      align="left"
                    >
                      <FormattedNumber
                        value={item.actualValue}
                      />
                    </Typography>
                    </Grid>
                    <Grid xs={3}>
                      <ListItemText
                        primary={<FormattedMessage id="purchase.itemTitle.variance" />}
                      />
                    <Typography
                      variant="display1"
                      align="left"
                    >
                      <FormattedNumber
                        value={item.varianceValue}
                      />
                    </Typography>
                    </Grid>
                  </Grid>
                </Grid>

              </ListItem>
            )
          }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};