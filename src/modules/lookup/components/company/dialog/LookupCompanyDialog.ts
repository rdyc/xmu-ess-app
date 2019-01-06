import { IResponseCollection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { ICompanyList } from '@lookup/classes/response';
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

import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { LookupCompanyDialogView } from './LookupCompanyDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: ILookupCompanyGetListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (customer: ICompanyList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterCompanies: (response: IResponseCollection<ICompanyList> | undefined) => ICompanyList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: ILookupCompanyGetListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
}

export type LookupCompanyDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithLookupCompany
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
      orderBy: filter && filter.orderBy || 'name',
      direction: filter && filter.direction || 'ascending',
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
};

const handlerCreators: HandleCreators<LookupCompanyDialogProps, OwnHandlers> = {
  filterCompanies: (props: LookupCompanyDialogProps) => (response: IResponseCollection<ICompanyList> | undefined): ICompanyList[] => {
    const { _search } = props;

    let result: ICompanyList[] = [];

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
  searchOnChange: (props: LookupCompanyDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: LookupCompanyDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupCompanyDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.lookupCompanyState.list;
    const { loadListRequest } = this.props.lookupCompanyDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: _filter
      });
    }
  }
};

export const LookupCompanyDialog = compose<LookupCompanyDialogProps, OwnOptions>(
  setDisplayName('LookupCompanyDialog'),
  withLayout,
  withStyles(styles),
  withLookupCompany,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(LookupCompanyDialogView);