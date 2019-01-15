import { IResponseCollection } from '@generic/interfaces';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { ProjectRegistrationDialogView } from './ProjectRegistrationDialogView';

interface IOwnOptions {
  value?: string | undefined;
  filter?: IProjectRegistrationGetListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (project: IProjectList) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterProjects: (response: IResponseCollection<IProjectList> | undefined) => IProjectList[];
}

interface IOwnState {
  _value: string | undefined;
  _filter: IProjectRegistrationGetListFilter;
  _search: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setStateValue: StateHandler<IOwnState>;
  setStateSearch: StateHandler<IOwnState>;
  clearStateSearch: StateHandler<IOwnState>;
  changeProjectListFilter: StateHandler<IOwnState>;
}

export type LookupProjectDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithProjectRegistration
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => {
  const { value, filter} = props;

  return { 
    _value: value,
    _filter: {
      customerUids: filter && filter.customerUids,
      find: filter && filter.find,
      findBy: filter && filter.findBy,
      orderBy: filter && filter.orderBy || 'name',
      direction: filter && filter.direction || 'ascending',
      size: filter && filter.size || undefined,
    },
    _search: '',
  };
};

const stateUpdaters: StateUpdaters<IOwnOptions, IOwnState, IOwnStateUpdaters> = {
  setStateValue: (prevState: IOwnState) => (uid: string) => ({
    _value: uid
  }),
  setStateSearch: (prevState: IOwnState) => (value: string) => ({
    _search: value
  }),
  clearStateSearch: (prevState: IOwnState) => () => ({
    _search: ''
  }),
  changeProjectListFilter: (prevState: IOwnState) => (filter: IProjectRegistrationGetListFilter) => ({
    _filter: {
      customerUids: filter && filter.customerUids,
      find: filter && filter.find,
      findBy: filter && filter.findBy,
      orderBy: filter && filter.orderBy || 'name',
      direction: filter && filter.direction || 'ascending',
      size: filter && filter.size || undefined,
    }
  })
};

const handlerCreators: HandleCreators<LookupProjectDialogProps, IOwnHandlers> = {
  filterProjects: (props: LookupProjectDialogProps) => (response: IResponseCollection<IProjectList> | undefined): IProjectList[] => {
    const { _search } = props;

    let result: IProjectList[] = [];

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
  searchOnChange: (props: LookupProjectDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: LookupProjectDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupProjectDialogProps, IOwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.projectRegisterState.list;
    const { loadListRequest } = this.props.projectRegisterDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: _filter
      });
    }
  },
  componentWillReceiveProps(nextProps: LookupProjectDialogProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.projectRegisterDispatch;
      const { filter, changeProjectListFilter } = nextProps;
      
      changeProjectListFilter({filter});
      loadListRequest({filter});
    }
  }
};

export const ProjectRegistrationDialog = compose<LookupProjectDialogProps, IOwnOptions>(
  setDisplayName('ProjectRegistrationDialog'),
  withLayout,
  withStyles(styles),
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectRegistrationDialogView);