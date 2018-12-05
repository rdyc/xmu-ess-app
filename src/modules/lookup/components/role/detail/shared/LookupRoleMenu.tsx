import { IRoleMenu } from '@lookup/classes/response/role/IRoleMenu';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
// import { isNullOrUndefined } from 'util';

interface OwnProps {
  title: string;
  subHeader: string;
  data: IRoleMenu[] | null;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const roleMenu: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader
      title={props.title}
      subheader={props.subHeader}
    />
    <CardContent>
      <List>
        {
          props.data &&
          props.data.length === 0 &&
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
          props.data &&
          props.data.map(item => item.menu ? (!item.menu.parentUid) &&
            <ListItem
              disableGutters
              key={item.menuUid}
            >
              <ListItemText
                className={(!item.isAccess) ? props.classes.textStrikethrough : ''}
                primary={item.menu.name}
              />
            </ListItem> : ''
          )
        }
      </List>
    </CardContent>
  </Card>
);

export const LookupRoleMenu = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(roleMenu);