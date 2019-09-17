import { withLayout } from '@layout/hoc/withLayout';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { WithStyles, withStyles } from '@material-ui/core';
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

import { ISystemList } from '@common/classes/response';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { IKPIEmployeeGetAllFilter } from '@kpi/classes/filter';
import { ICollectionValue } from '@layout/classes/core';
import { KPIEmployeeFilterView } from './KPIEmployeeFilterView';

export type IKPIEmployeeFilterResult = Pick<IKPIEmployeeGetAllFilter, 'statusTypes' | 'status' | 'isFinal'>;

const finalStatus: ICollectionValue[] = [
  { value: 'true', name: 'Final' },
  { value: 'false', name: 'Not Final' }
];

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IKPIEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IKPIEmployeeFilterResult) => void;
}

interface IOwnState {
  finalStatus: ICollectionValue[];
  completionStatus: ICollectionValue[];
  
  // filter status
  isFilterStatusOpen: boolean;
  filterStatus?: ISystemList;
  
  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;

  // filter final
  isFilterFinalOpen: boolean;
  filterFinal?: ICollectionValue;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter status
  setFilterStatusVisibility: StateHandler<IOwnState>;
  setFilterStatus: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;

  // filter final
  setFilterFinalVisibility: StateHandler<IOwnState>;
  setFilterFinal: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter status
  handleFilterStatusVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnSelected: (data: ISystemList) => void;
  handleFilterStatusOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterStatusOnClose: () => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;

  // filter final
  handleFilterFinalVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnSelected: (data: ICollectionValue) => void;
  handleFilterFinalOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnClose: () => void;
}

export type KPIEmployeeFilterProps
  = IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithLookupCompany
  & WithCommonSystem
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<KPIEmployeeFilterProps, IOwnState> = (): IOwnState => ({
  finalStatus,
  completionStatus,

  isFilterStatusOpen: false,
  isFilterCompletionOpen: false,
  isFilterFinalOpen: false,
});

const stateUpdaters: StateUpdaters<KPIEmployeeFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterStatus: undefined,
    filterCompletion: { value: 'pending', name: 'Pending' },
    filterFinal: undefined,
  }),

  // filter status
  setFilterStatusVisibility: (prevState: IOwnState) => () => ({
    isFilterStatusOpen: !prevState.isFilterStatusOpen
  }),
  setFilterStatus: () => (data?: ISystemList) => ({
    isFilterStatusOpen: false,
    filterStatus: data
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: IOwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: () => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),

  // filter completion
  setFilterFinalVisibility: (prevState: IOwnState) => () => ({
    isFilterFinalOpen: !prevState.isFilterFinalOpen
  }),
  setFilterFinal: () => (data?: ICollectionValue) => ({
    isFilterFinalOpen: false,
    filterFinal: data
  }),
};

const handlerCreators: HandleCreators<KPIEmployeeFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: KPIEmployeeFilterProps) => () => {
    props.onApply({
      statusTypes: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isFinal: props.filterFinal && props.filterFinal.value && props.filterFinal.value === 'true' ? true : (props.filterFinal && props.filterFinal.value === 'false' ? false : undefined ),
    });
  },
  
  // filter status
  handleFilterStatusVisibility: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: KPIEmployeeFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: KPIEmployeeFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterCompletion({ value: 'pending', name: 'Pending' });
  },
  handleFilterCompletionOnClose: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter final
  handleFilterFinalVisibility: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
  handleFilterFinalOnSelected: (props: KPIEmployeeFilterProps) => (data: ICollectionValue) => {
    props.setFilterFinal(data);
  },
  handleFilterFinalOnClear: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterFinal();
  },
  handleFilterFinalOnClose: (props: KPIEmployeeFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIEmployeeFilterProps, IOwnState> = { 
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { statusTypes, status, isFinal } = this.props.initialProps;

      // filter status type
      if (statusTypes) {
        const { response } = this.props.commonStatusListState;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === statusTypes);
          
          this.props.setFilterStatus(selected);
        }
      }

      // filter completion
      if (status) {
        const selected = completionStatus.find(item => item.value === status);

        this.props.setFilterCompletion(selected);
      }

      // filter completion
      if (isFinal) {
        const selected = finalStatus.find(item => item.value === status);

        this.props.setFilterFinal(selected);
      }
    }
  }
};

export const KPIEmployeeFilter = compose<KPIEmployeeFilterProps, IOwnOption>(
  setDisplayName('KPIEmployeeFilter'),
  withLayout,
  withLookupCompany,
  withCommonSystem,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(KPIEmployeeFilterView);