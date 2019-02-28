import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
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

import { AccountEmployeeDialogView } from './AccountEmployeeDialogView';

interface IOwnOptions {
  title: string;
  isOpen: boolean;
  value?: string;
  filter?: IEmployeeListFilter;
  hideBackdrop?: boolean;
  onSelected: (employee?: IEmployee) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface IOwnState {
  search: string;
  employees?: IEmployee[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setEmployees: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
}

export type AccountEmployeeDialogProps
  = WithTheme
  & WithStyles<typeof styles>
  & WithAccountEmployee
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: ''
});

const stateUpdaters: StateUpdaters<AccountEmployeeDialogProps, IOwnState, IOwnStateUpdaters> = {
  setEmployees: (state: IOwnState, props: AccountEmployeeDialogProps) => () => {
    const { response } = props.accountEmployeeState.list;

    let employees: IEmployee[] = [];

    if (response && response.data) {
      if (state.search.length > 0) {
        employees = response.data.filter(item => 
          item.fullName.toLowerCase().indexOf(state.search) !== -1 ||
          item.email.toLowerCase().indexOf(state.search) !== -1
        );
      } else {
        employees = response.data;
      }
    }
    
    return {
      employees
    };
  },
  setSearch: (state: IOwnState) => (value: string) => ({
    search: value.toLowerCase()
  }),
  clearSearch: (state: IOwnState) => () => ({
    search: ''
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeDialogProps, IOwnHandlers> = {
  handleOnLoadApi: (props: AccountEmployeeDialogProps) => () => {
    const { isLoading } = props.accountEmployeeState.list;
    const { loadListRequest } = props.accountEmployeeDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handleOnChangeSearch: (props: AccountEmployeeDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handleOnKeyUpSearch: (props: AccountEmployeeDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeDialogProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.accountEmployeeState.list;

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
          this.props.setEmployees();
        }
      }
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeDialogProps) {
    if (
      this.props.search !== prevProps.search ||
      this.props.accountEmployeeState.list.response !== prevProps.accountEmployeeState.list.response
      ) {
      this.props.setEmployees();
    }
  }
};

export const AccountEmployeeDialog = compose<AccountEmployeeDialogProps, IOwnOptions>(
  setDisplayName('AccountEmployeeDialog'),
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles, { withTheme: true }),
  injectIntl
)(AccountEmployeeDialogView);