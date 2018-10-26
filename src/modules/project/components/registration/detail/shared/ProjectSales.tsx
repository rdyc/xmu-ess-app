import { Avatar, Card, CardContent, CardHeader, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { IProjectSales } from '@project/classes/response';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

interface OwnProps {
  data: IProjectSales[] | null | undefined;
}

export const ProjectSales: React.SFC<OwnProps> = props => {
  const { data } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.salesTitle" />}
        subheader={<FormattedMessage id="project.salesSubTitle" />}
      />
      <CardContent>
        <List>
          { 
            data &&
            data.length === 0 &&
            <ListItem>
              <ListItemText
                primary={<FormattedMessage id="project.field.sales.empty" />}
                primaryTypographyProps={{align: 'center'}} 
              />
            </ListItem>
          }
          {
            data &&
            data.map(item => 
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

  return render;
};