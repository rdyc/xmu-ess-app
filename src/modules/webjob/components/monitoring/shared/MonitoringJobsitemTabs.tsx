import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import { IWebJobMonitoringStatistic } from '@webjob/classes/response';
import { MonitoringJobsItem } from '@webjob/classes/types/monitoring/MonitoringJobsItem';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnOption {
  monitoringJob: string;
}

interface IOwnProps {
  data: IWebJobMonitoringStatistic;
  jobsType: string;
  handleJobsItem: (type: string) => {};
}

interface IOwnState {
  // active: string | undefined;
  // isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  // handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & RouteComponentProps<IOwnOption>
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  // active: undefined,
  // isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  // handleToggle: () => () => ({
    // active: id,
    // isExpanded: state.active === uid ? !state.isExpanded : true
  // })
};

const monitoringJobsItemTabs: React.SFC<AllProps> = props => {
  const { intl, data } = props;

  const tabs = Object.keys(MonitoringJobsItem).map((key) => ({
    id: key,
    name: MonitoringJobsItem[key]
  }));

  const render = (
    <Card square>
      <List>
        {
          tabs.map((item, index) =>
            <React.Fragment key={item.id}>
              {
                index !== 0 &&
                <Divider />
              }
              <ListItem
                button
                selected={item.name === props.jobsType}
                onClick={() => {
                  props.handleJobsItem(item.name);
                }}
              >
                <ListItemText
                  primary={intl.formatMessage(webJobMessage.shared.fieldFor(item.id, 'fieldTab'))}
                />
                <ListItemSecondaryAction>
                  <span className={props.classes.badgeChild} style={{right: '32px'}}>
                    {data[item.name]}
                  </span>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>  
          )
        }
      </List>
    </Card>
  );

  return render;
};

export const MonitoringJobsItemTabs = compose<AllProps, IOwnProps>(
  injectIntl,
  withRouter,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(monitoringJobsItemTabs);