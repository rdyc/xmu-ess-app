import { initialName } from '@layout/helper/initialName';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Avatar,
  Card,
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
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import styles from '@styles';
import { ITravelSettlementItem } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, setDisplayName, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data?: ITravelSettlementItem[];
}

interface IOwnState {
  active?: string;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (type: string) => IOwnState;
}

type AllProps 
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const TravelSettlementItemView: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(travelMessage.settlement.section.itemTitle)}
      // subheader={props.intl.formatMessage(travelMessage.request.section.itemSubHeader)}
    />
    <List>
      {
        props.data &&
        props.data.length === 0 &&
        <ListItem>
          <ListItemText
            primary={props.intl.formatMessage(travelMessage.request.message.emptyItem)}
            primaryTypographyProps={{align: 'center'}} 
          />
        </ListItem>
      }

      {
        props.data &&
        props.data.map(item => 
          item.employee &&
          <React.Fragment key={item.uid}>
            <Divider />

            <ListItem
              selected={item.uid === props.active && props.isExpanded}
              button
              onClick={() => props.handleToggle(item.uid)}
            >
              <ListItemAvatar>
                <Avatar className={props.classes.avatarSecondary}>
                  {initialName(item.employee.fullName)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.employee.fullName} 
                secondary={item.employee.email}
              />
              <ListItemSecondaryAction>
                {props.active === item.uid && props.isExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItemSecondaryAction>
            </ListItem>

            <Collapse
              in={props.active === item.uid && props.isExpanded}
              className={props.classes.paddingFar}
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
                value={props.intl.formatDate(item.departureDate, GlobalFormat.TimeDate)}
              />     

              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                margin="dense"
                label={props.intl.formatMessage(travelMessage.request.field.itemEnd)}
                value={props.intl.formatDate(item.returnDate, GlobalFormat.TimeDate)}
              />

              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                margin="dense"
                label={props.intl.formatMessage(travelMessage.request.field.transportCost)}
                value={props.intl.formatNumber(item.costTransport || 0)}
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
                value={props.intl.formatNumber(item.costHotel || 0)}
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
                value={props.intl.formatNumber(item.duration || 0)}
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
                value={props.intl.formatNumber(item.diemValue || 0)}
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
                value={props.intl.formatNumber(item.amount || 0)}
              />
            </Collapse>
          </React.Fragment>
        )
      }
    </List>

    {props.children}
  </Card>
);

const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (type: string) => ({
    active: type,
    isExpanded: state.active === type ? !state.isExpanded : true
  })
};

export const TravelSettlementItem = compose<AllProps, IOwnProps>(
  setDisplayName('TravelRequestItem'),
  withStateHandlers(createProps, stateUpdaters),
  withStyles(styles),
  injectIntl
)(TravelSettlementItemView);