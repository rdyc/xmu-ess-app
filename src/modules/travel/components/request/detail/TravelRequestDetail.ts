import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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

import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelRequestDetailView } from './TravelRequestDetailView';

interface OwnRouteParams {
  travelUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleAddSettlement: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: TravelUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setAddSettlement: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type TravelRequestDetailProps 
  = WithUser
  & WithTravelRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<TravelRequestDetailProps, OwnState> = (props: TravelRequestDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<TravelRequestDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: TravelRequestDetailProps) => (): Partial<OwnState> => ({
    action: TravelUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue)
  }),
  setAddSettlement: (prevState: OwnState, props: TravelRequestDetailProps) => (): Partial<OwnState> => ({
    action: TravelUserAction.AddSettlement,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.addSettlementTitle), 
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.addSettlementDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.discard),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.continue),
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

const handlerCreators: HandleCreators<TravelRequestDetailProps, OwnHandler> = {
  handleOnModify: (props: TravelRequestDetailProps) => () => { 
    props.setModify();
  },
  handleAddSettlement: (props: TravelRequestDetailProps) => () => { 
    props.setAddSettlement();
  },
  handleOnCloseDialog: (props: TravelRequestDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: TravelRequestDetailProps) => () => { 
    const { response } = props.travelRequestState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let travelUid: string | undefined;

    // get project uid
    if (response.data) {
      travelUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      TravelUserAction.Modify, 
      TravelUserAction.AddSettlement
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case TravelUserAction.Modify:
          next = '/travel/requests/form';
          break;
          
        case TravelUserAction.AddSettlement:
          next = '/travel/settlement/requests/form';
          break;

        default:
          break;
      }

      props.setDefault();
      if (props.action === TravelUserAction.AddSettlement) {
        props.history.push(next, { 
          traveluid: travelUid 
        });      
      } else { 
        props.history.push(next, { 
          uid: travelUid 
        });
      }
    }
  },
};

export const TravelRequestDetail = compose(
  withRouter,
  withUser,
  withTravelRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(TravelRequestDetailView);