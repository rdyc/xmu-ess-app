import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { IProjectAssignmentList } from '@project/classes/response';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectAssignmentDialogView } from './ProjectAssignmentDialogView';

interface IOwnOptions {
  title: string;
  isOpen: boolean;
  value?: string;
  filter?: IProjectAssignmentGetListFilter;
  hideBackdrop?: boolean;
  onSelected: (project?: IProjectAssignmentList) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handelSearchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface IOwnState {
  search: string;
  projects?: IProjectAssignmentList[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setProjects: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
}

export type ProjectAssignmentDialogProps
  = WithTheme
  & WithStyles<typeof styles>
  & WithProjectAssignment
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: ''
});

const stateUpdaters: StateUpdaters<ProjectAssignmentDialogProps, IOwnState, IOwnStateUpdaters> = {
  setProjects: (state: IOwnState, props: ProjectAssignmentDialogProps) => () => {
    const { response } = props.projectAssignmentState.list;

    let projects: IProjectAssignmentList[] = [];

    if (response && response.data) {
      if (state.search.length > 0) {
        projects = response.data.filter(item => item.name.toLowerCase().indexOf(state.search) !== -1);
      } else {
        projects = response.data;
      }
    }
    
    return {
      projects
    };
  },
  setSearch: (state: IOwnState) => (value: string) => ({
    search: value.toLowerCase()
  }),
  clearSearch: (state: IOwnState) => () => ({
    search: ''
  })
};

const handlerCreators: HandleCreators<ProjectAssignmentDialogProps, IOwnHandlers> = {
  handleOnLoadApi: (props: ProjectAssignmentDialogProps) => () => {
    const { isLoading } = props.projectAssignmentState.list;
    const { loadListRequest } = props.projectAssignmentDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handelSearchOnChange: (props: ProjectAssignmentDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handleSearchOnKeyUp: (props: ProjectAssignmentDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentDialogProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.projectAssignmentState.list;

    if (!request) {
      this.props.handleOnLoadApi();
    }
  },
  componentDidUpdate(prevProps: ProjectAssignmentDialogProps) {
    if (
      this.props.search !== prevProps.search ||
      this.props.projectAssignmentState.list.response !== prevProps.projectAssignmentState.list.response
      ) {
      this.props.setProjects();
    }

    const { request } = this.props.projectAssignmentState.list;

    if (request && request.filter) {
      // comparing some props
      const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});

      // then should update the list?
      if (shouldUpdate) {
        this.props.handleOnLoadApi();
      }
    }
  }
};

export const ProjectAssignmentDialog = compose<ProjectAssignmentDialogProps, IOwnOptions>(
  setDisplayName('ProjectAssignmentDialog'),
  withProjectAssignment,
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  injectIntl
)(ProjectAssignmentDialogView);