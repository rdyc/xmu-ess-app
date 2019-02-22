import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupDiemDeletePayload } from '@lookup/classes/request/diem';
import { LookupUserAction } from '@lookup/classes/types';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
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
import { LookupDiemDetailView } from './LookupDiemDetailView';

interface OwnRouteParams {
  diemUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type LookupDiemDetailProps
  = WithUser
  & WithLayout
  & WithLookupDiem
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupDiemDetailProps, OwnState> = (props: LookupDiemDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<LookupDiemDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: OwnState, props: LookupDiemDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<LookupDiemDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: LookupDiemDetailProps) => () => { 
    if (props.userState.user && props.match.params.diemUid && !props.lookupDiemState.detail.isLoading) {
      props.lookupDiemDispatch.loadDetailRequest({
        companyUid: props.history.location.state ? props.history.location.state.companyUid : '',
        diemUid: props.match.params.diemUid
      });
    }
  },
  handleOnOpenDialog: (props: LookupDiemDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Diem Value'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'Diem Value'}),
      });
    }
  },
  handleOnCloseDialog: (props: LookupDiemDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: LookupDiemDetailProps) => () => {
    const { response } = props.lookupDiemState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let diemUid: string | undefined;

    // get diem uid
    if (response.data) {
      diemUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/diemvalue/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });
      
      props.history.push(next, {
        uid: diemUid
      });
    }
  },
  handleSubmit: (props: LookupDiemDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupDiemDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.diemUid) {
      const message = intl.formatMessage(lookupMessage.lookupDiem.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.diemUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupDiemDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: LookupDiemDetailProps) => (response: boolean) => {
    props.history.push('/lookup/diemvalue/list');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.lookupDiem.message.deleteSuccess, { uid : props.match.params.diemUid })
    });
  },
  handleSubmitFail: (props: LookupDiemDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.lookupDiem.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LookupDiemDetailProps, OwnState> = {
  componentDidUpdate(prevProps: LookupDiemDetailProps) {
    // handle updated route params
    if (this.props.match.params.diemUid !== prevProps.match.params.diemUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupDiemState.detail.response !== prevProps.lookupDiemState.detail.response) {
      const { isLoading } = this.props.lookupDiemState.detail;

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

export const LookupDiemDetail = compose(
  withRouter,
  withUser,
  withLayout,
  withLookupDiem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupDiemDetail')
)(LookupDiemDetailView);