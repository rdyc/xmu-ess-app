import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import {
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { ITimesheet } from '@timesheet/classes/response';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface OwnProps {
  data: ITimesheet[] | null | undefined;
}

interface OwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface OwnStateHandler extends StateHandlerMap<OwnState> {
  handleToggle: (uid: string) => OwnState;
}

type AllProps
  = OwnProps
  & OwnState
  & OwnStateHandler
  & InjectedIntlProps;

const createProps: mapper<AllProps, OwnState> = (): OwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateHandler> = {
  handleToggle: (state: OwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const timesheetItem: React.SFC<AllProps> = props => {
  const { data, intl, active, isExpanded, handleToggle } = props;
  const len = data && data.length - 1;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(mileageMessage.request.timesheet.title)}
        // subheader={props.intl.formatMessage(mileageMessage.request.timesheet.subHeader)}
      />
      <CardContent>
        <List>
          {
            data &&
            data.map((item, index) =>
              <React.Fragment key={item.uid}>
                <ListItem 
                  disableGutters
                  button
                  selected={item.uid === active && isExpanded}
                  onClick={() => handleToggle(item.uid)}
                >
                  <ListItemText primary={item.uid} secondary={`${intl.formatDate(item.date, GlobalFormat.Date)} | ${props.intl.formatTime(item.start, GlobalFormat.Time)} - ${props.intl.formatTime(item.end, GlobalFormat.Time)}`}/>
                  <ListItemSecondaryAction>
                    {active === item.uid && isExpanded ? <ExpandLess /> : <ExpandMore />}
                  </ListItemSecondaryAction>
                </ListItem>
                {len !== index && !isExpanded && <Divider />}
                <Collapse
                  in={active === item.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(timesheetMessage.entry.field.statusType)}
                    value={item.status ? item.status.value : item.statusType}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"                    
                    label={props.intl.formatMessage(timesheetMessage.entry.field.uid)}
                    value={item.uid}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(timesheetMessage.entry.field.date)}
                    value={props.intl.formatDate(item.date, GlobalFormat.Date)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"
                    label={props.intl.formatMessage(timesheetMessage.entry.field.activityType)}
                    value={item.activity ? item.activity.value : 'N/A'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    label={props.intl.formatMessage(timesheetMessage.entry.field.customerUid)}
                    value={item.customer ? item.customer.name : 'N/A'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    multiline={true}
                    label={props.intl.formatMessage(timesheetMessage.entry.field.projectUid)}
                    value={item.project ? `${item.project.uid} - ${item.project.name}` : 'N/A'}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    label={props.intl.formatMessage(timesheetMessage.entry.field.siteUid)}
                    value={item.site ? item.site.name : 'N/A'}
                  />
                  {(item.mileageExceptionUid) ?
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                      label={props.intl.formatMessage(timesheetMessage.entry.field.siteValue)}
                      value={props.intl.formatNumber(((item.mileageException ? item.mileageException.percentage : 0) / 100) * (item.site ? item.site.value : 0))}
                    /> :
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                      label={props.intl.formatMessage(timesheetMessage.entry.field.siteValue)}
                      value={props.intl.formatNumber(item.site ? item.site.value : 0)}
                    />
                  }
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    label={props.intl.formatMessage(timesheetMessage.entry.field.start)}
                    value={props.intl.formatTime(item.start, GlobalFormat.Time)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    label={props.intl.formatMessage(timesheetMessage.entry.field.end)}
                    value={props.intl.formatTime(item.end, GlobalFormat.Time)}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    label={props.intl.formatMessage(timesheetMessage.entry.field.totalHours)}
                    value={item.hours ? item.hours : 0}
                  />
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                    multiline={true}
                    label={props.intl.formatMessage(timesheetMessage.entry.field.notes)}
                    value={item.description || 'N/A'}
                  />
                  {(item.mileageExceptionUid) ?
                    <TextField
                      {...GlobalStyle.TextField.ReadOnly}
                    margin="dense"

                      multiline={true}
                      label={props.intl.formatMessage(timesheetMessage.entry.field.mileageException)}
                      value={item.mileageException && item.mileageException.reason || 'N/A'}
                    /> : ''
                  }
                  {isExpanded && <Divider />}
                </Collapse>
              </React.Fragment>
            )
          }
        </List>
      </CardContent>
    </Card>
  );

  return render;
};

export const TimesheetItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStateHandlers<OwnState, OwnStateHandler>(createProps, stateUpdaters)
)(timesheetItem);