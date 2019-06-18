import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { IMileageRequestItem } from '@mileage/classes/response';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  items: IMileageRequestItem[] | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (uid: string) => OwnState;
}

type AllProps
  = OwnProps
  & OwnState
  & OwnStateHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AllProps, OwnState> = (): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const mileageItem: React.SFC<AllProps> = props => {
  const { items, intl, active, isExpanded, handleToggle } = props;
  const len = items && items.length - 1;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(mileageMessage.request.item.title)}
      />
      <List>
        {
          items &&
          items.map((item, index) =>
            <React.Fragment key={item.uid}>
              <Divider />
              <ListItem
                button
                selected={item.uid === active && isExpanded}
                onClick={() => handleToggle(item.uid)}
              >
                <ListItemText 
                  primary={intl.formatDate(item.date, GlobalFormat.Date)} 
                  secondary={`${item.status && item.status.value} - ${intl.formatNumber(Number(item.amount), GlobalFormat.CurrencyDefault)}`}
                />
                <ListItemSecondaryAction>
                  {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              {len !== index && <Divider />}                
              <Collapse
                in={active === item.uid && isExpanded}
                className={props.classes.paddingFar}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemUid)}
                  value={item.uid}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemStatus)}
                  value={item.status ? item.status.value : 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemDate)}
                  value={intl.formatDate(item.date, GlobalFormat.Date)}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemCustomer)}
                  value={item.customer ? item.customer.name : 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  multiline
                  label={intl.formatMessage(mileageMessage.request.field.itemProject)}
                  value={`${item.projectUid} - ${item.project && item.project.name}`}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemSite)}
                  value={item.site ? item.site.name : 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(mileageMessage.request.field.itemValue)}
                  value={intl.formatNumber(Number(item.amount), GlobalFormat.CurrencyDefault)}
                />
              </Collapse>
            </React.Fragment>
          )
        }
      </List>
    </Card>
  );

  return render;
};

export const MileageItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(mileageItem);