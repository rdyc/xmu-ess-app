import { ISystemList } from '@common/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectAcceptanceGetAllFilter } from '@project/classes/filters/acceptance';
import styles from '@styles';
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

import { ProjectAcceptanceListFilterView } from './ProjectAcceptanceListFilterView';

export type IProjectAcceptanceListFilterResult = Pick<IProjectAcceptanceGetAllFilter, 'customerUids' | 'projectTypes' | 'statusTypes' | 'projectUid' | 'activeOnly'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IProjectAcceptanceListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IProjectAcceptanceListFilterResult) => void;
}

interface IOwnState {
  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter type
  isFilterTypeOpen: boolean;
  filterType?: ISystemList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter active
  filterActive?: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter type
  setFilterTypeVisibility: StateHandler<IOwnState>;
  setFilterType: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;
  
  // filter active
  setFilterActive: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter customer
  handleFilterCustomerVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnSelected: (customer: ICustomerList) => void;
  handleFilterCustomerOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCustomerOnClose: () => void;

  // filter type
  handleFilterTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnSelected: (data: ISystemList) => void;
  handleFilterTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnClose: () => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;

  // filter active
  handleFilterActiveOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ProjectAcceptanceListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<ProjectAcceptanceListFilterProps, IOwnState> = (props: ProjectAcceptanceListFilterProps): IOwnState => ({
  isFilterCustomerOpen: false,
  isFilterTypeOpen: false,
  isFilterStatusOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterActive: props.initialProps && props.initialProps.activeOnly,
});

const stateUpdaters: StateUpdaters<ProjectAcceptanceListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterType: undefined,
    filterStatus: undefined,
    filterActive: undefined
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer
  }),

  // filter type
  setFilterTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterTypeOpen: !prevState.isFilterTypeOpen
  }),
  setFilterType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterTypeOpen: false,
    filterType: data
  }),

  // filter status
  setFilterStatusVisibility: (prevState: IOwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter active
  setFilterActive: (prevState: IOwnState) => (checked: boolean) => ({
    filterActive: checked
  })
};

const handlerCreators: HandleCreators<ProjectAcceptanceListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUids: props.filterCustomer && [props.filterCustomer.uid],
      projectTypes: props.filterType && [props.filterType.type],
      statusTypes: props.filterStatus && [props.filterStatus.type],
      // projectUid: props.filterProject && props.filterProject.uid,
      activeOnly: props.filterActive
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: ProjectAcceptanceListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: ProjectAcceptanceListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter type
  handleFilterTypeVisibility: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: ProjectAcceptanceListFilterProps) => (data: ISystemList) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: ProjectAcceptanceListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: ProjectAcceptanceListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: ProjectAcceptanceListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: ProjectAcceptanceListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  
  // filter rejected
  handleFilterActiveOnChange: (props: ProjectAcceptanceListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterActive(checked);
  }
};

export const ProjectAcceptanceListFilter = compose<ProjectAcceptanceListFilterProps, IOwnOption>(
  setDisplayName('ProjectAcceptanceListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(ProjectAcceptanceListFilterView);