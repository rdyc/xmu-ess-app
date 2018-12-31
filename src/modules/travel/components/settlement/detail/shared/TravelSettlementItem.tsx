import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
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
import { ITravelSettlementItem } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  data: ITravelSettlementItem[] | null | undefined;
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

const travelSettlementItem: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(travelMessage.settlement.section.itemTitle)}
        subheader={props.intl.formatMessage(travelMessage.settlement.section.itemSubHeader)}
      />
      <CardContent>
        <List>
          {
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="travel.settlement.items.members.empty" />}
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
                  selected={item.uid === active && isExpanded}
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
                    label={props.intl.formatMessage(travelMessage.request.field.isRoundTrip)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly} 
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.transportType)}
                    value={item.transport ? item.transport.value : '-'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.from)}
                    value={item.from || '-'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.destination)}
                    value={item.destination || '-'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.itemStart)}
                    value={intl.formatDate(item.departureDate, GlobalFormat.TimeDate)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                    value={intl.formatDate(item.returnDate, GlobalFormat.TimeDate)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                    value={intl.formatNumber(item.costTransport || 0)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={item.isTransportByCompany} />
                    }
                    label={props.intl.formatMessage(travelMessage.request.field.isTransportByCompany)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.hotel)}
                    value={item.hotel || '-'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.hotelCost)}
                    value={intl.formatNumber(item.costHotel || 0)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={item.isHotelByCompany} />
                    }
                    label={props.intl.formatMessage(travelMessage.request.field.isHotelByCompany)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.note)}
                    value={item.notes || '-'}
                  />                  
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.duration)}
                    value={intl.formatNumber(item.duration || 0)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.currencyUid)}
                    value={item.currency ? item.currency.name : '-'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.diemValue)}
                    value={intl.formatNumber(item.diemValue || 0)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.currencyRate)}
                    value={item.currency ? item.currency.rate : 0}
                  />
                                    
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(travelMessage.request.field.amount)}
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

export const TravelSettlementItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(travelSettlementItem);