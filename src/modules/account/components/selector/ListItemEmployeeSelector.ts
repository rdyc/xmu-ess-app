import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
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

import { ListItemEmployeeSelectorView } from './ListItemEmployeeSelectorView';

interface OwnOption {
  companyUids?: string;
  roleUids?: string;
  positionUids?: string;
  onSelected: (employee: IEmployee) => boolean;
}

interface OwnState {
  open: boolean;
  search: string;
  selected?: IEmployee; 
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setDialog: StateHandler<OwnState>;
  setSearch: StateHandler<OwnState>;
  setSelected: StateHandler<OwnState>;
  setCurrent: StateHandler<OwnState>;
}

interface OwnHandler {
  handleDialog: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleOnDiscard: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnSelected: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnClickItem: (employee: IEmployee) => void;
  filteredData: () => IEmployee[];
}

export type ListItemEmployeeSelectorProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithAccountEmployee
  & WithWidth
  & InjectedIntlProps;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  open: false,
  search: ''
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setDialog: (prev: OwnState) => (): Partial<OwnState> => ({
    open: !prev.open
  }),
  setSearch: (prev: OwnState) => (value?: string): Partial<OwnState> => ({
    search: value ? value : ''
  }),
  setSelected: (prev: OwnState) => (employee?: IEmployee): Partial<OwnState> => ({
    selected: employee
  }),
  setCurrent: (prev: OwnState) => (employee?: IEmployee): Partial<OwnState> => ({
    open: !prev.open,
    selected: employee
  }),
};

const handlerCreators: HandleCreators<ListItemEmployeeSelectorProps, OwnHandler> = {
  handleDialog: (props: ListItemEmployeeSelectorProps) => () => {
    props.setDialog();
  },
  handleOnChangeSearch: (props: ListItemEmployeeSelectorProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearch(event.currentTarget.value);
  },
  handleOnKeyUpSearch: (props: ListItemEmployeeSelectorProps) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.setSearch();
    }
  },
  handleOnDiscard: (props: ListItemEmployeeSelectorProps) => (event: React.MouseEvent) => {
    props.setSelected();
  },
  handleOnSelected: (props: ListItemEmployeeSelectorProps) => (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.selected) {
      if (props.onSelected(props.selected)) {
        props.setSelected();
      }
    }
  },
  handleOnClickItem: (props: ListItemEmployeeSelectorProps) => (employee: IEmployee) => {
    props.setCurrent(employee);
  },
  filteredData: (props: ListItemEmployeeSelectorProps) => () => {
    const { search } = props;
    const { response } = props.accountEmployeeState.list;

    let result: IEmployee[] = [];

    if (response && response.data) {
      if (search !== '') {
        result = response.data.filter(item => 
          item.fullName
            .toLowerCase()
            .indexOf(search.toLowerCase()) !== -1
        );
      } else {
        result = response.data;
      }
    } 
    
    return result;
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ListItemEmployeeSelectorProps, OwnState> = {
  componentDidMount() {
    const { isLoading, response } = this.props.accountEmployeeState.list;
    const { companyUids, roleUids, positionUids } = this.props;
    const { loadListRequest } = this.props.accountEmployeeDispatch;

    if (!isLoading || !response) {
      loadListRequest({
        filter: {
          companyUids,
          roleUids,
          positionUids,
          find: this.props.search,
          findBy: undefined,
          direction: undefined,
          orderBy: 'fullName',
          size: undefined
        }
      });
    }
  }
};

export const ListItemEmployeeSelector = compose<ListItemEmployeeSelectorProps, OwnOption>(
  setDisplayName('ListItemEmployeeSelector'),
  withAccountEmployee,
  withWidth(),
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(ListItemEmployeeSelectorView);