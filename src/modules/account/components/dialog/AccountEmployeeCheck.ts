import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
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
import { AccountEmployeeCheckView } from './AccountEmployeeCheckView';

export interface EmployeeCheck {
  employee: IEmployee;
  isCheck: boolean;
}

interface IOwnOptions {
  title: string;
  isOpen: boolean;
  value?: EmployeeCheck[];
  filter?: IEmployeeListFilter;
  hideBackdrop?: boolean;
  onSelected: (employee?: EmployeeCheck[]) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleItemCheck: (uid: string) => void;
  handleReset: () => void;
}

interface IOwnState {
  search: string;
  employees: IEmployee[];
  itemCheck: EmployeeCheck[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setEmployees: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  stateReset: StateHandler<IOwnState>;
}

export type AccountEmployeeCheckProps
  = WithStyles<typeof styles>
  & WithAccountEmployee
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: '',
  employees: [],
  itemCheck: []
});

const stateUpdaters: StateUpdaters<AccountEmployeeCheckProps, IOwnState, IOwnStateUpdaters> = {
  setEmployees: (state: IOwnState, props: AccountEmployeeCheckProps) => () => {
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
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: IOwnState) => (itemCheck: EmployeeCheck[]) => ({
    itemCheck
  })
};

const handlerCreators: HandleCreators<AccountEmployeeCheckProps, IOwnHandlers> = {
  handleOnLoadApi: (props: AccountEmployeeCheckProps) => () => {
    const { isLoading } = props.accountEmployeeState.list;
    const { loadListRequest } = props.accountEmployeeDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handleOnChangeSearch: (props: AccountEmployeeCheckProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handleOnKeyUpSearch: (props: AccountEmployeeCheckProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
  handleItemCheck: (props: AccountEmployeeCheckProps) => (uid: string) => {
    const { itemCheck } = props;
    const index = itemCheck.findIndex(item => item.employee.uid === uid);

    itemCheck[index].isCheck = !itemCheck[index].isCheck;
    
    props.stateUpdate({
      itemCheck
    });
  },
  handleReset: (props: AccountEmployeeCheckProps) => () => {
    const { itemCheck } = props;
    
    itemCheck.map(item => {
      item.isCheck = false;
    });
    
    props.stateReset(itemCheck);
  }
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeCheckProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.accountEmployeeState.list;

    // 1st load only when request are empty
    if (!request || request && !request.filter) {
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

    if (this.props.value) {
      const { employees } = this.props;
      this.props.value.map(item => {
        employees.push(item.employee);
      });
      this.props.stateUpdate({
        employees,
        itemCheck: this.props.value
      });
    }
  },
  componentWillUpdate(prevProps: AccountEmployeeCheckProps) {
    if (this.props.filter && prevProps.filter) {
      if (this.props.filter.companyUids !== prevProps.filter.companyUids) {
        this.props.handleOnLoadApi();
      }
    }
    const { response } = this.props.accountEmployeeState.list;
    const { itemCheck } = this.props;
    if (itemCheck.length === 0 && response && response.data) {
      response.data.map(item => {
        itemCheck.push({
          employee: item,
          isCheck: false
        });
      });
      this.props.stateUpdate({
        itemCheck
      });
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeCheckProps) {
    const { response } = this.props.accountEmployeeState.list;
    const { itemCheck } = this.props;

    if (
      this.props.search !== prevProps.search ||
      this.props.accountEmployeeState.list.response !== prevProps.accountEmployeeState.list.response
      ) {
      this.props.setEmployees();
    }

    if (itemCheck.length === 0 && response && response.data) {
      response.data.map(item => {
        itemCheck.push({
          employee: item,
          isCheck: false
        });
      });
      this.props.stateUpdate({
        itemCheck
      });
    }
    if (prevProps.value !== this.props.value) {
      if (!this.props.value) {
        const temp: EmployeeCheck[] = [];
        if (response && response.data) {
          response.data.map(item => {
            temp.push({
              employee: item,
              isCheck: false
            });
          });
        }
        this.props.stateUpdate({
          itemCheck: temp
        });
      }
    }
  }
};

export const AccountEmployeeCheck = compose<AccountEmployeeCheckProps, IOwnOptions>(
  setDisplayName('AccountEmployeeCheck'),
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  injectIntl
)(AccountEmployeeCheckView);