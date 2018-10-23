import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { RequestItemFormProps } from '@travel/components/request/editor/forms/RequestItemForm';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RequestItemFormView: React.SFC<RequestItemFormProps> = props => {
  const { classes, context } = props;

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="travel.itemTitle" />}
        subheader={<FormattedMessage id="travel.itemSubTitle" />}
      />
      <CardContent>
        <List>
          {
            context.fields.map((field, index) => {
              const items = context.fields.get(index);

              return (
                <ListItem
                  disableGutters
                  key={index}
                >
                  <Grid container spacing={24}>
                    <Grid item xs={12} sm={12}>
                      <Typography
                        noWrap
                        color="primary"
                        variant="body2"
                      >
                        {items.fullName}
                      </Typography>
                      <Typography
                        noWrap
                        variant="body1"
                      >
                        {items.from} &nbsp;to&nbsp; {items.destination}
                      </Typography>
                      <Typography
                        noWrap
                        color="textSecondary"
                        variant="caption"
                      >
                        {`Transport Cost: ${items.costTransport}`} &bull; {`Hotel Cost: ${items.costTransport}`} &nbsp;
                      </Typography>
                      <Typography
                        noWrap
                        color="textSecondary"
                        variant="caption"
                      >
                        {`Diem Value: ${items.amount} / ${items.duration} days`}; &nbsp;
                      </Typography>
                    </Grid>
                  </Grid>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => context.fields.remove(index)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          }
          <Divider className={classNames(classes.marginFarTop, classes.marginFarBottom)} />
        </List>
      </CardContent>
    </Card>
  );
  return render;
};