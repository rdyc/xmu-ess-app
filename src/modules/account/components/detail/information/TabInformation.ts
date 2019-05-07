import { AccountInformationTabs } from '@account/classes/types/AccountInformationTabs';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { TabInformationView } from './TabInformationView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
  tabValue?: number;
}

interface OwnHandlers {
  handleChangeTab: (tabValue: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnOption {
  tab: AccountInformationTabs;
}

export type TabInformationProps
  = OwnOption
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & WithTheme 
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>;

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<TabInformationProps, OwnHandlers> = {
  handleChangeTab: (props: TabInformationProps) => (tabValue: number) => {
    props.stateUpdate({
      tabValue
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<TabInformationProps, OwnState> = {
  componentDidMount() {
    const tabs = Object.keys(AccountInformationTabs).map(key => ({
      id: key,
      name: AccountInformationTabs[key]
    }));

    tabs.map((item, index) => item.name === this.props.tab ? this.props.handleChangeTab(index) : null);
  },
};

export const TabInformation = compose<TabInformationProps, OwnOption>(
  setDisplayName('TabInformation'),
  withRouter,
  withStyles(styles, { withTheme: true }),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>({}, stateUpdaters),
  withHandlers<TabInformationProps, OwnHandlers>(handlerCreators),
  lifecycle<TabInformationProps, OwnState>(lifecycles)
)(TabInformationView);