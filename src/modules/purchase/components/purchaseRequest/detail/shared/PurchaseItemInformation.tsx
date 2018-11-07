import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

interface OwnProps {
  data: IPurchaseItemRequest[] | null | undefined;
}

export const PurchaseItemInformation: React.SFC<OwnProps> = props => {
  const { data } = props;

  // let RenderItem = () => (
  //   { data &&
  //     data.map(item => 
  //       < Grid container key={item.uid}>
  //         <Grid item xs={6}>
  //           <ListItemText
  //             secondary={item.description}
  //             primary={<FormattedMessage id="purchase.itemTitle.description" />}
  //           />
  //         </Grid>
  //       </Grid >
  //       )
  //   }
  // );

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
                  <Grid item xs={5}>
                    <ListItemText
                      primary={<FormattedMessage id="purchase.itemTitle.request" />}
                      secondary={
                      <Typography
                        align="left"
                        noWrap
                      >
                      {item.description}
                      </Typography>
                      }
                    />
                  </Grid>
                  <Grid item xs={7}>
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