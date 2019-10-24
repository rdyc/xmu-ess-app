import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
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
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyAssessmentDetail;
}

type AllProps = OwnProps & InjectedIntlProps & WithStyles<typeof styles>;

const hrAssessmentResponderItem: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader
        title={intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Responder'})}
      />
      <CardContent>
        <List>
        {
          data.responders &&
          data.responders.length === 0 &&
          <ListItem>
            <ListItemText
              primary={intl.formatMessage(hrMessage.competency.field.notFound, {state: 'Responder'})}
              primaryTypographyProps={{
                align: 'center'
              }} 
            />
          </ListItem>
        }
        {
          data.responders &&
          data.responders.map(item =>
            <ListItem 
              disableGutters 
              key={item.employeeUid}
            >
              <ListItemAvatar>
                <Avatar className={classNames(!item.isExpired && !item.isRespond ? props.classes.avatarSecondary : (item.isExpired ? props.classes.avatarRed : (item.isRespond && props.classes.avatarPrimary || '')))}>
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

  return render;
};

export const HrAssessmentResponderItem = compose<AllProps,  OwnProps>(
  injectIntl,
  withStyles(styles)
)(hrAssessmentResponderItem);