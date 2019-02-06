import { initialName } from '@layout/helper/initialName';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { IProjectSales } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectSales[] | null | undefined;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const projectSales: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
      // subheader={props.intl.formatMessage(projectMessage.registration.section.salesSubHeader)}
    />
    <CardContent>
      <List>
        { 
          props.data &&
          props.data.length === 0 &&
          <ListItem>
            <ListItemText
              primary={props.intl.formatMessage(projectMessage.registration.message.emptySales)}
              primaryTypographyProps={{
                align: 'center'
              }} 
            />
          </ListItem>
        }

        {
          props.data &&
          props.data.map(item => 
            item.employee &&
            <ListItem 
              disableGutters 
              key={item.employeeUid}
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
            </ListItem>
          )
        }
      </List>
    </CardContent>
  </Card>
);

export const ProjectSales = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles)
)(projectSales);