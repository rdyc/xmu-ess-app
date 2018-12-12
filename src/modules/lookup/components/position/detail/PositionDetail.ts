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
    const { deleteRequest } = props.lookupPositionDispatch;
    const { alertAdd } = props.layoutDispatch;

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
      PositionUserAction.Delete
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';
      let deleteAction: boolean = false;

      switch (props.action) {
        case PositionUserAction.Modify:
          next = '/lookup/position/form';
          break;
        
        case PositionUserAction.Delete:
          deleteAction = true;
          next = `/lookup/position`;
          break;
          
        default:
          break;
      }

      props.setDefault();
      
      if (deleteAction) {
         deleteRequest({
          reject: Promise.reject,
          resolve: Promise.resolve,
          data: {uid: positionUid} as IPositionDeletePayload
          });  

         alertAdd({
           message: props.intl.formatMessage(lookupMessage.position.message.deleteSuccess),
            time: new Date(),
          });
         props.history.push(next, ); 
      } else {
        props.history.push(next, { companyUid, uid: positionUid });
      }

    }
  },
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