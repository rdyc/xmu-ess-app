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

import { IEmployeeAllKPIFinalFilter } from '@account/classes/filters/employeeKPIFinal';
import { EmployeeFinalSubOrdinateFilterView } from './EmployeeFinalSubOrdinateFilterView';

export type IAccountEmployeeFilterResult = Pick<IEmployeeAllKPIFinalFilter, 'isActive'>;

interface OwnOption {
  isOpen: boolean;
  initialProps?: IAccountEmployeeFilterResult;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IAccountEmployeeFilterResult) => void;
}

interface OwnState {

  // filter status
  filterStatus?: boolean; 
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;

  // filter status
  setFilterStatus: StateHandler<OwnState>;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;

  // filter status
  handleFilterStatusOnChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}

export type EmployeeAssignSubOrdinateFilterProps
  = OwnOption
  & OwnState
  & OwnHandler
  & OwnStateUpdater
  & WithLookupCompany
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<EmployeeAssignSubOrdinateFilterProps, OwnState> = (props: EmployeeAssignSubOrdinateFilterProps): OwnState => ({
  filterStatus: props.initialProps && props.initialProps.isActive,
});

const stateUpdaters: StateUpdaters<EmployeeAssignSubOrdinateFilterProps, OwnState, OwnStateUpdater> = {
  // main filter
  setFilterReset: () => () => ({
    filterStatus: true,
  }),

  // filter status
  setFilterStatus: () => (checked: boolean) => ({
    filterStatus: checked
  }),
};

const handlerCreators: HandleCreators<EmployeeAssignSubOrdinateFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EmployeeAssignSubOrdinateFilterProps) => () => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EmployeeAssignSubOrdinateFilterProps) => () => {
    props.onApply({
      isActive: props.filterStatus,
    });
  },

  // filter status
  handleFilterStatusOnChange: (props: EmployeeAssignSubOrdinateFilterProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    props.setFilterStatus(checked);
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeAssignSubOrdinateFilterProps, OwnState> = { 
  componentDidMount() {
    //
  }
};

export const EmployeeAssignSubOrdinateFilter = compose<EmployeeAssignSubOrdinateFilterProps, OwnOption>(
  setDisplayName('EmployeeAssignSubOrdinateFilter'),
  withLayout,
  withLookupCompany,
  withStyles(styles),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(EmployeeFinalSubOrdinateFilterView);