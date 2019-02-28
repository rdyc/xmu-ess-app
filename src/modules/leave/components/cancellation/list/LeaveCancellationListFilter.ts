import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ILeaveCancellationGetAllFilter } from '@leave/classes/filters/cancellation';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
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

import { LeaveCancellationListFilterView } from './LeaveCancellationListFilterView';

export type ILeaveCancellationListFilterResult = Pick<ILeaveCancellationGetAllFilter, 'employeeUid' >;

interface IOwnOption {
  isOpen: boolean;
  initialProps?: ILeaveCancellationListFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: ILeaveCancellationListFilterResult) => void;
}

interface IOwnState {
  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IEmployee;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;

  // filter Employee
  setFilterEmployeeVisibility: StateHandler<IOwnState>;
  setFilterEmployee: StateHandler<IOwnState>;

}

interface IOwnHandler {
  // mainfilter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter Employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (data?: IEmployee) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

}

export type LeaveCancellationListFilterProps 
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithTheme
  & WithUser 
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<LeaveCancellationListFilterProps, IOwnState> = (props: LeaveCancellationListFilterProps): IOwnState => ({
  isFilterEmployeeOpen: false,
});

const stateUpdaters: StateUpdaters<LeaveCancellationListFilterProps, IOwnState, IOwnStateUpdater> = { 
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterEmployee: undefined,
  }),

  // filter Employee
  setFilterEmployeeVisibility: (prevState: IOwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),

  setFilterEmployee: () => (data?: IEmployee) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: data
  }),
};

const handlerCreators: HandleCreators<LeaveCancellationListFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      employeeUid: props.filterEmployee && props.filterEmployee.uid,
    });
    props.setFilterVisibility();
  },

  handleFilterVisibility: (props: LeaveCancellationListFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

   // filter Employee
   handleFilterEmployeeVisibility: (props: LeaveCancellationListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: LeaveCancellationListFilterProps) => (data?: IEmployee) => {
    props.setFilterEmployee(data);
  },
  handleFilterEmployeeOnClear: (props: LeaveCancellationListFilterProps) => () => {
    props.setFilterEmployee();
  },
  handleFilterEmployeeOnClose: (props: LeaveCancellationListFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },
};

const lifecycles: ReactLifeCycleFunctions<LeaveCancellationListFilterProps, IOwnState> = {
  componentDidMount() { 
    // handling previous filter after leaving list page
    if (this.props.initialProps) {
      const { employeeUid } = this.props.initialProps;

      // filter project type
      if (employeeUid) {
        const { response } = this.props.accountEmployeeState.list;
        
        if (response && response.data) {
          const selected = response.data.find(item => item.uid === employeeUid);
          
          this.props.setFilterEmployee(selected);
        }
      }
    }
  }
};

export const LeaveCancellationListFilter = compose<LeaveCancellationListFilterProps, IOwnOption>(
  setDisplayName('LeaveCancellationListFilter'),
  withStyles(styles),
  withUser,
  injectIntl,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveCancellationListFilterView);