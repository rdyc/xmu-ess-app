import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
import { travelMessage } from '@travel/locales/messages/travelMessage';
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
import { LookupDiemDetailView } from './LookupDiemDetailView';

interface OwnRouteParams {
  diemUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: DiemUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type LookupDiemDetailProps
  = WithUser
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
});

const stateUpdaters: StateUpdaters<LookupDiemDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: LookupDiemDetailProps) => (): Partial<OwnState> => ({
    action: DiemUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LookupDiemDetailProps, OwnHandler> = {
  handleOnModify: (props: LookupDiemDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: LookupDiemDetailProps) => () => {
    props.setDefault();
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
      DiemUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case DiemUserAction.Modify:
          next = '/lookup/diemvalue/form';
          break;

        default:
          break;
      }

      props.setDefault();
      props.history.push(next, {
        uid: diemUid
      });
    }
  },
};

export const LookupDiemDetail = compose(
  withRouter,
  withUser,
  withLookupDiem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupDiemDetailView);