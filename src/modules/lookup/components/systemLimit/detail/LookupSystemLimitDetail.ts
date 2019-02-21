import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ISystemLimitDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
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

import { LookupSystemLimitDetailView } from './LookupSystemLimitDetailView';

interface IOwnRouteParams {
  systemLimitUid: string;
  companyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
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
  stateUpdate: StateHandler<IOwnState>;
}

export type SystemLimitDetailProps
  = WithUser
  & WithLayout
  & WithLookupSystemLimit
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<SystemLimitDetailProps, IOwnState> = (props: SystemLimitDetailProps): IOwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<SystemLimitDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: SystemLimitDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<SystemLimitDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: SystemLimitDetailProps) => () => { 
    if (props.userState.user && props.match.params.systemLimitUid && !props.systemLimitState.detail.isLoading) {
      props.systemLimitDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        systemLimitUid: props.match.params.systemLimitUid
      });
    }
  },
  handleOnOpenDialog: (props: SystemLimitDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Time Limit'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'Time Limit'}),
      });
    }
  },
  handleOnCloseDialog: (props: SystemLimitDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: SystemLimitDetailProps) => () => {
    const { response } = props.systemLimitState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let systemLimitUid: string | undefined;
    let companyUid: string | undefined;

    // get uid
    if (response.data) {
      systemLimitUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/systemlimits/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, {
        companyUid,
        uid: systemLimitUid
      });
    }

  },
  handleSubmit: (props: SystemLimitDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.systemLimitDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.systemLimitUid) {
      const message = intl.formatMessage(lookupMessage.systemLimit.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.systemLimitUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ISystemLimitDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: SystemLimitDetailProps) => (response: boolean) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, { uid : props.match.params.systemLimitUid })
    });

    props.history.push('/lookup/systemlimits/');
  },
  handleSubmitFail: (props: SystemLimitDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.systemLimit.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<SystemLimitDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: SystemLimitDetailProps) {
    // handle updated route params
    if (this.props.match.params.systemLimitUid !== prevProps.match.params.systemLimitUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.systemLimitState.detail.response !== prevProps.systemLimitState.detail.response) {
      const { isLoading } = this.props.systemLimitState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Modify)
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Delete)
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupSystemLimitDetail = compose<SystemLimitDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<SystemLimitDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupSystemLimitDetail')
)(LookupSystemLimitDetailView);