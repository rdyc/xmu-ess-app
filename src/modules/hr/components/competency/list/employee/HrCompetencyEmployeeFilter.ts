import { IHrCompetencyEmployeeGetAllFilter } from '@hr/classes/filters';
import { ICollectionValue } from '@layout/classes/core';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
import { HrCompetencyEmployeeFilterView } from './HrCompetencyEmployeeFilterView';

export type IHrCompetencyEmployeeFilterResult = Pick<IHrCompetencyEmployeeGetAllFilter, 'status'>;

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyEmployeeFilterResult) => void;
}

interface IOwnState {
  completionStatus: ICollectionValue[];

  // filter completion
  isFilterCompletionOpen: boolean;
  filterCompletion?: ICollectionValue;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;

  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter completion
  setFilterCompletionVisibility: StateHandler<IOwnState>;
  setFilterCompletion: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // mainfilter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter completion
  handleFilterCompletionVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnSelected: (data: ICollectionValue) => void;
  handleFilterCompletionOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterCompletionOnClose: () => void;
}

export type HrCompetencyEmployeeFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyEmployeeFilterProps, IOwnState> = (props: HrCompetencyEmployeeFilterProps): IOwnState => {
  return {
    completionStatus,
    isFilterCompletionOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyEmployeeFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: HrCompetencyEmployeeFilterProps) => () => ({
    filterCompletion: { value: 'pending', name: 'Pending'},
  }),

  // filter completion
  setFilterCompletionVisibility: (prevState: IOwnState) => () => ({
    isFilterCompletionOpen: !prevState.isFilterCompletionOpen
  }),
  setFilterCompletion: (prevState: IOwnState) => (data?: ICollectionValue) => ({
    isFilterCompletionOpen: false,
    filterCompletion: data
  }),
};

const handlerCreators: HandleCreators<HrCompetencyEmployeeFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyEmployeeFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyEmployeeFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      status: props.filterCompletion && props.filterCompletion.value,
    });
  },
  handleFilterVisibility: (props: HrCompetencyEmployeeFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: HrCompetencyEmployeeFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: HrCompetencyEmployeeFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: HrCompetencyEmployeeFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({value: 'pending', name: 'Pending'});
  },
  handleFilterCompletionOnClose: (props: HrCompetencyEmployeeFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyEmployeeFilterProps, IOwnState> = {
  componentDidMount() {
    if (this.props.initialProps) {
      const { status } = this.props.initialProps;

      // filter completion
      if (status) {
        const selected = completionStatus.find(item => item.value === status);
          
        this.props.setFilterCompletion(selected);
      }
    }
  },
};

export const HrCompetencyEmployeeFilter = compose<HrCompetencyEmployeeFilterProps, IOwnOption>(
  setDisplayName('HrCompetencyEmployeeFilter'),
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(HrCompetencyEmployeeFilterView);
