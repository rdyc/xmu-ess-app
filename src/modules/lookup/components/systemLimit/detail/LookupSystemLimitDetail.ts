import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { SystemLimitUserAction } from '@lookup/classes/types';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
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
import { LookupSystemLimitDetailView } from './LookupSystemLimitDetailView';

interface OwnRouteParams {
  systemLimitUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: SystemLimitUserAction;
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

export type SystemLimitDetailProps
  = WithUser
  & WithLookupSystemLimit
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<SystemLimitDetailProps, OwnState> = (props: SystemLimitDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<SystemLimitDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: SystemLimitDetailProps) => (): Partial<OwnState> => ({
    action: SystemLimitUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<SystemLimitDetailProps, OwnHandler> = {
  handleOnModify: (props: SystemLimitDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: SystemLimitDetailProps) => () => {
    props.setDefault();
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

    // get project uid
    if (response.data) {
      systemLimitUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      SystemLimitUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case SystemLimitUserAction.Modify:
          next = '/lookup/systemlimits/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, {
        companyUid,
        uid: systemLimitUid
      });
    }
  },
};

export const LookupSystemLimitDetail = compose(
  withRouter,
  withUser,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupSystemLimitDetailView);