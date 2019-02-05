import { ISystemList } from '@common/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetAllFilter } from '@project/classes/filters/registration';
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

import { ProjectRegistrationListFilterView } from './ProjectRegistrationListFilterView';

export type IProjectRegistrationListFilterResult = Pick<IProjectRegistrationGetAllFilter, 'customerUid' | 'projectType' | 'statusType' | 'isRejected' | 'isNewOwner'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IProjectRegistrationListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IProjectRegistrationListFilterResult) => void;
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

  // filter rejected
  filterRejected?: boolean;
  
  // filter new owner
  filterNewOwner?: boolean;
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
  
  // filter rejected
  setFilterRejected: StateHandler<IOwnState>;
  
  // filter rejected
  setFilterNewOwner: StateHandler<IOwnState>;
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

  // filter rejected
  handleFilterRejectedOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;

  // filter new owner
  handleFilterNewOwnerOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type ProjectRegistrationListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithUser
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<ProjectRegistrationListFilterProps, IOwnState> = (props: ProjectRegistrationListFilterProps): IOwnState => ({
  isFilterCustomerOpen: false,
  isFilterTypeOpen: false,
  isFilterStatusOpen: false,

  // pass initial value for primitive types only, bellow is 'boolean'
  filterRejected: props.initialProps && props.initialProps.isRejected,
  filterNewOwner: props.initialProps && props.initialProps.isNewOwner
});

const stateUpdaters: StateUpdaters<ProjectRegistrationListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterType: undefined,
    filterStatus: undefined,
    filterNewOwner: undefined,
    filterRejected: undefined
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

  // filter rejected
  setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
    filterRejected: checked
  }),

  // filter new owner
  setFilterNewOwner: (prevState: IOwnState) => (checked: boolean) => ({
    filterNewOwner: checked
  }),
};

const handlerCreators: HandleCreators<ProjectRegistrationListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      projectType: props.filterType && props.filterType.type,
      statusType: props.filterStatus && props.filterStatus.type,
      isRejected: props.filterRejected,
      isNewOwner: props.filterNewOwner
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility();
  },
  handleFilterCustomerOnSelected: (props: ProjectRegistrationListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: ProjectRegistrationListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter type
  handleFilterTypeVisibility: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: ProjectRegistrationListFilterProps) => (data: ISystemList) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: ProjectRegistrationListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: ProjectRegistrationListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: ProjectRegistrationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: ProjectRegistrationListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  
  // filter rejected
  handleFilterRejectedOnChange: (props: ProjectRegistrationListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  },
  
  // filter new owner
  handleFilterNewOwnerOnChange: (props: ProjectRegistrationListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterNewOwner(checked);
  }
};

export const ProjectRegistrationListFilter = compose<ProjectRegistrationListFilterProps, IOwnOption>(
  setDisplayName('ProjectRegistrationListFilter'),
  withUser,
  withLayout,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles)
)(ProjectRegistrationListFilterView);