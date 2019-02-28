import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IPositionDeletePayload } from '@lookup/classes/request';
import { PositionUserAction } from '@lookup/classes/types';
import { PositionDetailView } from '@lookup/components/position/detail/PositionDetailView';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

interface IOwnRouteParams {
  positionUid: string;
  companyUid: string;
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
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: PositionUserAction;
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
  setDefault: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type PositionDetailProps
  = WithLookupPosition
  & WithUser
  & WithOidc
  & WithLayout
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<PositionDetailProps, IOwnState> = (props: PositionDetailProps): IOwnState => {
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
    dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<PositionDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: PositionDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: PositionDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: PositionDetailProps) => (): Partial<IOwnState> => ({
    action: PositionUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.position.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.position.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDelete: (prevState: IOwnState, props: PositionDetailProps) => (): Partial<IOwnState> => ({
    action: PositionUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.position.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.position.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<PositionDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: PositionDetailProps) => () => {
    if (props.userState.user && props.match.params.companyUid && props.match.params.positionUid && !props.lookupPositionState.detail.isLoading) {
      // if (props.history.location.state.companyUid) {
        props.lookupPositionDispatch.loadDetailRequest({
          companyUid: props.match.params.companyUid,
          positionUid: props.match.params.positionUid
        });
      } 
      // else {
      //   props.history.push('/lookup/positions');
      // }
    // }
  },
  handleOnSelectedMenu: (props: PositionDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case PositionUserAction.Refresh:
        props.setShouldLoad();
        break;
      case PositionUserAction.Modify:
        props.setModify();        
        break;
      case PositionUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: PositionDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: PositionDetailProps) => () => {
    const { response } = props.lookupPositionState.detail;

    let positionUid: string | undefined;
    let companyUid: string | undefined;

    if (!props.action || !response) {
      return;
    }

    if (response.data) {
      positionUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    const actions = [
      PositionUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case PositionUserAction.Modify:
          next = '/lookup/positions/form';
          break;

        default:
          break;
      }

      props.setDefault();
   
      props.history.push(next, { companyUid, uid: positionUid });

    }
  },

  handleSubmit: (props: PositionDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupPositionDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.positionUid) {
      const message = intl.formatMessage(lookupMessage.position.message.emptyPositionUid);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.positionUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IPositionDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: PositionDetailProps) => (response: boolean) => {
    props.history.push('/lookup/positions/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.position.message.deleteSuccess, { uid: props.match.params.positionUid })
    });
  },
  handleSubmitFail: (props: PositionDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.position.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<PositionDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: PositionDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.positionUid !== prevProps.match.params.positionUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupPositionState.detail.response !== prevProps.lookupPositionState.detail.response) {
      const { isLoading } = this.props.lookupPositionState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: PositionUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: PositionUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true
        },
        {
          id: PositionUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const PositionDetail = compose(
  setDisplayName('LookupPositionDetail'),
  withUser,
  withOidc,
  withLayout,
  withRouter,
  withLookupPosition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PositionDetailView);