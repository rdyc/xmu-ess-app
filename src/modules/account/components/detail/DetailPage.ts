import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { injectIntl } from 'react-intl';
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
import { DetailPageView } from './DetailPageView';

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
  tab2: AccountEmployeeTabs;
}

export type DetailPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps<OwnRouteParams>;

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<DetailPageProps, OwnHandlers> = {
  handleChangeTab: (props: DetailPageProps) => (tabValue: number) => {
    props.stateUpdate({
      tabValue
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<DetailPageProps, OwnState> = {
  componentDidMount() {
    const tabs = Object.keys(AccountEmployeeTabs).map(key => ({
      id: key,
      name: AccountEmployeeTabs[key]
    }));

    tabs.map((item, index) => item.name === this.props.tab2 ? this.props.handleChangeTab(index) : null);
  },
};

export const DetailPage = compose<DetailPageProps, OwnOption>(
  withRouter,
  injectIntl,
  setDisplayName('DetailPage'),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>({}, stateUpdaters),
  withHandlers<DetailPageProps, OwnHandlers>(handlerCreators),
  lifecycle<DetailPageProps, OwnState>(lifecycles)
)(DetailPageView);