import { IEmployeeExperienceCompetency } from '@account/classes/response/employeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  title: string;
  data: IEmployeeExperienceCompetency[] | null | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps
  & WithStyles<typeof styles>;

const experienceCompetency: React.SFC<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.title}
    />
    <CardContent>
      <List>
        { 
          props.data &&
          props.data.length === 0 && 
          <ListItem>
            <ListItemText
              primary={props.intl.formatMessage(accountMessage.shared.message.emptyCompetency)} 
              primaryTypographyProps={{
                align: 'center'
              }}
            />
          </ListItem>
        }

        {
          props.data &&
          props.data.map(item => 
            item.competency &&
            <ListItem
              disableGutters 
              key={item.uid}
            >
              <ListItemText 
                className={!item.isAvailable ? props.classes.textStrikethrough : ''} 
                primary={item.competency.value}
              />
            </ListItem>
          )
        }
      </List>
    </CardContent>
  </Card>
);

export const ExperienceCompetency = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(experienceCompetency);