import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ICompanyList } from '@lookup/classes/response';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
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

import { LookupCompanyDialogView } from './LookupCompanyDialogView';

interface IOwnOptions {
  isOpen: boolean;
  value?: string;
  filter?: ILookupCompanyGetListFilter;
  hideBackdrop?: boolean;
  onSelected: (company?: ICompanyList) => void;
  onClose: () => void;
}

interface IOwnHandlers {
  handleOnLoadApi: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlerOnKeyUpSearch: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface IOwnState {
  search: string;
  company?: ICompanyList[];
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setCompany: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  clearSearch: StateHandler<IOwnState>;
}

export type LookupCompanyDialogProps
  = WithStyles<typeof styles>
  & WithLookupCompany
  & InjectedIntlProps
  & IOwnOptions
  & IOwnHandlers
  & IOwnState
  & IOwnStateUpdaters;

const createProps: mapper<IOwnOptions, IOwnState> = (props: IOwnOptions): IOwnState => ({
  search: ''
});

const stateUpdaters: StateUpdaters<LookupCompanyDialogProps, IOwnState, IOwnStateUpdaters> = {
  setCompany: (state: IOwnState, props: LookupCompanyDialogProps) => () => {
    const { response } = props.lookupCompanyState.list;

    let company: ICompanyList[] = [];

    if (response && response.data) {
      if (state.search.length > 0) {
        company = response.data.filter(item => 
          item.name.toLowerCase().indexOf(state.search) !== -1
        );
      } else {
        company = response.data;
      }
    }
    
    return {
      company
    };
  },
  setSearch: (state: IOwnState) => (value: string) => ({
    search: value.toLowerCase()
  }),
  clearSearch: (state: IOwnState) => () => ({
    search: ''
  }),
};

const handlerCreators: HandleCreators<LookupCompanyDialogProps, IOwnHandlers> = {
  handleOnLoadApi: (props: LookupCompanyDialogProps) => () => {
    const { isLoading } = props.lookupCompanyState.list;
    const { loadListRequest } = props.lookupCompanyDispatch;

    if (!isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  },
  handleOnChangeSearch: (props: LookupCompanyDialogProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    
    props.setSearch(value);
  },
  handlerOnKeyUpSearch: (props: LookupCompanyDialogProps) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    // delete pressed
    if (event.keyCode === 46) {
      props.clearSearch();
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<LookupCompanyDialogProps, IOwnState> = {
  componentDidMount() { 
    const { request } = this.props.lookupCompanyState.list;

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
          this.props.setCompany();
        }
      }
    }
  },
  componentDidUpdate(prevProps: LookupCompanyDialogProps) {
    if (
      this.props.search !== prevProps.search ||
      this.props.lookupCompanyState.list.response !== prevProps.lookupCompanyState.list.response
      ) {
      this.props.setCompany();
    }
  }
};

export const LookupCompanyDialog = compose<LookupCompanyDialogProps, IOwnOptions>(
  setDisplayName('LookupCompanyDialog'),
  withLookupCompany,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  injectIntl
)(LookupCompanyDialogView);