import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LockIcon from '@material-ui/icons/Lock';
import { PurchaseRequestItemFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemForm';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const PurchaseRequestItemFormView: React.SFC<PurchaseRequestItemFormProps> = props => {
  const { classes, context } = props;

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="purchase.itemTitle" />}
        subheader={<FormattedMessage id="purchase.itemSubTitle" />}
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
                  {/* <ListItemAvatar>
                      alt={items.uid}
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={items.uid}
                  // secondary={items.description}
                  />
                  <ListItemText
                    secondary={items.request}
                  // secondary={items.description}
                  />
                  <ListItemText
                    secondary={items.description}
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
          <IconButton onClick={() => context.fields.push({ uid: 'New', description: 'N/A', request: 0 })}>
            <AddIcon />
          </IconButton>
          <IconButton >
            <LockIcon />
          </IconButton>
        </List>
      </CardContent>
    </Card>
  );

  return render;
};