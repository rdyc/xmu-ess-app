import { IResponseCollection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithStyles, withStyles } from '@material-ui/core';
import { IOrganizationHierarchyListFilter } from '@organization/classes/filters/hierarchy';
import { IHierarchyList } from '@organization/classes/response/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { isNullOrUndefined } from 'util';
import { OrganizationHierarchyDialogView } from './OrganizationHierarchyDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: IOrganizationHierarchyListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (project: IHierarchyList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterHierarchies: (response: IResponseCollection<IHierarchyList> | undefined) => IHierarchyList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: IOrganizationHierarchyListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
  changeHierarchyListFilter: StateHandler<OwnState>;
}

export type OrganizationHierarchyDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithOrganizationHierarchy
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<OwnOptions, OwnState> = (props: OwnOptions): OwnState => {
  const { value, filter } = props;

  return {
    _value: value,
    _filter: {
      companyUid: filter && filter.companyUid,
      orderBy: filter && filter.orderBy,
      direction: filter && filter.direction      
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
  changeHierarchyListFilter: (prevState: OwnState) => (filter: IOrganizationHierarchyListFilter) => ({
    _filter: {
      companyUid: filter && filter.companyUid,
      orderBy: filter && filter.orderBy || 'name',
      direction: filter && filter.direction || 'ascending',
    }
  })
};

const handlerCreators: HandleCreators<OrganizationHierarchyDialogProps, OwnHandlers> = {
  filterHierarchies: (props: OrganizationHierarchyDialogProps) => (response: IResponseCollection<IHierarchyList> | undefined): IHierarchyList[] => {
    const { _search } = props;

    let result: IHierarchyList[] = [];

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
  searchOnChange: (props: OrganizationHierarchyDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: OrganizationHierarchyDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.organizationHierarchyState.list;
    const { loadListRequest } = this.props.organizationHierarchyDispatch;

    if (!isLoading && !response && !isNullOrUndefined(_filter.companyUid)) {
      loadListRequest({
        filter: _filter
      });
    }
  },
  componentWillReceiveProps(nextProps: OrganizationHierarchyDialogProps) {
    if (nextProps.filter !== this.props.filter) {
      const { loadListRequest } = this.props.organizationHierarchyDispatch;
      const { filter, changeProjectListFilter } = nextProps;
      
      changeProjectListFilter({filter});
      loadListRequest({filter});
    }
  }
};

export const OrganizationHierarchyDialog = compose<OrganizationHierarchyDialogProps, OwnOptions>(
  setDisplayName('OrganizationHierarchyDialog'),
  withLayout,
  withStyles(styles),
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(OrganizationHierarchyDialogView);