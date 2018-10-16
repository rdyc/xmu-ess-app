import { IEmployee } from '@account/classes/response';
import ListItemEmployeeSelector from '@account/components/views/ListItemEmployeeSelector';
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
import PersonIcon from '@material-ui/icons/Person';
import { RegistrationSalesFormProps } from '@project/components/registration/editor/forms/RegistrationSalesForm';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

export const RegistrationSalesFormView: React.SFC<RegistrationSalesFormProps> = props => {
  const { classes, width, context, handleSelected } = props;
  const { user } = props.userState;
  
  const render = (
    <Card square>
        <CardHeader 
          title={<FormattedMessage id="project.salesTitle" />}
          subheader={<FormattedMessage id="project.salesSubTitle" />}
        />
        <CardContent>
          <List>
            {
              context.fields.map((field, index) => {
                const sales = context.fields.get(index);

                return (
                  <ListItem 
                    disableGutters 
                    key={index}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={sales.employee ? sales.employee.fullName : sales.employeeUid} 
                      >
                        <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={sales.employee && sales.employee.fullName} 
                      secondary={sales.employee && sales.employee.email}
                    />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => context.fields.remove(index)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            }
            <Divider className={classNames(classes.marginFarTop, classes.marginFarBottom)} />
            <ListItemEmployeeSelector
              width={width}
              companyUids={user && [user.company.uid]}
              onSelected={(employee: IEmployee) => handleSelected(employee)}
            />
          </List>
        </CardContent>
      </Card>
  );

  return render;
};