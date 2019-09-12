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

import { IKPIAssignGetAllFilter } from '@kpi/classes/filter';
import { ICollectionValue } from '@layout/classes/core';
import { KPIAssignFilterView } from './KPIAssignFilterView';

export type IKPIAssignFilterResult = Pick<IKPIAssignGetAllFilter, 'isFinal'>;

const finalStatus: ICollectionValue[] = [
  { value: 'true', name: 'Final' },
  { value: 'false', name: 'Not Final' }
];

interface IOwnOption {
  isOpen: boolean;
  initialProps?: IKPIAssignFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IKPIAssignFilterResult) => void;
}

interface IOwnState {
  finalStatus: ICollectionValue[];

  // filter final
  isFilterFinalOpen: boolean;
  filterFinal?: ICollectionValue;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter final
  setFilterFinalVisibility: StateHandler<IOwnState>;
  setFilterFinal: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter final
  handleFilterFinalVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnSelected: (data: ICollectionValue) => void;
  handleFilterFinalOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterFinalOnClose: () => void;
}

export type KPIAssignFilterProps
  = IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<KPIAssignFilterProps, IOwnState> = (): IOwnState => ({
  finalStatus,

  isFilterFinalOpen: false,
});

const stateUpdaters: StateUpdaters<KPIAssignFilterProps, IOwnState, IOwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterFinal: undefined,
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

const handlerCreators: HandleCreators<KPIAssignFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: KPIAssignFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: KPIAssignFilterProps) => () => {
    props.onApply({
      isFinal: props.filterFinal && props.filterFinal.value && props.filterFinal.value === 'true' ? true : (props.filterFinal && props.filterFinal.value === 'false' ? false : undefined ),
    });
  },

  // filter completion
  handleFilterFinalVisibility: (props: KPIAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
  handleFilterFinalOnSelected: (props: KPIAssignFilterProps) => (data: ICollectionValue) => {
    props.setFilterFinal(data);
  },
  handleFilterFinalOnClear: (props: KPIAssignFilterProps) => () => {
    props.setFilterFinal();
  },
  handleFilterFinalOnClose: (props: KPIAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<KPIAssignFilterProps, IOwnState> = { 
  componentDidMount() {
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { isFinal } = this.props.initialProps;

      // filter completion
      if (isFinal) {
        const selected = finalStatus.find(item => item.value === status);

        this.props.setFilterFinal(selected);
      }
    }
  }
};

export const KPIAssignFilter = compose<KPIAssignFilterProps, IOwnOption>(
  setDisplayName('KPIAssignFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(KPIAssignFilterView);