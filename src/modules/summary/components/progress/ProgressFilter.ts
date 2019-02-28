import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomer } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectList } from '@project/classes/response';
import styles from '@styles';
import { ISummaryGetProgressRequest } from '@summary/classes/queries';
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

import { ProgressFilterView } from './ProgressFilterView';

export type IProgressFilterResult = Pick<ISummaryGetProgressRequest, 'customerUid' | 'projectUid'>;

interface OwnOption {
  className: string;
  isLoading: boolean;
  isStartup: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IProgressFilterResult) => void;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;

  // filter customer
  handleFilterCustomerVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnSelected: (customer: ICustomer) => void;
  handleFilterCustomerOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnClose: () => void;

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;
}

interface OwnState {
  isFilterDialogOpen: boolean;
  
  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomer;
  
  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter Project Dialog
  filterProjectDialog: IProjectRegistrationGetListFilter;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<OwnState>;
  setFilterCustomer: StateHandler<OwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<OwnState>;
  setFilterProject: StateHandler<OwnState>;

}

export type ProgressFilterProps 
  = WithForm
  & WithStyles<typeof styles>
  & WithUser
  & OwnStateUpdaters
  & OwnOption
  & OwnHandler
  & OwnState
  & InjectedIntlProps;
  
const createProps: mapper<ProgressFilterProps, OwnState> = (props: ProgressFilterProps): OwnState => {
  return { 
    isFilterDialogOpen: true,
    isFilterCustomerOpen: false,
    isFilterProjectOpen: false,

    // default filter project dialog
    filterProjectDialog: {
      customerUids: undefined,
      activeOnly: true,
      orderBy: 'uid',
      direction: 'descending',
    }
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  // main filter
  setFilterReset: () => () => ({
    filterCustomer: undefined,
    filterProject: undefined,
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterDialogOpen: !prevState.isFilterDialogOpen
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: OwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: () => (customer?: ICustomer) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer,
    filterProjectDialog: {
      customerUids: customer && customer.uid,
      activeOnly: true,
      orderBy: 'uid',
      direction: 'descending',
    }
  }),

  // filter project
  setFilterProjectVisibility: (prevState: OwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: () => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project,
  }),
};

const handlerCreators: HandleCreators<ProgressFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ProgressFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ProgressFilterProps) => () => {
    if (props.filterCustomer && props.filterProject) {
      props.onApply({
        customerUid: props.filterCustomer.uid,
        projectUid: props.filterProject.uid,
      });
      props.setFilterVisibility();
    }
  },
  handleFilterVisibility: (props: ProgressFilterProps) => () => {
    props.setFilterVisibility();
  },

  // filter employee
  handleFilterCustomerVisibility: (props: ProgressFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: ProgressFilterProps) => (customer: ICustomer) => {
    props.setFilterCustomer(customer);
    props.setFilterProject();
  },
  handleFilterCustomerOnClear: (props: ProgressFilterProps) => () => {
    props.setFilterCustomer();
    props.setFilterProject();
  },
  handleFilterCustomerOnClose: (props: ProgressFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter project
  handleFilterProjectVisibility: (props: ProgressFilterProps) => () => {
    props.setFilterProjectVisibility();
  },
  handleFilterProjectOnSelected: (props: ProgressFilterProps) => (project: IProjectList) => {
    props.setFilterProject(project);
  },
  handleFilterProjectOnClear: (props: ProgressFilterProps) => () => {
    props.setFilterProject();
  },
  handleFilterProjectOnClose: (props: ProgressFilterProps) => () => {
    props.setFilterProjectVisibility();
  },
};

export const ProgressFilter = compose<ProgressFilterProps, OwnOption>(
  setDisplayName('ProgressFilter'),
  withUser,
  withForm,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators)
)(ProgressFilterView);