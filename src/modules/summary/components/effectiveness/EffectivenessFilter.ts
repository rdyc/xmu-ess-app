import { IEmployee } from '@account/classes/response';
import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectList } from '@project/classes/response';
import styles from '@styles';
import { ISummaryEffectivenessFilter } from '@summary/classes/filters';
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

import { EffectivenessFilterView } from './EffectivenessFilterView';

export type IEffectivenessFilterResult = Pick<ISummaryEffectivenessFilter, 'employeeUid' | 'projectUid'>;

interface IOwnOption {
  className: string;
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IEffectivenessFilterResult) => void;
}

interface IOwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;

  // filter employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (employee?: IEmployee) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;
}

interface IOwnState {
  isFilterDialogOpen: boolean;
  
  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IEmployee;
  
  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  // main filter
  setFilterReset: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;

  // filter employee
  setFilterEmployeeVisibility: StateHandler<IOwnState>;
  setFilterEmployee: StateHandler<IOwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<IOwnState>;
  setFilterProject: StateHandler<IOwnState>;
}

export type EffectivenessFilterProps 
  = WithForm
  & WithUser
  & WithStyles<typeof styles>
  & InjectedIntlProps
  & IOwnOption
  & IOwnHandler
  & IOwnState
  & IOwnStateUpdaters;
  
const createProps: mapper<EffectivenessFilterProps, IOwnState> = (props: EffectivenessFilterProps): IOwnState => {
  return { 
    isFilterDialogOpen: false,
    isFilterEmployeeOpen: false,
    isFilterProjectOpen: false
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
  // main filter
  setFilterReset: (prevState: IOwnState) => () => ({
    filterEmployee: undefined,
    filterProject: undefined,
  }),
  setFilterVisibility: (prevState: IOwnState) => () => ({
    isFilterDialogOpen: !prevState.isFilterDialogOpen
  }),

  // filter employee
  setFilterEmployeeVisibility: (prevState: IOwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: (prevState: IOwnState) => (employee?: IEmployee) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: employee
  }),

  // filter project
  setFilterProjectVisibility: (prevState: IOwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: (prevState: IOwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project,
  }),
};

const handlerCreators: HandleCreators<EffectivenessFilterProps, IOwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      employeeUid: props.filterEmployee && props.filterEmployee.uid,
      projectUid: props.filterProject && props.filterProject.uid,
    });
    props.setFilterVisibility();
  },
  handleFilterVisibility: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
  },

  // filter employee
  handleFilterEmployeeVisibility: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEmployeeVisibility();
  },
  handleFilterEmployeeOnSelected: (props: EffectivenessFilterProps) => (employee?: IEmployee) => {
    props.setFilterEmployee(employee);
    props.setFilterProject();
  },
  handleFilterEmployeeOnClear: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterEmployee();
    props.setFilterProject();
  },
  handleFilterEmployeeOnClose: (props: EffectivenessFilterProps) => () => {
    props.setFilterEmployeeVisibility();
  },

  // filter project
  handleFilterProjectVisibility: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProjectVisibility();
  },
  handleFilterProjectOnSelected: (props: EffectivenessFilterProps) => (project: IProjectList) => {
    props.setFilterProject(project);
  },
  handleFilterProjectOnClear: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterProject();
  },
  handleFilterProjectOnClose: (props: EffectivenessFilterProps) => () => {
    props.setFilterProjectVisibility();
  },
};

export const EffectivenessFilter = compose<EffectivenessFilterProps, IOwnOption>(
  setDisplayName('EffectivenessFilter'),
  withUser,
  withForm,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  withStyles(styles),
  injectIntl
)(EffectivenessFilterView);