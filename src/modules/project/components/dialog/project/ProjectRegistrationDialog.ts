import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectList } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
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

import { ProjectRegistrationDialogView } from './ProjectRegistrationDialogView';

interface IOwnOptions {
  title: string;
  isOpen: boolean;
  value?: string;
  filter?: IProjectRegistrationGetListFilter;
  hideBackdrop?: boolean;
  onSelected: (project?: IProjectList) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface IOwnState {
  search: string;
  projects?: IProjectList[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setProjects: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
}

export type ProjectRegistrationDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithProjectRegistration
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: '',
});

const stateUpdaters: StateUpdaters<ProjectRegistrationDialogProps, IOwnState, IOwnStateUpdaters> = {
  setProjects: (state: IOwnState, props: ProjectRegistrationDialogProps) => () => {
    const { response } = props.projectRegisterState.list;

    let projects: IProjectList[] = [];

    if (response && response.data) {
      if (state.search.length > 0) {
        projects = response.data.filter(item => 
          item.uid.toLowerCase().indexOf(state.search) !== -1 ||
          item.name.toLowerCase().indexOf(state.search) !== -1 ||
          (item.customer && item.customer.name.toLowerCase().indexOf(state.search) !== -1 || false)
        );
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

const handlerCreators: HandleCreators<ProjectRegistrationDialogProps, IOwnHandlers> = {
  handleOnLoadApi: (props: ProjectRegistrationDialogProps) => () => {
    const { isLoading } = props.projectRegisterState.list;
    const { loadListRequest } = props.projectRegisterDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handleOnChangeSearch: (props: ProjectRegistrationDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handleOnKeyUpSearch: (props: ProjectRegistrationDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectRegistrationDialogProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.projectRegisterState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        } else {
          this.props.setProjects();
        }
      }
    }
  },
  componentDidUpdate(prevProps: ProjectRegistrationDialogProps) {
    const { request } = this.props.projectRegisterState.list;

    if (
      this.props.search !== prevProps.search ||
      this.props.projectRegisterState.list.response !== prevProps.projectRegisterState.list.response
      ) {
      this.props.setProjects();
    }
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

export const ProjectRegistrationDialog = compose<ProjectRegistrationDialogProps, IOwnOptions>(
  setDisplayName('ProjectRegistrationDialog'),
  withLayout,
  withProjectRegistration,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  injectIntl
)(ProjectRegistrationDialogView);