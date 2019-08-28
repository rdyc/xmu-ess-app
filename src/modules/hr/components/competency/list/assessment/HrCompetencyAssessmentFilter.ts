import { IHrCompetencyAssessmentGetAllFilter } from '@hr/classes/filters';
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
import { HrCompetencyAssessmentFilterView } from './HrCompetencyAssessmentFilterView';

export type IHrCompetencyAssessmentFilterResult = Pick<IHrCompetencyAssessmentGetAllFilter, 'status'>;

const completionStatus: ICollectionValue[] = [
  { value: 'pending', name: 'Pending' },
  { value: 'complete', name: 'Complete' }
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IHrCompetencyAssessmentFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IHrCompetencyAssessmentFilterResult) => void;
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

export type HrCompetencyAssessmentFilterProps 
  = IOwnOption 
  & IOwnState 
  & IOwnHandler 
  & IOwnStateUpdater
  & WithStyles<typeof styles> 
  & WithUser 
  & InjectedIntlProps;

const createProps: mapper<HrCompetencyAssessmentFilterProps, IOwnState> = (props: HrCompetencyAssessmentFilterProps): IOwnState => {
  return {
    completionStatus,
    isFilterCompletionOpen: false,
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyAssessmentFilterProps, IOwnState, IOwnStateUpdater> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: IOwnState, props: HrCompetencyAssessmentFilterProps) => () => ({
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

const handlerCreators: HandleCreators<HrCompetencyAssessmentFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: HrCompetencyAssessmentFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: HrCompetencyAssessmentFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      status: props.filterCompletion && props.filterCompletion.value,
    });
  },
  handleFilterVisibility: (props: HrCompetencyAssessmentFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter completion
  handleFilterCompletionVisibility: (props: HrCompetencyAssessmentFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletionVisibility();
  },
  handleFilterCompletionOnSelected: (props: HrCompetencyAssessmentFilterProps) => (data: ICollectionValue) => {
    props.setFilterCompletion(data);
  },
  handleFilterCompletionOnClear: (props: HrCompetencyAssessmentFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterCompletion({value: 'pending', name: 'Pending'});
  },
  handleFilterCompletionOnClose: (props: HrCompetencyAssessmentFilterProps) => () => {
    props.setFilterCompletionVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyAssessmentFilterProps, IOwnState> = {
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

export const HrCompetencyAssessmentFilter = compose<HrCompetencyAssessmentFilterProps, IOwnOption>(
  setDisplayName('HrCompetencyAssessmentFilter'),
  withUser,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  withStyles(styles),
  lifecycle(lifecycles),
  injectIntl
)(HrCompetencyAssessmentFilterView);
