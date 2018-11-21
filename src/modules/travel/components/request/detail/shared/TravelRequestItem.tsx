import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import { ITravelRequestItem } from '@travel/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  data: ITravelRequestItem[] | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (type: string) => OwnState;
}

type AllProps 
  = OwnProps
  & OwnState
  & OwnStateHandler
  & InjectedIntlProps;

const travelRequestItem: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
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
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="travel.request.message.items.empty" />}
                primaryTypographyProps={{align: 'center'}} 
              />
            </ListItem>
          }
          {
            data &&
            data.map(item => 
              item.employee &&
              <div key={item.uid}>
                <ListItem
                  disableGutters
                  button
                  onClick={() => handleToggle(item.uid)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.employee.fullName}
                    >
                      <PersonIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.employee.fullName}
                  />
                  <ListItemSecondaryAction>
                    {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItem>
                <Collapse
                  in={active === item.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <FormControlLabel
                    control={
                      <Checkbox checked={item.isRoundTrip} />
                    }
                    label={<FormattedMessage id="travel.item.field.information.isRoundTrip" />}
                  />
                  <TextField
                    {...styled} 
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.transport" />}
                    value={item.transport ? item.transport.value : '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.t.field.information.from" />}
                    value={item.from || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.departureDate" />}
                    value={intl.formatDate(item.departureDate, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                      timeZone: 'GMT',
                    })}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.destination" />}
                    value={item.destination || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.returnDate" />}
                    value={intl.formatDate(item.returnDate, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false,
                      timeZone: 'GMT',
                    })}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.costTransport" />}
                    value={intl.formatNumber(item.costTransport || 0)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={item.isTransportByCompany} />
                    }
                    label={<FormattedMessage id="travel.item.field.information.isTransportByCompany" />}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.hotel" />}
                    value={item.hotel || '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.costHotel" />}
                    value={intl.formatNumber(item.costHotel || 0)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={item.isHotelByCompany} />
                    }
                    label={<FormattedMessage id="travel.item.field.information.isHotelByCompany" />}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.notes" />}
                    value={item.notes || '-'}
                  />                    
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.duration" />}
                    value={intl.formatNumber(item.duration || 0)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.currencyUid" />}
                    value={item.currency ? item.currency.name : '-'}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.diemValue" />}
                    value={intl.formatNumber(item.diemValue || 0)}
                  />
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.currencyRate" />}
                    value={item.currency ? item.currency.rate : 0}
                  />
                                  
                  <TextField
                    {...styled}
                    margin="dense"
                    label={<FormattedMessage id="travel.item.field.information.amount" />}
                    value={intl.formatNumber(item.amount || 0)}
                  />
                  <Divider />
                </Collapse>
              </div>)
          }
        </List>

        {props.children}
      </CardContent>
    </Card>
  );
  return render;
};

const createProps: mapper<AllProps, OwnState> = (props: AllProps): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

export const TravelRequestItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(travelRequestItem);