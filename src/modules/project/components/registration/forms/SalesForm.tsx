import { IEmployee } from '@account/classes/response';
import ListItemEmployeeSelector from '@account/components/views/ListItemEmployeeSelector';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  WithStyles,
  withStyles,
} from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectSales } from '@project/classes/response';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'recompose';
import { WrappedFieldArrayProps } from 'redux-form';

interface OwnProps {
  context: WrappedFieldArrayProps<IProjectSales>;
}

type AllProps
   = OwnProps
   & WithUser
   & WithStyles
   & WithWidth;

const salesForm: React.SFC<AllProps> = props => {
  const { classes, width, context } = props;
  const { user } = props.userState;

  const handleSelectedCallback = (employee: IEmployee): boolean => {
    // tslint:disable-next-line:no-debugger
    debugger;
    try {
      context.fields.push({
        uid: null,
        employeeUid: employee.uid,
        employee: {
          uid: employee.uid,
          joinDate: employee.joinDate,
          inactiveDate: null,
          employmentNumber: employee.employmentNumber,
          employmentType: null,
          employment: null,
          fullName: employee.fullName,
          email: employee.email,
          mobilePhone: null,
          address: null,
          genderType: employee.genderType,
          gender: null
        },
        changes: null
      });

      return true;
    } catch (error) {
      return false;
    }
  };
  
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
              onSelected={(employee: IEmployee) => handleSelectedCallback(employee)}
            />
          </List>
        </CardContent>
      </Card>
  );

  return render;
};

export const SalesForm = compose<AllProps, OwnProps>(
  withUser,
  withStyles(styles),
  withWidth()
)(salesForm);