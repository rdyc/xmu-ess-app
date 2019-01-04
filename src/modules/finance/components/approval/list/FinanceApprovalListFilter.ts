import { ISystemList } from '@common/classes/response';
import { IFinanceApprovalGetAllFilter } from '@finance/classes/filters/approval';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
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

import { WithUser, withUser } from '@layout/hoc/withUser';
import { FinanceApprovalListFilterView } from './FinanceApprovalListFilterView';

export type IFinanceApprovalListFilterResult = Pick<IFinanceApprovalGetAllFilter, 'moduleType' | 'financeStatusTypes' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IFinanceApprovalListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IFinanceApprovalListFilterResult) => void;
}

interface IOwnState {  
  // filter module
  isFilterModuleOpen: boolean;
  filterModule?: ISystemList;

  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter module
  setFilterModuleVisibility: StateHandler<IOwnState>;
  setFilterModule: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter module
  handleFilterModuleVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterModuleOnSelected: (data: ISystemList) => void;
  handleFilterModuleOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterModuleOnClose: () => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;
}

export type FinanceApprovalListFilterProps 
  = IOwnOption
  & WithUser
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<FinanceApprovalListFilterProps, IOwnState> = (): IOwnState => ({
  isFilterModuleOpen: false,
  isFilterStatusOpen: false,
});

const stateUpdaters: StateUpdaters<FinanceApprovalListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: () => () => ({
    filterModule: undefined,
    filterStatus: undefined,
  }),

  // filter module
  setFilterModuleVisibility: (prevState: IOwnState) => () => ({
    isFilterModuleOpen: !prevState.isFilterModuleOpen
  }),
  setFilterModule: () => (data?: ISystemList) => ({
    isFilterModuleOpen: false,
    filterModule: data
  }),

  // filter status
  setFilterStatusVisibility: (prevState: IOwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: () => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),
};

const handlerCreators: HandleCreators<FinanceApprovalListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: FinanceApprovalListFilterProps) => () => {
    props.onApply({
      moduleType: props.filterModule && props.filterModule.type,
      financeStatusTypes: props.filterStatus && props.filterStatus.type,
    });
  },
  
  // filter module
  handleFilterModuleVisibility: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterModuleVisibility();
  },
  handleFilterModuleOnSelected: (props: FinanceApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterModule(data);
  },
  handleFilterModuleOnClear: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterModule();
  },
  handleFilterModuleOnClose: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterModuleVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: FinanceApprovalListFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: FinanceApprovalListFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
};

export const FinanceApprovalListFilter = compose<FinanceApprovalListFilterProps, IOwnOption>(
  setDisplayName('FinanceApprovalListFilter'),
  withUser,
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(FinanceApprovalListFilterView);