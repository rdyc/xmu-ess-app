import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnDelete: () => void;
}

interface OwnState {
  action?: PositionUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDefault: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setDelete: StateHandler<OwnState>;
}

interface OwnRouteParams {
  positionUid: string;
  companyUid: string;
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

export const PositionDetail = compose(
  withUser,
  withLayout,
  withRouter,
  withLookupPosition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(PositionDetailView);