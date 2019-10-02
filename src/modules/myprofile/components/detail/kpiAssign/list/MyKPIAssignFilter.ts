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
import { MyKPIAssignFilterView } from './MyKPIAssignFilterView';

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

export type MyKPIAssignFilterProps
  = IOwnOption
  & IOwnState
  & IOwnHandler
  & IOwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<MyKPIAssignFilterProps, IOwnState> = (): IOwnState => ({
  finalStatus,

  isFilterFinalOpen: false,
});

const stateUpdaters: StateUpdaters<MyKPIAssignFilterProps, IOwnState, IOwnStateUpdater> = {
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

const handlerCreators: HandleCreators<MyKPIAssignFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: MyKPIAssignFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: MyKPIAssignFilterProps) => () => {
    props.onApply({
      isFinal: props.filterFinal && props.filterFinal.value && props.filterFinal.value === 'true' ? true : (props.filterFinal && props.filterFinal.value === 'false' ? false : undefined ),
    });
  },

  // filter completion
  handleFilterFinalVisibility: (props: MyKPIAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
  handleFilterFinalOnSelected: (props: MyKPIAssignFilterProps) => (data: ICollectionValue) => {
    props.setFilterFinal(data);
  },
  handleFilterFinalOnClear: (props: MyKPIAssignFilterProps) => () => {
    props.setFilterFinal();
  },
  handleFilterFinalOnClose: (props: MyKPIAssignFilterProps) => () => {
    props.setFilterFinalVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<MyKPIAssignFilterProps, IOwnState> = { 
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

export const MyKPIAssignFilter = compose<MyKPIAssignFilterProps, IOwnOption>(
  setDisplayName('MyKPIAssignFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(MyKPIAssignFilterView);