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
import { IKPIApprovalGetAllFilter } from '@kpi/classes/filter';
import { ICollectionValue } from '@layout/classes/core';
import { ILookupCompany } from '@lookup/classes';
import { KPIApprovalFilterView } from './KPIApprovalFilterView';

export type IKPIApprovalFilterResult = Pick<IKPIApprovalGetAllFilter, 'companyUid' | 'statusTypes' | 'status' | 'isFinal'>;

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
  initialProps?: IKPIApprovalFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IKPIApprovalFilterResult) => void;
}

interface IOwnState {
  finalStatus: ICollectionValue[];
  completionStatus: ICollectionValue[];
  
  // filter company
  isFilterCompanyOpen: boolean;
  filterCompany?: ILookupCompany;
  
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

  // filter company
  setFilterCompanyVisibility: StateHandler<IOwnState>;
  setFilterCompany: StateHandler<IOwnState>;

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

  // filter company
  handleFilterCompanyVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnSelected: (data: ILookupCompany) => void;
  handleFilterCompanyOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompanyOnClose: () => void;

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

export type KPIApprovalFilterProps
  = IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithLookupCompany
  & WithCommonSystem
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<KPIApprovalFilterProps, IOwnState> = (): IOwnState => ({
  finalStatus,
  completionStatus,

  isFilterCompanyOpen: false,
  isFilterStatusOpen: false,
  isFilterCompletionOpen: false,
  isFilterFinalOpen: false,
});

const stateUpdaters: StateUpdaters<KPIApprovalFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterStatus: undefined,
    filterCompletion: { value: 'pending', name: 'Pending' },
    filterFinal: undefined,
  }),

  // filter company
  setFilterCompanyVisibility: (prevState: IOwnState) => () => ({
    isFilterCompanyOpen: !prevState.isFilterCompanyOpen
  }),
  setFilterCompany: () => (data?: ILookupCompany) => ({
    isFilterCompanyOpen: false,
    filterCompany: data,
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

const handlerCreators: HandleCreators<KPIApprovalFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: KPIApprovalFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: KPIApprovalFilterProps) => () => {
    props.onApply({
      companyUid: props.filterCompany && props.filterCompany.uid,
      statusTypes: props.filterStatus && props.filterStatus.type,
      status: props.filterCompletion && props.filterCompletion.value,
      isFinal: props.filterFinal && props.filterFinal.value && props.filterFinal.value === 'true' ? true : (props.filterFinal && props.filterFinal.value === 'false' ? false : undefined ),
    });
  },

  // filter company
  handleFilterCompanyVisibility: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  handleFilterCompanyOnSelected: (props: KPIApprovalFilterProps) => (data: ILookupCompany) => {
    props.setFilterCompany(data);
  },
  handleFilterCompanyOnClear: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompany();
  },
  handleFilterCompanyOnClose: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompanyVisibility();
  },
  
  // filter status
  handleFilterStatusVisibility: (props: KPIApprovalFilterProps) => () => {
    props.setFilterStatusVisibility();
  },
  handleFilterStatusOnSelected: (props: KPIApprovalFilterProps) => (data: ISystemList) => {
    props.setFilterStatus(data);
  },
  handleFilterStatusOnClear: (props: KPIApprovalFilterProps) => () => {
    props.setFilterStatus();
  },
  handleFilterStatusOnClose: (props: KPIApprovalFilterProps) => () => {
    props.setFilterStatusVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: KPIApprovalFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompletion({ value: 'pending', name: 'Pending' });
  },
  handleFilterCompletionOnClose: (props: KPIApprovalFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },

  // filter final
  handleFilterFinalVisibility: (props: KPIApprovalFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
  handleFilterFinalOnSelected: (props: KPIApprovalFilterProps) => (data: ICollectionValue) => {
    props.setFilterFinal(data);
  },
  handleFilterFinalOnClear: (props: KPIApprovalFilterProps) => () => {
    props.setFilterFinal();
  },
  handleFilterFinalOnClose: (props: KPIApprovalFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIApprovalFilterProps, IOwnState> = { 
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { companyUid, statusTypes, status, isFinal } = this.props.initialProps;

      // filter customer
      if (companyUid) {
        const { response } = this.props.lookupCompanyState.list;

        if (response && response.data) {
          const selected = response.data.find(item => item.uid === companyUid);

          this.props.setFilterCompany(selected);
        }
      }

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

export const KPIApprovalFilter = compose<KPIApprovalFilterProps, IOwnOption>(
  setDisplayName('KPIApprovalFilter'),
  withLayout,
  withLookupCompany,
  withCommonSystem,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(KPIApprovalFilterView);