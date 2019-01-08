import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
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

export type IEffectivenessFilterResult = Pick<ISummaryEffectivenessFilter, 'projectUid'>;

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

  // filter project
  handleFilterProjectVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnSelected: (project: IProjectList) => void;
  handleFilterProjectOnClear: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterProjectOnClose: () => void;
}

interface OwnState {
  isFilterDialogOpen: boolean;
  
  // filter project
  isFilterProjectOpen: boolean;
  filterProject?: IProjectList;

  // filter Project Dialog
  filterProjectDialog: IProjectRegistrationGetListFilter;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;

  // main filter
  setFilterReset: StateHandler<OwnState>;
  setFilterVisibility: StateHandler<OwnState>;

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
    isFilterProjectOpen: false,

    // default filter project dialog
    filterProjectDialog: {
      customerUids: undefined
    }
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),

  // main filter
  setFilterReset: (prevState: OwnState) => () => ({
    filterProject: undefined,
  }),
  setFilterVisibility: (prevState: OwnState) => () => ({
    isFilterDialogOpen: !prevState.isFilterDialogOpen
  }),

  // filter project
  setFilterProjectVisibility: (prevState: OwnState) => () => ({
    isFilterProjectOpen: !prevState.isFilterProjectOpen
  }),
  setFilterProject: (prevState: OwnState) => (project?: IProjectList) => ({
    isFilterProjectOpen: false,
    filterProject: project
  }),
};

const handlerCreators: HandleCreators<EffectivenessFilterProps, OwnHandler> = {
  // main filter
  handleFilterOnReset: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterReset();
  },
  handleFilterOnApply: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.onApply({
      projectUid: props.filterProject && props.filterProject.uid,
    });
    props.setFilterVisibility();
  },
  handleFilterVisibility: (props: EffectivenessFilterProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setFilterVisibility();
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