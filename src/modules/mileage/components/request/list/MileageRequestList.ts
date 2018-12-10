import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { MileageUserAction } from '@mileage/classes/types';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { MileageRequestListView } from './MileageRequestListView';

interface OwnHandler {
  handleOnCreate: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  action?: MileageUserAction;
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

export type MileageRequestListProps
  = WithUser
  & OwnState
  & OwnStateUpdaters
  & OwnHandler
  & RouteComponentProps
  & InjectedIntlProps
  & WithMileageRequest;

const createProps: mapper<MileageRequestListProps, OwnState> = (): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<MileageRequestListProps, OwnState, OwnStateUpdaters> = {
  setCreate: (prevState: OwnState, props: MileageRequestListProps) => (): Partial<OwnState> => ({
    action: MileageUserAction.Create,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(mileageMessage.request.confirm.createTitle), 
    dialogContent: props.intl.formatMessage(mileageMessage.request.confirm.createDescription),
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

const handlerCreators: HandleCreators<MileageRequestListProps, OwnHandler> = {
  handleOnCreate: (props: MileageRequestListProps) => () => { 
    props.setCreate();
  },
  handleOnCloseDialog: (props: MileageRequestListProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: MileageRequestListProps) => () => { 
    props.history.push('requests/form');
  },
};

export const MileageRequestList = compose(
  withRouter,
  withUser,
  withMileageRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(MileageRequestListView);