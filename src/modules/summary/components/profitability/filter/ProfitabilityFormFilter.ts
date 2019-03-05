import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectList } from '@project/classes/response';
import styles from '@styles';
import { ISummaryGetProfitabilityRequest } from '@summary/classes/queries';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProfitabilityFormFilterView } from './ProfitabilityFormFilterView';

export type ISummaryProfitabilityFilterResult = Pick<ISummaryGetProfitabilityRequest, 'customerUid' | 'projectUid'>;

interface IOwnOption {
  className: string;
  isLoading: boolean;
  isStartup: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ISummaryProfitabilityFilterResult) => void;
}

interface IOwnState {
  isFilterDialogOpen: boolean;

  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter Project Dialog
  filterProjectDialog: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<IOwnState>;
  setFilterProject: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;

  // filter customer
  handleFilterCustomerVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnSelected: (customer: ICustomerList) => void;
  handleFilterCustomerOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnClose: () => void;

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;
}

export type SummaryProfitabilityFilterProps
  = IOwnOption
  & WithUser
  & WithForm
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<SummaryProfitabilityFilterProps, IOwnState> = (props: SummaryProfitabilityFilterProps): IOwnState => ({
  isFilterDialogOpen: true,
  isFilterCustomerOpen: false,
  isFilterProjectOpen: false,

  // default filter project dialog
  filterProjectDialog: {
    customerUids: undefined,
    orderBy: undefined,
    direction: undefined,
  }
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdater> = {  
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterProject: undefined,
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterDialogOpen: !prevState.isFilterDialogOpen
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: () => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer,
    filterProjectDialog: {
      customerUids: customer && customer.uid,
      orderBy: 'uid',
      direction: 'descending'
    }
  }),

  // filter project
  setFilterProjectVisibility: (prevState: IOwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: (prevState: IOwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project
  }),
};

const handlerCreators: HandleCreators<SummaryProfitabilityFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      projectUid: props.filterProject && props.filterProject.uid,
    });
    props.setFilterVisibility();
  },
  handleFilterVisibility: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter customer
  handleFilterCustomerVisibility: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: SummaryProfitabilityFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
    props.setFilterProject();
  },
  handleFilterCustomerOnClear: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
    props.setFilterProject();
  },
  handleFilterCustomerOnClose: (props: SummaryProfitabilityFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter project
  handleFilterProjectVisibility: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectVisibility();
  },
  handleFilterProjectOnSelected: (props: SummaryProfitabilityFilterProps) => (project: IProjectList) => {
    props.setFilterProject(project);
  },
  handleFilterProjectOnClear: (props: SummaryProfitabilityFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProject();
  },
  handleFilterProjectOnClose: (props: SummaryProfitabilityFilterProps) => () => {
    props.setFilterProjectVisibility();
  },
};

export const ProfitabilityFormFilter = compose<SummaryProfitabilityFilterProps, IOwnOption>(
  setDisplayName('ProfitabilityFormFilter'),
  withUser,
  withForm,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(ProfitabilityFormFilterView);