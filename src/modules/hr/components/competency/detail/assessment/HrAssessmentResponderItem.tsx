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
  ListItemSecondaryAction,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lightBlue, orange, red } from '@material-ui/core/colors';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data: IHrCompetencyAssessmentDetail;
}

interface IOwnState {
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
}

type AllProps 
  = IOwnProps 
  & IOwnState
  & IOwnStateHandler
  & InjectedIntlProps 
  & WithStyles<typeof styles>;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
};

const hrAssessmentResponderItem: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <React.Fragment>      
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
                <ListItemSecondaryAction>
                  {
                    !item.isExpired && !item.isRespond ?
                    <span className={classNames(props.classes.badgeChild)} style={{right: '24px', backgroundColor: orange[500]}}>
                        {intl.formatMessage(hrMessage.competency.field.assigned)}
                    </span>
                    :
                    (
                      item.isExpired ?
                      <span className={classNames(props.classes.badgeChild)} style={{right: '24px', backgroundColor: red[500]}}>
                        {intl.formatMessage(hrMessage.competency.field.expired)}
                      </span>
                      :
                      <span className={classNames(props.classes.badgeChild)} style={{right: '24px', backgroundColor: lightBlue[500]}}>
                        {intl.formatMessage(item.isComplete ? hrMessage.competency.field.complete : hrMessage.competency.field.respond)}
                      </span>
                    )
                  }
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
          </List>
        </CardContent>
      </Card>
    </React.Fragment>
  );

  return render;
};

export const HrAssessmentResponderItem = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrAssessmentResponderItem);