import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { MileageExceptionUserAction } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
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
import { MileageExceptionDetailView } from './MileageExceptionDetailView';

interface OwnRouteParams {
  mileageExceptionUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: MileageExceptionUserAction;
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

export type MileageExceptionDetailProps
  = WithUser
  & WithLookupMileageException
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<MileageExceptionDetailProps, OwnState> = (props: MileageExceptionDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<MileageExceptionDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: MileageExceptionDetailProps) => (): Partial<OwnState> => ({
    action: MileageExceptionUserAction.Modify,
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

const handlerCreators: HandleCreators<MileageExceptionDetailProps, OwnHandler> = {
  handleOnModify: (props: MileageExceptionDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: MileageExceptionDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: MileageExceptionDetailProps) => () => {
    const { response } = props.mileageExceptionState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let mileageExceptionUid: string | undefined;

    // get project uid
    if (response.data) {
      mileageExceptionUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      MileageExceptionUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case MileageExceptionUserAction.Modify:
          next = '/lookup/mileageexceptions/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: mileageExceptionUid 
      });
    }
  },
};

export const MileageExceptionDetail = compose(
  withRouter,
  withUser,
  withLookupMileageException,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(MileageExceptionDetailView);