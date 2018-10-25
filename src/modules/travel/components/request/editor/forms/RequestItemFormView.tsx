import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
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
              const sales = context.fields.get(index);

              return (
                <ListItem
                  disableGutters
                  key={index}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={sales.fullName}
                    >
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={sales.fullName}
                  />
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