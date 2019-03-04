import { IEmployeeAccessList } from '@account/classes';
import { WithAccountEmployeeMy, withAccountEmployeeMy } from '@account/hoc/withAccountEmployeeMy';
import AppStorage from '@constants/AppStorage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser, IUserCompany, IUserPosition, IUserRole } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { RemoveDuplicates } from '@utils/index';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
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
import * as store from 'store';

import { accountAccessView } from './accountAccessView';

interface IOwnState {
  shouldLoad: boolean;
  current?: any;
  name?: string;
  access: IEmployeeAccessList[];
}

interface OwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setName: StateHandler<IOwnState>;
  setCompanies: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnRetry: (event: React.MouseEvent) => void;
  handleOnSelected: (uid: string) => void;
  filterCompanies: () => void;
}

export type AccessSwitcherProps
  = IOwnHandler
  & IOwnState
  & OwnStateUpdaters
  & InjectedIntlProps
  & WithUser
  & WithAccountEmployeeMy
  & WithStyles<typeof styles>
  & RouteComponentProps;

const createProps: mapper<AccessSwitcherProps, IOwnState> = (props: AccessSwitcherProps): IOwnState => {
  const { user } = props.userState;

  return {
    shouldLoad: false,
    current: user,
    name: user ? user.fullName : undefined,
    access: []
  };
};

const stateUpdaters: StateUpdaters<{}, IOwnState, OwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => () => ({
    shouldLoad: !state.shouldLoad
  }),
  setName: (state: IOwnState) => (name: string) => ({
    name
  }),
  setCompanies: (state: IOwnState) => (data: IEmployeeAccessList[] | []) => ({
    access: data
  })
};

const handlerCreators: HandleCreators<AccessSwitcherProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccessSwitcherProps) => () => {
    const { isLoading } = props.accountEmployeeMyState.detail;
    const { loadRequest  } = props.accountEmployeeMyDispatch;

    if (props.shouldLoad || !isLoading) {
      loadRequest();

      props.setShouldLoad();
    }
  },
  handleOnRetry: (props: AccessSwitcherProps) => () => {
    props.setShouldLoad();
  },
  handleOnSelected: (props: AccessSwitcherProps) => (uid: string) => {
    const { response } = props.accountEmployeeMyState.detail;

    if (response && response.data && response.data.access) {
      const access = response.data.access.filter(item => item.uid === uid)[0];
  
      if (access && access.company && access.role && access.position) {
        const company: IUserCompany = {
          uid: access.company.uid,
          code: access.company.code,
          name: access.company.name
        };
    
        const position: IUserPosition = {
          uid: access.position.uid,
          name: access.position.name,
          description: access.position.description || ''
        };
    
        const role: IUserRole = {
          uid: access.role.uid,
          name: access.role.name,
          description: access.role.description || ''
        };

        const user: IAppUser = {
          company,
          position,
          role,
          uid: response.data.uid,
          email: response.data.email,
          fullName: response.data.fullName,
          menus: access.menus,
          access: response.data.access
        };
    
        // save to local storage
        store.set(AppStorage.Profile, user);
        store.set(AppStorage.Access, response.data.access);
    
        // set redux state
        props.assignUser(user);
        
        // redirect to home page
        props.history.push('/home/dashboard');
      }
    }
  },
  filterCompanies: (props: AccessSwitcherProps) => () => {
    const { response } = props.accountEmployeeMyState.detail;

    let result: IEmployeeAccessList[] | [] = [];

    if (response && response.data && response.data.access) {
      result = RemoveDuplicates(response.data.access, 'companyUid');
    }
    
    props.setCompanies(result);
  }
};

const lifecycles: ReactLifeCycleFunctions<AccessSwitcherProps, {}> = {
  componentDidMount() {
    this.props.switchAccess();

    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: AccessSwitcherProps) {
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.handleOnLoadApi();
    }

    if (this.props.accountEmployeeMyState.detail !== prevProps.accountEmployeeMyState.detail) {
      const { response } = this.props.accountEmployeeMyState.detail;

      if (response && response.data) {
        this.props.setName(response.data.fullName);
      }

      this.props.filterCompanies();
    }
  }
};

export const AccountAccess = compose<AccessSwitcherProps, {}>(
  withAccountEmployeeMy,
  withUser,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(accountAccessView);