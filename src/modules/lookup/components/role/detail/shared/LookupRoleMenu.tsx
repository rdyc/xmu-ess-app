import { IRoleMenu } from '@lookup/classes/response/role/IRoleMenu';
import { Card, CardContent, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  title: string;
  subHeader?: string;
  data: IRoleMenu[] | null;
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
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const roleMenu: React.SFC<AllProps> = props => {
  const { data, active, isExpanded, handleToggle } = props;

  const render = (
    <Card square>
      <CardHeader
        title={props.title}
      // subheader={props.subHeader}
      />
      <CardContent>
        <List>
          {
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={props.intl.formatMessage(projectMessage.registration.message.emptyDocument)}
                primaryTypographyProps={{
                  align: 'center'
                }}
              />
            </ListItem>
          }

          {
            data &&
            data.map(parent => parent.menu ? (!parent.menu.parentUid) &&
              <div key={parent.menuUid}>
                <ListItem
                  button
                  onClick={() => handleToggle(parent.menuUid)}
                  color={'inherit'}
                  selected={parent.menuUid === active && isExpanded}
                >
                  <ListItemText
                    className={(!parent.isAccess) ? props.classes.textStrikethrough : ''}
                    primary={parent.menu.name}
                    primaryTypographyProps={{
                      noWrap: true,
                      color: 'inherit'
                    }}
                  />
                  <ListItemSecondaryAction>
                    {active === parent.menuUid && isExpanded ? <ExpandLess color="inherit" /> : <ExpandMore color="inherit" />}
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <Collapse
                  in={active === parent.menuUid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  {
                    data &&
                    data.map(child => child.menu && (child.menu.parentUid === parent.menuUid) &&
                      <div key={child.menuUid}>
                        <ListItem
                          button
                          color={'inherit'}
                          className={props.classes.marginFarLeft}
                        >
                          <ListItemText
                            className={(!child.isAccess) ? props.classes.textStrikethrough : ''}
                            primary={child.menu.name}
                            primaryTypographyProps={{
                              noWrap: true,
                              color: 'inherit'
                            }}
                          />
                        </ListItem>
                      </div>
                    )
                  }
                </Collapse>
              </div> : ''
            )
          }
        </List>
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

export const LookupRoleMenu = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(roleMenu);