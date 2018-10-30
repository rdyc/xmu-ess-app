import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

interface OwnProps {
  data: IPurchaseItemRequest[] | null | undefined;
}

export const PurchaseItemInformation: React.SFC<OwnProps> = props => {
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
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      primary={item.uid}
                      secondary={item.description ? <Typography noWrap variant="body2">{item.description}</Typography> : 'N/A'}
                    />
                    <Typography
                      variant="display1"
                      align="right"
                    >
                      <FormattedNumber
                        value={item.requestValue}
                      />
                    </Typography>
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