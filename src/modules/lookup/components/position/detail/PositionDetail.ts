import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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

interface OwnRouteParams {
  positionUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnDelete: () => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  action?: PositionUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDelete: StateHandler<OwnState>;
}

export type PositionDetailProps
  = WithLookupPosition
  & WithUser
  & WithLayout
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<PositionDetailProps, OwnState> = (props: PositionDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<PositionDetailProps, OwnState, OwnStateUpdaters> = {
  setOptions: (prevState: OwnState, props: PositionDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: OwnState, props: PositionDetailProps) => (): Partial<OwnState> => ({
    action: PositionUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.position.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.position.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDelete: (prevState: OwnState, props: PositionDetailProps) => (): Partial<OwnState> => ({
    action: PositionUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.position.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.position.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<PositionDetailProps, OwnHandler> = {
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
  handleOnModify: (props: PositionDetailProps) => () => {
    props.setModify();
  },
  handleOnDelete: (props: PositionDetailProps) => () => {
    props.setDelete();
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

const lifecycles: ReactLifeCycleFunctions<PositionDetailProps, OwnState> = {
  componentDidUpdate(prevProps: PositionDetailProps) {
    // handle updated route params
    if (this.props.match.params.positionUid !== prevProps.match.params.positionUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupPositionState.detail.response !== prevProps.lookupPositionState.detail.response) {
      const { isLoading } = this.props.lookupPositionState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: PositionUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: PositionUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnModify
        },
        {
          id: PositionUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnDelete
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const PositionDetail = compose(
  setDisplayName('LookupPositionDetail'),
  withUser,
  withLayout,
  withRouter,
  withLookupPosition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(PositionDetailView);