import { IAccountEmployee } from '@account/classes';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILookupCompany } from '@lookup/classes';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
import { EmployeeDetailPageView } from './EmployeeDetailPageView';

interface IOwnState {
  tabValue: number;
  company: string;
}

interface IOwnHandlers {
  handleChangeTab: (event: any, tabValue: number) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  setCompany: StateHandler<IOwnState>;
}

interface IOwnOption {
  isEmployeeOpen: boolean;
  companyUid?: string;
  employee?: IAccountEmployee;
  handleOpenEmployee: () => void;
}

export type EmployeeDetailPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandlers
  & WithTheme 
  & WithUser
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<EmployeeDetailPageProps, IOwnState> = (props: EmployeeDetailPageProps): IOwnState => ({
  tabValue: 0,
  company: ''
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setCompany: (prevState: IOwnState) => (data?: ILookupCompany) => ({
    company: data && data.name
  }),
};

const handlerCreators: HandleCreators<EmployeeDetailPageProps, IOwnHandlers> = {
  handleChangeTab: (props: EmployeeDetailPageProps) => (event: any, tabValue: number) => {
    props.stateUpdate({
      tabValue
    });
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeDetailPageProps, IOwnState> = {
  componentDidMount() {
    const { companyUid } = this.props;

    if (companyUid) {
      const { response } = this.props.lookupCompanyState.list;

      if (response && response.data) {
        const selected = response.data.find(item => item.uid === companyUid);

        this.props.setCompany(selected);
      }
    }
  },
};

export const EmployeeDetailPage = compose<EmployeeDetailPageProps, IOwnOption>(
  setDisplayName('EmployeeDetailPage'),
  withLookupCompany,
  withUser,
  withStyles(styles, { withTheme: true }),
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EmployeeDetailPageProps, IOwnHandlers>(handlerCreators),
  lifecycle<EmployeeDetailPageProps, IOwnState>(lifecycles)
)(EmployeeDetailPageView);