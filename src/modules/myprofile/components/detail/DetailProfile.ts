import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { MyProfileTabs } from 'modules/myprofile/classes/types/MyProfileTabs';
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
import { DetailProfileView } from './DetailProfileView';

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
  tab: MyProfileTabs;
}

export type DetailProfileProps
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

const handlerCreators: HandleCreators<DetailProfileProps, OwnHandlers> = {
  handleChangeTab: (props: DetailProfileProps) => (tabValue: number) => {
    props.stateUpdate({
      tabValue
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<DetailProfileProps, OwnState> = {
  componentDidMount() {
    const tabs = Object.keys(MyProfileTabs).map(key => ({
      id: key,
      name: MyProfileTabs[key]
    }));

    tabs.map((item, index) => item.name === this.props.tab ? this.props.handleChangeTab(index) : null);
  },
};

export const DetailProfile = compose<DetailProfileProps, OwnOption>(
  setDisplayName('DetailProfile'),
  withRouter,
  withStyles(styles, { withTheme: true }),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>({}, stateUpdaters),
  withHandlers<DetailProfileProps, OwnHandlers>(handlerCreators),
  lifecycle<DetailProfileProps, OwnState>(lifecycles)
)(DetailProfileView);