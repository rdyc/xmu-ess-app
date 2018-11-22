import { IEmployeeAccessList } from '@account/classes';
import { WithAccountEmployeeMy, withAccountEmployeeMy } from '@account/hoc/withAccountEmployeeMy';
import AppStorage from '@constants/AppStorage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppUser, IUserCompany, IUserPosition, IUserRole } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { RemoveDuplicates } from '@utils/index';
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

interface OwnHandlers {
  handleSelected: (uid: string) => void;
  filterCompanies: () => void;
}

interface OwnState {
  current: any | undefined;
  name: string | undefined;
  access: IEmployeeAccessList[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setName: StateHandler<OwnState>;
  setCompanies: StateHandler<OwnState>;
}

export type AccessSwitcherProps
  = OwnHandlers
  & OwnState
  & OwnStateUpdaters
  & WithUser
  & WithAccountEmployeeMy
  & WithStyles<typeof styles>
  & RouteComponentProps;

const createProps: mapper<AccessSwitcherProps, OwnState> = (props: AccessSwitcherProps): OwnState => {
  const { user } = props.userState;

  return {
    current: user,
    name: user ? user.fullName : undefined,
    access: []
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  setName: (prevState: OwnState) => (name: string) => ({
    name
  }),
  setCompanies: (prevState: OwnState) => (data: IEmployeeAccessList[] | []) => ({
    access: data
  })
};

const handlerCreators: HandleCreators<AccessSwitcherProps, OwnHandlers> = {
  handleSelected: (props: AccessSwitcherProps) => (uid: string) => {
    const { response } = props.accountEmployeeMyState.detail;

    if (response && response.data) {
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
          menus: access.menus
        };
    
        // save to local storage
        store.set(AppStorage.User, user);
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

    if (response && response.data) {
      result = RemoveDuplicates(response.data.access, 'companyUid');
    }
    
    props.setCompanies(result);
  }
};

const lifecycles: ReactLifeCycleFunctions<AccessSwitcherProps, {}> = {
  componentDidMount() {
    const { isLoading } = this.props.accountEmployeeMyState.detail;
    const { loadRequest  } = this.props.accountEmployeeMyDispatch;

    // set document props
    document.title = 'Company Access Selection';

    if (!isLoading) {
      loadRequest();
    }
  },
  componentDidUpdate(prevProps: AccessSwitcherProps) {
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
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(accountAccessView);