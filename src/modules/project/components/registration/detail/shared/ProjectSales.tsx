import { Avatar, Card, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectSales } from '@project/classes/response';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IProjectSales[] | null | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const projectSales: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
      subheader={props.intl.formatMessage(projectMessage.registration.section.salesSubHeader)}
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
                <Avatar
                  alt={item.employee.fullName} 
                >
                  <PersonIcon/>
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
  injectIntl
)(projectSales);