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

import { isNullOrUndefined } from 'util';
import { ProjectRegistrationDialogView } from './ProjectRegistrationDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: IProjectRegistrationGetListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (project: IProjectList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterProjects: (response: IResponseCollection<IProjectList> | undefined) => IProjectList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: IProjectRegistrationGetListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
  changeProjectListFilter: StateHandler<OwnState>;
}

export type LookupProjectDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithProjectRegistration
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
  changeProjectListFilter: (prevState: OwnState) => (filter: IProjectRegistrationGetListFilter) => ({
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

const handlerCreators: HandleCreators<LookupProjectDialogProps, OwnHandlers> = {
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

const lifecycles: ReactLifeCycleFunctions<LookupProjectDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.projectRegisterState.list;
    const { loadListRequest } = this.props.projectRegisterDispatch;

    if (!isLoading && !response && !isNullOrUndefined(_filter.customerUids)) {
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

export const ProjectRegistrationDialog = compose<LookupProjectDialogProps, OwnOptions>(
  setDisplayName('ProjectRegistrationDialog'),
  withLayout,
  withStyles(styles),
  withProjectRegistration,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProjectRegistrationDialogView);