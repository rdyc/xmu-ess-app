import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
import { IWebJobDefinitionDeletePayload } from '@webjob/classes/request';
import { WithWebJobDefinition, withWebJobDefinition } from '@webjob/hoc/withWebJobDefinition';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { WebJobDefinitionDetailView } from './WebJobDefinitionDetailView';

interface IOwnRouteParams {
  definitionUid: string;
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
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type WebJobDefinitionDetailProps
  = WithOidc
  & WithUser
  & WithLayout
  & WithWebJobDefinition
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<WebJobDefinitionDetailProps, IOwnState> = (props: WebJobDefinitionDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<WebJobDefinitionDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setShouldLoad: (state: IOwnState, props: WebJobDefinitionDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: WebJobDefinitionDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setDelete: (prevState: IOwnState, props: WebJobDefinitionDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(webJobMessage.shared.confirm.deleteTitle, {state: 'Definition'}),
    dialogContent: props.intl.formatMessage(webJobMessage.shared.confirm.deleteDescription, { state: 'definition'}),
  })
};

const handlerCreators: HandleCreators<WebJobDefinitionDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: WebJobDefinitionDetailProps) => () => { 
    const { user } = props.userState;
    const definitionUid = props.match.params.definitionUid;
    const { isLoading } = props.webJobDefinitionState.detail;

    if (user && definitionUid && !isLoading) {
      props.webJobDefinitionDispatch.loadDetailRequest({
        definitionUid
      });
    }
  },
  handleOnSelectedMenu: (props: WebJobDefinitionDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;

      case LookupUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: WebJobDefinitionDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: WebJobDefinitionDetailProps) => () => {
    // 
  },
  handleDelete: (props: WebJobDefinitionDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.webJobDefinitionDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.definitionUid) {
      const message = intl.formatMessage(webJobMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      definitionUid: match.params.definitionUid
    };

    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IWebJobDefinitionDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: WebJobDefinitionDetailProps) => (response: boolean) => {
    props.history.push('/webjob/definitions');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(webJobMessage.shared.message.deleteSuccess, { state: 'Definition', type: 'ID', uid : props.match.params.definitionUid })
    });
  },
  handleDeleteFail: (props: WebJobDefinitionDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(webJobMessage.shared.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<WebJobDefinitionDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
  componentDidUpdate(prevProps: WebJobDefinitionDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.definitionUid !== prevProps.match.params.definitionUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.webJobDefinitionState.detail.response !== prevProps.webJobDefinitionState.detail.response) {
      const { isLoading } = this.props.webJobDefinitionState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
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

export const WebJobDefinitionDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withWebJobDefinition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('WebJobDefinitionDetail')
)(WebJobDefinitionDetailView);