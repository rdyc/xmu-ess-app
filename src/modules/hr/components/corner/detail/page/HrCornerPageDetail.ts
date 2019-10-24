import { AppRole } from '@constants/AppRole';
import { IHrCornerPageDeletePayload } from '@hr/classes/request';
import { WithHrCornerPage, withHrCornerPage } from '@hr/hoc/withHrCornerPage';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
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

import { HrCornerPageDetailView } from './HrCornerPageDetailView';

interface IOwnRouteParams {
  pageUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
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
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type HrCornerPageDetailProps
  = WithOidc
  & WithUser
  & WithLayout
  & WithHrCornerPage
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCornerPageDetailProps, IOwnState> = (props: HrCornerPageDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<HrCornerPageDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCornerPageDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCornerPageDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCornerPageDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Corner Page'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'corner page'}),
  }),
  setDelete: (prevState: IOwnState, props: HrCornerPageDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.deleteTitle, {state: 'Corner Page'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.deleteDescription, {state: 'corner page'}),
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
  })
};

const handlerCreators: HandleCreators<HrCornerPageDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerPageDetailProps) => () => { 
    const { user } = props.userState;
    const pageUid = props.match.params.pageUid;
    const { isLoading } = props.hrCornerPageState.detail;

    if (user && pageUid && !isLoading) {
      props.hrCornerPageDispatch.loadDetailRequest({
        pageUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCornerPageDetailProps) => (item: IPopupMenuOption) => {
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
  handleOnCloseDialog: (props: HrCornerPageDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCornerPageDetailProps) => () => {
    const { response } = props.hrCornerPageState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let pageUid: string | undefined;

    // get project uid
    if (response.data) {
      pageUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/hr/corner/page/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: pageUid 
      });
    }
  },
  handleSubmit: (props: HrCornerPageDetailProps) => () => {
    const { match, intl, action } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.hrCornerPageDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.pageUid) {
      const message = intl.formatMessage(hrMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.pageUid
    };

    if (action === LookupUserAction.Delete) {
      return new Promise((resolve, reject) => {
        deleteRequest({
          resolve,
          reject,
          data: payload as IHrCornerPageDeletePayload
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: HrCornerPageDetailProps) => (response: boolean) => {
    if (props.action === LookupUserAction.Delete) {
      props.history.push(`/hr/corner/page`);
  
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(hrMessage.shared.message.deleteSuccess, { uid : props.match.params.pageUid, state: 'Corner Page' })
      });
    }
  },
  handleSubmitFail: (props: HrCornerPageDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      if (props.action === LookupUserAction.Delete) {
        props.layoutDispatch.alertAdd({
          time: new Date(),
          message: props.intl.formatMessage(hrMessage.shared.message.deleteFailure),
          details: isObject(submitError) ? submitError.message : submitError
        });
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCornerPageDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCornerPageDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.pageUid !== prevProps.match.params.pageUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCornerPageState.detail.response !== prevProps.hrCornerPageState.detail.response) {
      const { isLoading } = this.props.hrCornerPageState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCornerPageDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withHrCornerPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCornerPageDetail')
)(HrCornerPageDetailView);