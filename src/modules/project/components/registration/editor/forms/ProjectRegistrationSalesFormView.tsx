import { IEmployee } from '@account/classes/response';
import { ListItemEmployeeSelector } from '@account/components/selector/ListItemEmployeeSelector';
import { initialName } from '@layout/helper/initialName';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  ProjectRegistrationSalesFormProps,
} from '@project/components/registration/editor/forms/ProjectRegistrationSalesForm';
import { projectMessage } from '@project/locales/messages/projectMessage';
import * as classNames from 'classnames';
import * as React from 'react';

export const ProjectRegistrationSalesFormView: React.SFC<ProjectRegistrationSalesFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
      // subheader={props.intl.formatMessage(projectMessage.registration.section.siteSubHeader)}
    />
    <CardContent>
      <List>
        {
          props.context.fields.map((field, index) => {
            const sales = props.context.fields.get(index);

            return (
              <ListItem 
                disableGutters 
                key={index}
              >
                <ListItemAvatar>
                  <Avatar className={props.classes.avatarSecondary}>
                    {initialName(sales.fullName)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={sales.fullName} 
                  secondary={sales.email}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => props.context.fields.remove(index)}>
                    <DeleteForeverIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })
        }
        
        <Divider className={classNames(props.classes.marginFarTop, props.classes.marginFarBottom)} />
        
        <ListItemEmployeeSelector
          title={props.intl.formatMessage(projectMessage.registration.section.salesTitle)}
          companyUids={props.userState.user && props.userState.user.company.uid}
          roleUids={props.roleSalesUids && props.roleSalesUids.join(',')}
          onSelected={(employee: IEmployee) => props.handleSelected(employee)}
        />
      </List>
    </CardContent>
  </Card>
);