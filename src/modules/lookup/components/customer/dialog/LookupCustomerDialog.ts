import { IResponseCollection } from '@generic/interfaces';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LookupCustomerDialogView } from './LookupCustomerDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: ILookupCustomerGetListFilter | undefined;
  isOpen: boolean;
  onSelected: (customer: ICustomerList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterCustomers: (response: IResponseCollection<ICustomerList> | undefined) => ICustomerList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: ILookupCustomerGetListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
}

export type LookupCustomerDialogProps
  = WithLookupCustomer
  & WithWidth
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
      companyUid: filter && filter.companyUid,
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
};

const handlerCreators: HandleCreators<LookupCustomerDialogProps, OwnHandlers> = {
  filterCustomers: (props: LookupCustomerDialogProps) => (response: IResponseCollection<ICustomerList> | undefined): ICustomerList[] => {
    const { _search } = props;

    let result: ICustomerList[] = [];

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
  searchOnChange: (props: LookupCustomerDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: LookupCustomerDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupCustomerDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.lookupCustomerState.list;
    const { loadListRequest } = this.props.lookupCustomerDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: _filter
      });
    }
  }
};

export const LookupCustomerDialog = compose<LookupCustomerDialogProps, OwnOptions>(
  withLookupCustomer,
  withWidth(),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<LookupCustomerDialogProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupCustomerDialogProps, OwnState>(lifecycles),
)(LookupCustomerDialogView);