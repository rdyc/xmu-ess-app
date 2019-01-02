import { IResponseCollection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectAssignmentList } from '@project/classes/response';
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

import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
import { isNullOrUndefined } from 'util';
import { ProjectAssignmentDialogView } from './ProjectAssignmentDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: IProjectAssignmentGetListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (project: IProjectAssignmentList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterProjects: (response: IResponseCollection<IProjectAssignmentList> | undefined) => IProjectAssignmentList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: IProjectAssignmentGetListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
  changeProjectListFilter: StateHandler<OwnState>;
}

export type ProjectAssignmentDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithProjectAssignment
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<OwnOptions, OwnState> = (props: OwnOptions): OwnState => {
  const { value, filter} = props;

  return { 
    _value: value,
    _filter: {
      customerUid: filter && filter.customerUid,
      employeeUid: filter && filter.employeeUid,
      projectTypes: filter && filter.projectTypes
    },
    _search: '',
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  setStateValue: (prevState: OwnState) => (uid: string) => ({
    _value: uid
  }),
  setStateSearch: (prevState: OwnState) => (value: string) => ({
    _search: value
  }),
  clearStateSearch: (prevState: OwnState) => () => ({
    _search: ''
  }),
  changeProjectListFilter: (prevState: OwnState) => (filter: IProjectAssignmentGetListFilter) => ({
    _filter: {
      customerUid: filter && filter.customerUid,
      employeeUid: filter && filter.employeeUid,
      projectTypes: filter && filter.projectTypes
    }
  })
};

const handlerCreators: HandleCreators<ProjectAssignmentDialogProps, OwnHandlers> = {
  filterProjects: (props: ProjectAssignmentDialogProps) => (response: IResponseCollection<IProjectAssignmentList> | undefined): IProjectAssignmentList[] => {
    const { _search } = props;

    let result: IProjectAssignmentList[] = [];

    if (response && response.data) {
      if (_search !== '') {
        result = response.data.filter(item => 
          item.name.toLowerCase().indexOf(_search || '') !== -1
        );
      } else {
        result = response.data;
      }
    }

    return result;
  },
  searchOnChange: (props: ProjectAssignmentDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: ProjectAssignmentDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<ProjectAssignmentDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.projectAssignmentState.list;
    const { loadListRequest } = this.props.projectAssignmentDispatch;

    if (!isLoading && !response && !isNullOrUndefined(_filter.customerUid)) {
      loadListRequest({
        filter: _filter
      });
    }
  },
  componentWillReceiveProps(nextProps: ProjectAssignmentDialogProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.projectAssignmentDispatch;
      const { filter, changeProjectListFilter } = nextProps;
      
      changeProjectListFilter({filter});
      loadListRequest({filter});
    }
  }
};

export const ProjectAssignmentDialog = compose<ProjectAssignmentDialogProps, OwnOptions>(
  setDisplayName('ProjectAssignmentDialog'),
  withLayout,
  withStyles(styles),
  withProjectAssignment,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectAssignmentDialogView);