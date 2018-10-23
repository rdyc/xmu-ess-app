import { IResponseCollection } from '@generic/interfaces';
import { ILeaveListFilter } from '@lookup/classes/filters/leave';
import { ILeaveList } from '@lookup/classes/response';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
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

import { IUserState } from '@layout/interfaces';
import { LookupLeaveDialogView } from './LookupLeaveDialogView';

export interface WithUser {
  userState: IUserState;
}

interface OwnOptions {
  value?: string | undefined;
  filter?: ILeaveListFilter | undefined;
  isOpen: boolean;
  onSelected: (leave: ILeaveList) => void;
  onClose: () => void;
}

interface OwnHandlers {
  searchOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchOnKeyUp: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  filterLeaves: (response: IResponseCollection<ILeaveList> | undefined) => ILeaveList[];
}

interface OwnState {
  _value: string | undefined;
  _filter: ILeaveListFilter;
  _search: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setStateValue: StateHandler<OwnState>;
  setStateSearch: StateHandler<OwnState>;
  clearStateSearch: StateHandler<OwnState>;
}

export type LookupLeaveDialogProps
  = WithLookupLeave
  & WithWidth
  & InjectedIntlProps
  & OwnOptions
  // & WithUser
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<OwnOptions, OwnState> = (props: OwnOptions): OwnState => {
  const { value, filter} = props;

  return { 
    _value: value,
    _filter: {
      companyUid: filter && filter.companyUid,
      categoryType: filter && filter.categoryType || 'LVC02',
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

const handlerCreators: HandleCreators<LookupLeaveDialogProps, OwnHandlers> = {
  filterLeaves: (props: LookupLeaveDialogProps) => (response: IResponseCollection<ILeaveList> | undefined): ILeaveList[] => {
    const { _search } = props;

    let result: ILeaveList[] = [];

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
  searchOnChange: (props: LookupLeaveDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setStateSearch(value);
  },
  searchOnKeyUp: (props: LookupLeaveDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearStateSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupLeaveDialogProps, OwnState> = {
  componentDidMount() { 
    const { _filter } = this.props;
    const { isLoading, response  } = this.props.lookupLeaveState.list;
    const { loadListRequest } = this.props.lookupLeaveDispatch;

    if (!isLoading && !response) {
      loadListRequest({
        filter: _filter
      });
    }
  }
};

export const LookupLeaveDialog = compose<LookupLeaveDialogProps, OwnOptions>(
  withLookupLeave,
  withWidth(),
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<LookupLeaveDialogProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupLeaveDialogProps, OwnState>(lifecycles),
)(LookupLeaveDialogView);