import { AccountEmployeeTabsNoContract, AccountEmployementStatus } from '@account/classes/types';
import { AccountEmployeeTabs } from '@account/classes/types/AccountEmployeeTabs';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
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
  employmentType: AccountEmployementStatus | '';
}

interface OwnHandlers {
  handleChangeTab: (tabValue: number) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnOption {
  tab: AccountEmployeeTabs;
}

export type DetailPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & WithAccountEmployee
  & WithTheme 
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & RouteComponentProps<OwnRouteParams>;

const createProps: mapper<DetailPageProps, OwnState> = (props: DetailPageProps): OwnState => ({
  employmentType: ''
});

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
    const { response } = this.props.accountEmployeeState.detail;

    // for handle permanent or not
    if (this.props.history.location.state || response && response.data) {
      const tabs = Object.keys(
        (this.props.history.location.state && this.props.history.location.state.employmentType || 
          response && response.data.employmentType) === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract : AccountEmployeeTabs).map((key, index) => ({
        id: key,
        name: (this.props.history.location.state && this.props.history.location.state.employmentType || response && response.data.employmentType) === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract[key] : AccountEmployeeTabs[key]
      }));
  
      tabs.map((item, index) => item.name === this.props.tab ? this.props.handleChangeTab(index) : null);
  
      this.props.stateUpdate({
        employmentType: this.props.history.location.state && this.props.history.location.state.employmentType || response && response.data.employmentType
      });
    }

    // if it's not detail and has no respone then reload the employee data
    if (this.props.tab !== AccountEmployeeTabs.detail && !response) {
      this.props.accountEmployeeDispatch.loadDetailRequest({
        employeeUid: this.props.match.params.employeeUid
      });
    }
  },
  componentWillUpdate(nextProps: DetailPageProps) {
    const { employmentType, tab, stateUpdate } = this.props;
    const { response: thisResponse } = this.props.accountEmployeeState.detail;
    const { response: nextResponse } = nextProps.accountEmployeeState.detail; 

    if (employmentType === '' && tab !== AccountEmployeeTabs.detail) {
      if (thisResponse !== nextResponse) {
        if (nextResponse && nextResponse.data) {
          const tabs = Object.keys(nextResponse.data.employmentType === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract : AccountEmployeeTabs).map((key, index) => ({
            id: key,
            name: nextResponse.data.employmentType === AccountEmployementStatus.Permanent ? AccountEmployeeTabsNoContract[key] : AccountEmployeeTabs[key]
          }));
      
          tabs.map((item, index) => item.name === this.props.tab ? this.props.handleChangeTab(index) : null);
      
          stateUpdate({
            employmentType: nextResponse.data.employmentType
          });
        }
      }
    }
  }
};

export const DetailPage = compose<DetailPageProps, OwnOption>(
  setDisplayName('DetailPage'),
  injectIntl,
  withRouter,
  withAccountEmployee,
  withStyles(styles, { withTheme: true }),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<DetailPageProps, OwnHandlers>(handlerCreators),
  lifecycle<DetailPageProps, OwnState>(lifecycles)
)(DetailPageView);