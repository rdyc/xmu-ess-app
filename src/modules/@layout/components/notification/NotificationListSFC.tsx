import loadNotification from '@layout/hoc/loadNotification';
import { withNotification, WithNotification } from '@layout/hoc/withNotification';
import { Collapse, List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as moment from 'moment';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose, setDisplayName, StateHandlerMap, withStateHandlers } from 'recompose';
import { isArray } from 'util';

interface ToggleProps {
  active: string | undefined;
  isExpanded: boolean;
}

interface ToggleHandlerProps extends StateHandlerMap<ToggleProps> {
  handleToggle: (type: string) => ToggleProps;
}

type AllProps
  = WithNotification
  & ToggleProps
  & ToggleHandlerProps;

const NotificationListSFC: React.SFC<AllProps> = props => {
  const { active, isExpanded } = props;
  const { loading, result } = props.notificationState;

  const renderSubHeader = (
    <ListSubheader 
      color="primary"
    >
      <FormattedMessage id="global.notification.title"/>
    </ListSubheader>
  );

  const renderLoading = (
    <ListItem>
      <ListItemText 
        primary={
          <FormattedMessage id="global.loading"/>
        } 
      />
    </ListItem>
  );

  const renderEmtpy = (
    <ListItem>
      <ListItemText 
        primary={
          <FormattedMessage id="global.notification.emptySubTitle"/>
        }
      />
    </ListItem>
  );

  return (
    <List subheader={renderSubHeader}>
      {loading && renderLoading}
      {!loading && !result && renderEmtpy}
      {!loading && result && isArray(result.data) && result.data
        // order by name asc
        .sort((a , b) => (a.name > b.name) ? 1 : 0)
        .map(category => category.details
          .map(detail =>
            <div key={detail.type}>
              <ListItem
                key={category.name}
                button
                onClick={() => props.handleToggle(`${category.name}_${detail.type}`)}
              >
                <ListItemText
                  key={category.name}
                  primary={`${category.name} (${detail.total})`}
                />
                <ListItemSecondaryAction key={category.name}>
                  {active === `${category.name}_${detail.type}` && isExpanded ?
                  <ExpandLess /> : <ExpandMore />}
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse
                key={detail.type}
                in={active === `${category.name}_${detail.type}` && isExpanded}
                timeout="auto"
                unmountOnExit
              >
                <List key={detail.type} dense>
                  {detail.items
                    // order by date desc
                    .sort((a , b) => (a.date < b.date) ? 1 : 0)
                    .map(item =>
                    <ListItem
                      key={item.uid}
                      button
                    >
                      <ListItemText
                        key={item.uid}
                        primary={`${item.uid} - ${item.name}`}
                        secondary={`${detail.type} ${moment(item.date).fromNow()}`}
                      />
                    </ListItem>
                  )}
                </List>
              </Collapse>
            </div>
          )
        )
      }
    </List>
  );
};

const enhance = compose(
  setDisplayName('NotificationListSFC'),
  withStateHandlers<ToggleProps, ToggleHandlerProps>(
    { 
      active: undefined,
      isExpanded: false
    },
    {
      handleToggle: (state: ToggleProps) => (type: string) => ({
        active: type,
        isExpanded: state.active === type ? !state.isExpanded : true
      })
    }
  )
)(
  loadNotification(
    withNotification(
      NotificationListSFC
    )
  )
);

export default enhance;