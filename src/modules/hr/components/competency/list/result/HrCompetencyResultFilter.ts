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
import { HrCompetencyResultFilterView } from './HrCompetencyResultFilterView';

export type IHrCompetencyResultFilterResult = Pick<IHrCompetencyEmployeeGetAllFilter, 'status'>;

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyResultFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyResultFilterResult) => void;
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

export type HrCompetencyResultFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyResultFilterProps, IOwnState> = (props: HrCompetencyResultFilterProps): IOwnState => {
  return {
    completionStatus,
    isFilterCompletionOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyResultFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: HrCompetencyResultFilterProps) => () => ({
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

const handlerCreators: HandleCreators<HrCompetencyResultFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      status: props.filterCompletion && props.filterCompletion.value,
    });
  },
  handleFilterVisibility: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: HrCompetencyResultFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: HrCompetencyResultFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({value: 'pending', name: 'Pending'});
  },
  handleFilterCompletionOnClose: (props: HrCompetencyResultFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyResultFilterProps, IOwnState> = {
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

export const HrCompetencyResultFilter = compose<HrCompetencyResultFilterProps, IOwnOption>(
  setDisplayName('HrCompetencyResultFilter'),
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(HrCompetencyResultFilterView);
