import { ISystemList } from '@common/classes/response';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ILeaveCancellationGetAllFilter } from '@leave/classes/filters/cancellation';
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

import { LeaveCancellationListFilterView } from './LeaveCancellationListFilterView';

export type ILeaveCancellationListFilterResult = Pick<ILeaveCancellationGetAllFilter, 'leaveType' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ILeaveCancellationListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILeaveCancellationListFilterResult) => void;
}

interface IOwnState {

  // filter type
  isFilterTypeOpen: boolean;
  filterType?: ISystemList;

}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter type
  setFilterTypeVisibility: StateHandler<IOwnState>;
  setFilterType: StateHandler<IOwnState>;

}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter type
  handleFilterTypeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnSelected: (data: ISystemList) => void;
  handleFilterTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnClose: () => void;

}

export type LeaveCancellationListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithLayout
  & InjectedIntlProps;

const createProps: mapper<LeaveCancellationListFilterProps, IOwnState> = (props: LeaveCancellationListFilterProps): IOwnState => ({
  isFilterTypeOpen: false
});

const stateUpdaters: StateUpdaters<LeaveCancellationListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterType: undefined,
  }),

  // filter type
  setFilterTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterTypeOpen: !prevState.isFilterTypeOpen
  }),
  setFilterType: (prevState: IOwnState) => (data?: ISystemList) => ({
    isFilterTypeOpen: false,
    filterType: data
  }),
};

const handlerCreators: HandleCreators<LeaveCancellationListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      leaveType: props.filterType && props.filterType.type,

    });
  },

  // filter type
  handleFilterTypeVisibility: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: LeaveCancellationListFilterProps) => (data: ISystemList) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: LeaveCancellationListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
};

export const LeaveCancellationListFilter = compose<LeaveCancellationListFilterProps, IOwnOption>(
  setDisplayName('LeaveCancellationListFilter'),
  withLayout,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators)
)(LeaveCancellationListFilterView);