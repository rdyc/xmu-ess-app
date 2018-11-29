import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { PositionUserAction } from '@lookup/classes/types';
import { PositionDetailView } from '@lookup/components/position/detail/PositionDetailView';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
// import { positionMessage } from '@lookup/locales/messages/position/positionMessage';
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
}

export type PositionDetailProps
  = WithLookupPosition
  & WithUser
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
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDelete: (prevState: OwnState, props: PositionDetailProps) => (): Partial<OwnState> => ({
    action: PositionUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.position.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.position.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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

    if (!props.action || !response) {
      return;
    }

    if (response.data) {
      positionUid = response.data.uid;
    }

    const actions = [
      PositionUserAction.Modify,
      PositionUserAction.Delete
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case PositionUserAction.Modify:
          next = '/lookup/position/form';
          break;
        
        case PositionUserAction.Delete:
          next = `lookup/position/${positionUid}`;
          break;
          
        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { uid: positionUid });
    }
  },
};

export const PositionDetail = compose(
  withUser,
  withRouter,
  withLookupPosition,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(PositionDetailView);