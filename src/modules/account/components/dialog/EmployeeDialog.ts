import { IResponseCollection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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

import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { EmployeeDialogView } from './EmployeeDialogView';

interface OwnOptions {
  value?: string | undefined;
  filter?: IEmployeeListFilter | undefined;
  isOpen: boolean;
  hideBackdrop?: boolean;
  onSelected: (employee: IEmployee) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterEmployees: (response: IResponseCollection<IEmployee> | undefined) => IEmployee[];
}

interface OwnState {
  _value: string | undefined;
  _filter: IEmployeeListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
}

export type EmployeeDialogProps
  = WithLayout
  & WithStyles<typeof styles>
  & WithAccountEmployee
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
      companyUids: filter && filter.companyUids,
      positionUids: filter && filter.positionUids,
      roleUids: filter && filter.roleUids,
      find: filter && filter.find,
      findBy: filter && filter.findBy,
      orderBy: filter && filter.orderBy || 'fullName',
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

const handlerCreators: HandleCreators<EmployeeDialogProps, OwnHandlers> = {
  filterEmployees: (props: EmployeeDialogProps) => (response: IResponseCollection<IEmployee> | undefined): IEmployee[] => {
    const { _search } = props;

    let result: IEmployee[] = [];

    if (response && response.data) {
      if (_search !== '') {
        result = response.data.filter(item => 
          item.fullName.toLowerCase().indexOf(_search || '') !== -1
        );
      } else {
        result = response.data;
      }
    }

    return result;
  },
  searchOnChange: (props: EmployeeDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: EmployeeDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<EmployeeDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.accountEmployeeState.list;
    const { loadListRequest } = this.props.accountEmployeeDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: _filter
      });
    }
  }
};

export const EmployeeDialog = compose<EmployeeDialogProps, OwnOptions>(
  setDisplayName('EmployeeDialog'),
  withLayout,
  withStyles(styles),
  withAccountEmployee,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(EmployeeDialogView);