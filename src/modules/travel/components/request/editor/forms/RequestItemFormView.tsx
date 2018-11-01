import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { RequestItemFormProps } from '@travel/components/request/editor/forms/RequestItemForm';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RequestItemFormView: React.SFC<RequestItemFormProps> = props => {
  const { classes, context, intl, isExpanded, active, handleToggle } = props;
  
  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: false,
      readOnly: false
    }
  };

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
                  <div>
                  <ListItem 
                    button
                    disableGutters 
                    key={index}
                    onClick={() => handleToggle(items.uid)}
                  >
                    <ListItemAvatar>
                    <Avatar
                      alt={items.fullName}
                    >
                      <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={items.fullName}
                  />
                  <ListItemSecondaryAction>
                    {active === items.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>                    
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => context.fields.remove(index)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Collapse
                  in={active === items.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                  >
                  <TextField
                    {...styled}
                    label={<FormattedMessage id="travel.item.field.information.isRoundTrip" />}
                    value={items.isRoundTrip}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.transport" />}
                    value={items.transportType || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.t.field.information.from" />}
                    value={items.from || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.departureDate" />}
                    value={intl.formatDate(items.departureDate, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.destination" />}
                    value={intl.formatDate(items.returnDate, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.returnDate" />}
                    value={items.returnDate}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.costTransport" />}
                    value={intl.formatNumber(items.costTransport || 0)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.isTransportByCompany" />}
                    value={items.isTransportByCompany}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.hotel" />}
                    value={items.hotel || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.costHotel" />}
                    value={intl.formatNumber(items.costHotel || 0)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.isHotelByCompany" />}
                    value={items.isHotelByCompany}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.notes" />}
                    value={items.notes || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.duration" />}
                    value={intl.formatNumber(items.duration || 0)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.currency" />}
                    value={items.currencyUid || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.diemValue" />}
                    value={intl.formatNumber(items.diemValue || 0)}
                  />
                  <Divider />
                </Collapse>
                  </div>
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