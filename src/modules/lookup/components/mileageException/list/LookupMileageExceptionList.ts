import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { MileageExceptionUserAction } from '@lookup/classes/types';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupMileageExceptionListView } from './LookupMileageExceptionListView';

interface OwnHandler {
  handleOnCreate: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  action?: MileageExceptionUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setCreate: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type MileageExceptionListProps
  = WithUser
  & OwnState
  & OwnStateUpdaters
  & OwnHandler
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupMileageException;

const createProps: mapper<MileageExceptionListProps, OwnState> = (): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<MileageExceptionListProps, OwnState, OwnStateUpdaters> = {
  setCreate: (prevState: OwnState, props: MileageExceptionListProps) => (): Partial<OwnState> => ({
    action: MileageExceptionUserAction.Create,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.createTitle), 
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.createDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.cancel),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.ok)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<MileageExceptionListProps, OwnHandler> = {
  handleOnCreate: (props: MileageExceptionListProps) => () => { 
    props.setCreate();
  },
  handleOnCloseDialog: (props: MileageExceptionListProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: MileageExceptionListProps) => () => { 
    props.history.push('mileageexceptions/form');
  },
};

export const LookupMileageExceptionList = compose(
  withRouter,
  withUser,
  withLookupMileageException,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(LookupMileageExceptionListView);