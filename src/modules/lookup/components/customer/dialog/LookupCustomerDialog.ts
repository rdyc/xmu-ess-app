import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { ICustomerList } from '@lookup/classes/response';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
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
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LookupCustomerDialogView } from './LookupCustomerDialogView';

interface IOwnOptions {
  isOpen: boolean;
  value?: string;
  filter?: ILookupCustomerGetListFilter;
  hideBackdrop?: boolean;
  onSelected: (customer?: ICustomerList) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlerOnKeyUpSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface IOwnState {
  search: string;
  customers?: ICustomerList[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setCustomers: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
}

export type LookupCustomerDialogProps
  = WithStyles<typeof styles>
  & WithLookupCustomer
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: ''
});

const stateUpdaters: StateUpdaters<LookupCustomerDialogProps, IOwnState, IOwnStateUpdaters> = {
  setCustomers: (state: IOwnState, props: LookupCustomerDialogProps) => () => {
    const { response } = props.lookupCustomerState.list;

    let customers: ICustomerList[] = [];

    if (response && response.data) {
      if (state.search.length > 0) {
        customers = response.data.filter(item => 
          item.name.toLowerCase().indexOf(state.search) !== -1
        );
      } else {
        customers = response.data;
      }
    }
    
    return {
      customers
    };
  },
  setSearch: (state: IOwnState) => (value: string) => ({
    search: value.toLowerCase()
  }),
  clearSearch: (state: IOwnState) => () => ({
    search: ''
  }),
};

const handlerCreators: HandleCreators<LookupCustomerDialogProps, IOwnHandlers> = {
  handleOnLoadApi: (props: LookupCustomerDialogProps) => () => {
    const { isLoading } = props.lookupCustomerState.list;
    const { loadListRequest } = props.lookupCustomerDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handleOnChangeSearch: (props: LookupCustomerDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handlerOnKeyUpSearch: (props: LookupCustomerDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupCustomerDialogProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.lookupCustomerState.list;

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
          this.props.setCustomers();
        }
      }
    }
  },
  componentDidUpdate(prevProps: LookupCustomerDialogProps) {
    if (
      this.props.search !== prevProps.search ||
      this.props.lookupCustomerState.list.response !== prevProps.lookupCustomerState.list.response
      ) {
      this.props.setCustomers();
    }
  }
};

export const LookupCustomerDialog = compose<LookupCustomerDialogProps, IOwnOptions>(
  setDisplayName('LookupCustomerDialog'),
  withLookupCustomer,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  injectIntl
)(LookupCustomerDialogView);