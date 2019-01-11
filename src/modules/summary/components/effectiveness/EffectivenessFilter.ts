import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployee } from '@account/classes/response';
import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { IProjectList } from '@project/classes/response';
import styles from '@styles';
import { ISummaryEffectivenessFilter } from '@summary/classes/filters';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { EffectivenessFilterView } from './EffectivenessFilterView';

export type IEffectivenessFilterResult = Pick<ISummaryEffectivenessFilter, 'employeeUid' | 'projectUid'>;

interface OwnOption {
  className: string;
  isLoading: boolean;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
  onApply: (filter: IEffectivenessFilterResult) => void;
}

interface OwnHandler {
  // main filter
  handleFilterOnReset: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterOnApply: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;

  // filter employee
  handleFilterEmployeeVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnSelected: (employee: IEmployee) => void;
  handleFilterEmployeeOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterEmployeeOnClose: () => void;

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;
}

interface OwnState {
  isFilterDialogOpen: boolean;
  
  // filter employee
  isFilterEmployeeOpen: boolean;
  filterEmployee?: IEmployee;

  // filter Employee Dialog
  filterEmployeeDialog: IEmployeeListFilter;
  
  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter Project Dialog
  filterProjectDialog: IProjectAssignmentGetListFilter;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  // main filter
  setFilterReset: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;

  // filter employee
  setFilterEmployeeVisibility: StateHandler<OwnState>;
  setFilterEmployee: StateHandler<OwnState>;

  // filter project
  setFilterProjectVisibility: StateHandler<OwnState>;
  setFilterProject: StateHandler<OwnState>;

}

export type EffectivenessFilterProps 
  = WithForm
  & WithLayout
  & InjectedIntlProps
  & OwnOption
  & OwnHandler
  & OwnState
  & WithUser
  & OwnStateUpdaters
  & WithStyles<typeof styles>;
  
const createProps: mapper<EffectivenessFilterProps, OwnState> = (props: EffectivenessFilterProps): OwnState => {
  return { 
    isFilterDialogOpen: false,
    isFilterEmployeeOpen: false,
    isFilterProjectOpen: false,

    // default filter employee dialog
    filterEmployeeDialog: {
      companyUids: props.userState.user && props.userState.user.company.uid
    },

    // default filter project dialog
    filterProjectDialog: {
      employeeUid: undefined
    }
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  // main filter
  setFilterReset: (prevState: OwnState) => () => ({
    filterEmployee: undefined,
    filterProject: undefined,
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterDialogOpen: !prevState.isFilterDialogOpen
  }),

  // filter employee
  setFilterEmployeeVisibility: (prevState: OwnState) => () => ({
    isFilterEmployeeOpen: !prevState.isFilterEmployeeOpen
  }),
  setFilterEmployee: (prevState: OwnState) => (employee?: IEmployee) => ({
    isFilterEmployeeOpen: false,
    filterEmployee: employee,

    filterProjectDialog: {
      employeeUid: employee && employee.uid
    }
  }),

  // filter project
  setFilterProjectVisibility: (prevState: OwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: (prevState: OwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project,
  }),
};

const handlerCreators: HandleCreators<EffectivenessFilterProps, OwnHandler> = {
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
  handleFilterEmployeeOnSelected: (props: EffectivenessFilterProps) => (employee: IEmployee) => {
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

export const EffectivenessFilter = compose<EffectivenessFilterProps, OwnOption>(
  withUser,
  withLayout,
  withForm,
  injectIntl,
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<EffectivenessFilterProps, OwnHandler>(handlerCreators)
)(EffectivenessFilterView);