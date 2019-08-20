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

import { INotifPeriodGetAllFilter } from '@hr.notification/classes/filters/period';
import { WithNotifPeriod, withNotifPeriod } from '@hr.notification/hoc/withNotifPeriod';
import { ICollectionValue } from '@layout/classes/core';
import { NotifPeriodListFilterView } from './NotifPeriodListFilterView';

const periodTypes: ICollectionValue[] = [
  { value: 'birthday', name: 'Birthday' },
  { value: 'contract', name: 'Contract' }
];

export type INotifPeriodListFilterResult = Pick<INotifPeriodGetAllFilter, 'type'>;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: INotifPeriodListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: INotifPeriodListFilterResult) => void;
}

interface IOwnState {
  periodTypes: ICollectionValue[];

  // filter type
  isFilterTypeOpen: boolean;
  filterType?: ICollectionValue;
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
  handleFilterTypeOnSelected: (data: ICollectionValue) => void;
  handleFilterTypeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterTypeOnClose: () => void;
}

export type NotifPeriodListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithUser
  & WithNotifPeriod
  & InjectedIntlProps;

const createProps: mapper<NotifPeriodListFilterProps, IOwnState> = (): IOwnState => ({
  periodTypes,
  isFilterTypeOpen: false,
});

const stateUpdaters: StateUpdaters<NotifPeriodListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: () => () => ({
    filterType: undefined
  }),

  // filter type
  setFilterTypeVisibility: (prevState: IOwnState) => () => ({
    isFilterTypeOpen: !prevState.isFilterTypeOpen
  }),
  setFilterType: () => (data?: ICollectionValue) => ({
    isFilterTypeOpen: false,
    filterType: data
  })
};

const handlerCreators: HandleCreators<NotifPeriodListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: NotifPeriodListFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: NotifPeriodListFilterProps) => () => {
    props.onApply({
      type: props.filterType && props.filterType.value
    });
  },

  // filter type
  handleFilterTypeVisibility: (props: NotifPeriodListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
  handleFilterTypeOnSelected: (props: NotifPeriodListFilterProps) => (data: ICollectionValue) => {
    props.setFilterType(data);
  },
  handleFilterTypeOnClear: (props: NotifPeriodListFilterProps) => () => {
    props.setFilterType();
  },
  handleFilterTypeOnClose: (props: NotifPeriodListFilterProps) => () => {
    props.setFilterTypeVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<NotifPeriodListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { type } = this.props.initialProps;

      // filter project type
      if (type) {
        const { response } = this.props.notifPeriodState.all;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.type === type);
          
          this.props.setFilterType(selected); 
        }
      }
    }
  }
};

export const NotifPeriodListFilter = compose<NotifPeriodListFilterProps, IOwnOption>(
  setDisplayName('NotifPeriodListFilter'),
  withUser,
  withNotifPeriod,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(NotifPeriodListFilterView);