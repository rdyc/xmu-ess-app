import { IEmployee } from '@account/classes/response';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
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
  shallowEqual,
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
  handleOnLoadApi: () => void;
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
  & WithStyles<typeof styles>
  & WithLayout
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
  handleOnLoadApi: (props: ListItemEmployeeSelectorProps) => () => {
    props.accountEmployeeDispatch.loadListRequest({
      filter: {
        companyUids: props.companyUids,
        roleUids: props.roleUids,
        positionUids: props.positionUids,
        orderBy: 'fullName'
      }
    });
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
    const { request } = this.props.accountEmployeeState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing filter props
        const shouldUpdate = !shallowEqual(
          {
            companyUids: request.filter.companyUids,
            roleUids: request.filter.roleUids,
            positionUids: request.filter.positionUids,
          },
          {
            companyUids: this.props.companyUids,
            roleUids: this.props.roleUids,
            positionUids: this.props.positionUids,
          },
        );
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        }
      }
    }
  }
};

export const ListItemEmployeeSelector = compose<ListItemEmployeeSelectorProps, OwnOption>(
  setDisplayName('ListItemEmployeeSelector'),
  withAccountEmployee,
  withStyles(styles),
  withLayout,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(ListItemEmployeeSelectorView);