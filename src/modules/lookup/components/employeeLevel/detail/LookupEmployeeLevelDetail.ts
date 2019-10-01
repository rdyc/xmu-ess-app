import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IEmployeeLevelDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { WithEmployeeLevel, withEmployeeLevel } from '@lookup/hoc/withEmployeeLevel';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { LookupEmployeeLevelDetailView } from './LookupEmployeeLevelDetailView';

interface IOwnRouteParams {
  employeeLevelUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type EmployeeLevelDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithEmployeeLevel
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<EmployeeLevelDetailProps, IOwnState> = (props: EmployeeLevelDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  
  return {
    isAdmin,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<EmployeeLevelDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: EmployeeLevelDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: EmployeeLevelDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: EmployeeLevelDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'employee level'}),
  }),
  setDelete: (prevState: IOwnState, props: EmployeeLevelDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'employee level'}),
  })
};

const handlerCreators: HandleCreators<EmployeeLevelDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: EmployeeLevelDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeLevelUid && !props.employeeLevelState.detail.isLoading) {
      props.employeeLevelDispatch.loadDetailRequest({
        employeeLevelUid: props.match.params.employeeLevelUid,
      });
    }
  },
  handleOnSelectedMenu: (props: EmployeeLevelDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LookupUserAction.Modify:
        props.setModify();        
        break;
      case LookupUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: EmployeeLevelDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: EmployeeLevelDetailProps) => () => {
    const { response } = props.employeeLevelState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeLevelUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeLevelUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/employeelevels/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: employeeLevelUid 
      });
    }
  },
  handleDelete: (props: EmployeeLevelDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.employeeLevelDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.employeeLevelUid) {
      const message = intl.formatMessage(lookupMessage.employeeLevel.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.employeeLevelUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IEmployeeLevelDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: EmployeeLevelDetailProps) => (response: boolean) => {
    props.history.push('/lookup/employeelevels');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.employeeLevel.message.deleteSuccess, { uid : props.match.params.employeeLevelUid })
    });
  },
  handleDeleteFail: (props: EmployeeLevelDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.employeeLevel.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<EmployeeLevelDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: EmployeeLevelDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.employeeLevelUid !== prevProps.match.params.employeeLevelUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.employeeLevelState.detail.response !== prevProps.employeeLevelState.detail.response) {
      const { isLoading } = this.props.employeeLevelState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupEmployeeLevelDetail = compose(
  setDisplayName('LookupEmployeeLevelDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withEmployeeLevel,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EmployeeLevelDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(LookupEmployeeLevelDetailView);