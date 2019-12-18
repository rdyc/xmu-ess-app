import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILeaveItem } from '@lookup/classes/response/leave/ILeaveItem';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  items: ILeaveItem[];
}

interface IOwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const lookupLeaveItem: React.SFC<AllProps> = props => {
  const { items, intl, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(lookupMessage.leave.field.leaveItem)}
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
                  primary={intl.formatDate(item.leaveDate, GlobalFormat.Date)}
                />
                <ListItemSecondaryAction>
                  {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse
                in={active === item.uid && isExpanded}
                className={props.classes.marginFar}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={intl.formatMessage(lookupMessage.leave.field.leaveDate)}
                  value={intl.formatDate(item.leaveDate, GlobalFormat.Date)}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  multiline
                  margin="dense"
                  label={intl.formatMessage(lookupMessage.leave.field.leaveDescription)}
                  value={item.leaveDescription}
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

export const LookupLeaveItem = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(lookupLeaveItem);