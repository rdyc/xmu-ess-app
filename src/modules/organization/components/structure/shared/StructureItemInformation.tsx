import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, WithStyles, withStyles } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { IStructureItem } from '@organization/classes/response/structure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  data: IStructureItem[];
}

interface IOwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = OwnProps
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

export const structureItemInformation: React.SFC<AllProps> = props => {
  const { data, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(organizationMessage.structure.section.itemTitle)}
        // subheader={props.intl.formatMessage(organizationMessage.structure.section.itemSubHeasder)}
      />
      <List>
        {
          data.map(item =>
            <React.Fragment key={item.uid}>
              <Divider />
              <ListItem
                button
                selected={item.uid === active && isExpanded}
                onClick={() => handleToggle(item.uid)}
              >
                <ListItemText
                  primary={item.position && item.position.name}
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
                  label={props.intl.formatMessage(organizationMessage.structure.field.positionUid)}
                  value={item.position && item.position.name || 'N/A'}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={props.intl.formatMessage(organizationMessage.structure.field.start)}
                  value={props.intl.formatDate(item.start, GlobalFormat.Date)}
                />
                <TextField
                  {...GlobalStyle.TextField.ReadOnly}
                  margin="dense"
                  label={props.intl.formatMessage(organizationMessage.structure.field.end)}
                  value={item.end && props.intl.formatDate(item.end, GlobalFormat.Date) || 'N/A'}
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

export const StructureItemInformation = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(structureItemInformation);