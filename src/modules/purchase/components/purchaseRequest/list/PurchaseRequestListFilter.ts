import { ISystemList } from '@common/classes/response';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICustomerList } from '@lookup/classes/response';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectList } from '@project/classes/response';
import { IPurchaseGetAllFilter } from '@purchase/classes/filters/purchaseRequest';
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
import { PurchaseRequestListFilterView } from './PurchaseRequestListFilterView';

export type IPurchaseRequestListFilterResult = Pick<IPurchaseGetAllFilter, 'customerUid' | 'isRejected' | 'isSettlement' | 'statusType' | 'projectUid' >;

interface IOwnOption {
  companyUid?: string; 
  customerUid?: string;
  isOpen: boolean;
  initialProps?: IPurchaseRequestListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IPurchaseRequestListFilterResult) => void;
}

interface IOwnState {
  // filter customer
  isFilterCustomerOpen: boolean;
  filterCustomer?: ICustomerList;

  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;

  // filter settlement
  filterSettlement?: boolean;
  
  // filter reject
  filterRejected?: boolean;
  
  customerPayload?: {
    companyUid: string;
  };

  projectPayload?: {
    customerUids: string[];
  };
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter customer
  setFilterCustomerVisibility: StateHandler<IOwnState>;
  setFilterCustomer: StateHandler<IOwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<IOwnState>;
  setFilterProject: StateHandler<IOwnState>;
  
  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter settlement
  setFilterSettlement: StateHandler<IOwnState>;

   // filter reject
  setFilterRejected: StateHandler<IOwnState>;
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

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (customer: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;

  // filter settlement
  handleFilterSettlementOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  
  // filter reject
  handleFilterRejectOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type PurchaseRequestListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<PurchaseRequestListFilterProps, IOwnState> = (props: PurchaseRequestListFilterProps): IOwnState => ({
  isFilterCustomerOpen: false,
  isFilterStatusOpen: false,
  isFilterProjectOpen: false,

  customerPayload: {
    companyUid: props.companyUid || ''
  },

  projectPayload: {
    customerUids: [props.customerUid || '']
  },

  // pass initial value for primitive types only, bellow is 'boolean'
  filterSettlement: props.initialProps && props.initialProps.isSettlement,
  filterRejected: props.initialProps && props.initialProps.isRejected
});

const stateUpdaters: StateUpdaters<PurchaseRequestListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterCustomer: undefined,
    filterProject: undefined,
    filterSettlement: undefined,
    filterRejected: undefined,
    filterStatus: undefined
  }),

  // filter customer
  setFilterCustomerVisibility: (prevState: IOwnState, props: PurchaseRequestListFilterProps) => () => ({
    isFilterCustomerOpen: !prevState.isFilterCustomerOpen,
    customerPayload: { companyUid: props.companyUid || '' }
  }),
  setFilterCustomer: (prevState: IOwnState) => (customer?: ICustomerList) => ({
    isFilterCustomerOpen: false,
    filterCustomer: customer
  }),

  // filter project
  setFilterProjectVisibility: (prevState: IOwnState, props: PurchaseRequestListFilterProps) => () => ({
    isFilterProjectOpen: !prevState.isFilterCustomerOpen,
    customerPayload: { companyUid: props.companyUid || '' }
  }),
  setFilterProject: (prevState: IOwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project
  }),

  // filter status
  setFilterStatusVisibility: (prevState: IOwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter settlement
  setFilterSettlement: (prevState: IOwnState) => (checked: boolean) => ({
    filterSettlement: checked
  }),

  // filter reject
  setFilterRejected: (prevState: IOwnState) => (checked: boolean) => ({
    filterRejected: checked
  }),
};

const handlerCreators: HandleCreators<PurchaseRequestListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      customerUid: props.filterCustomer && props.filterCustomer.uid,
      projectUid: props.filterProject && props.filterProject.uid,
      statusType: props.filterStatus && props.filterStatus.type,
      isSettlement: props.filterSettlement,
      isRejected: props.filterRejected,
    });
  },

  // filter customer
  handleFilterCustomerVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomerVisibility(); 
  },
  handleFilterCustomerOnSelected: (props: PurchaseRequestListFilterProps) => (customer: ICustomerList) => {
    props.setFilterCustomer(customer);
  },
  handleFilterCustomerOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCustomer();
  },
  handleFilterCustomerOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterCustomerVisibility();
  },

  // filter customer
  handleFilterProjectVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectVisibility(); 
  },
  handleFilterProjectOnSelected: (props: PurchaseRequestListFilterProps) => (project: IProjectList) => {
    props.setFilterProject(project);
  },
  handleFilterProjectOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProject();
  },
  handleFilterProjectOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterProjectVisibility();
  },

  // filter status
  handleFilterStatusVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: PurchaseRequestListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: PurchaseRequestListFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: PurchaseRequestListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion();
  },
  handleFilterCompletionOnClose: (props: PurchaseRequestListFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  
  // filter settlement
  handleFilterSettlementOnChange: (props: PurchaseRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterSettlement(checked);
  },

  // filter reject
  handleFilterRejectOnChange: (props: PurchaseRequestListFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterRejected(checked);
  }
};

export const PurchaseRequestListFilter = compose<PurchaseRequestListFilterProps, IOwnOption>(
  setDisplayName('PurchaseRequestListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(PurchaseRequestListFilterView);