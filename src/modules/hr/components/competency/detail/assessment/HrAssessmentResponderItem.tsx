import { FormMode } from '@generic/types';
import { IHrCompetencyAssessmentDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { initialName } from '@layout/helper/initialName';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lightBlue, red } from '@material-ui/core/colors';
import { Create } from '@material-ui/icons';
import styles from '@styles';
import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data: IHrCompetencyAssessmentDetail;
  handleOnModify?: (value: FormMode) => void;
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
  const { data, intl, handleOnModify } = props;

  const render = (
    <React.Fragment>      
      <Card square>
        <CardHeader
          title={intl.formatMessage(hrMessage.competency.field.responder)}
          action={
            handleOnModify &&
            <IconButton onClick={() => handleOnModify(FormMode.Edit)} >
              <Create />
            </IconButton>
          }
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
                key={item.uid}
              >
                <ListItemAvatar>
                  <Avatar className={classNames(!item.isExpired && !item.isRespond && !item.isComplete ? props.classes.avatarSecondary 
                    : (!item.isComplete && item.isExpired ? props.classes.avatarRed : props.classes.avatarPrimary))}>
                    {initialName(item.employee.fullName)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.employee.fullName} 
                  secondary={
                    item.assessor && 
                    <React.Fragment>
                      <Typography component="span" style={{display: 'inline'}}>
                        {item.assessor.value}
                      </Typography>
                      {
                        ` — ${moment(item.dueDate).utc().format('MMMM D, YYYY')}`
                      }
                    </React.Fragment>
                    || item.employee.email
                  }
                />
                <ListItemSecondaryAction>
                  {
                    !item.isExpired && !item.isRespond && !item.isComplete ?
                    <span className={classNames(props.classes.badgeChild)} style={{transform: 'translate(10px, -15px)', whiteSpace: 'nowrap'}}>
                        {intl.formatMessage(hrMessage.competency.field.assigned)}
                    </span>
                    :
                    (
                      !item.isComplete && item.isExpired ?
                      <span className={classNames(props.classes.badgeChild)} style={{transform: 'translate(10px, -15px)', backgroundColor: red[500], whiteSpace: 'nowrap'}}>
                        {intl.formatMessage(hrMessage.competency.field.expired)}
                      </span>
                      :
                      // (item.isRespond || item.isComplete) &&
                      <span className={classNames(props.classes.badgeChild)} style={{transform: 'translate(10px, -15px)', backgroundColor: lightBlue[500], whiteSpace: 'nowrap'}}>
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