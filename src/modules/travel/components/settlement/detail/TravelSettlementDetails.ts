import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { WithTravelSettlement, withTravelSettlement } from '@travel/hoc/withTravelSettlement';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { TravelSettlementDetailViews } from './TravelSettlementDetailViews';

interface OwnRouteParams {
  travelSettlementUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
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
  setDefault: StateHandler<OwnState>;
}

export type TravelSettlementDetailProps 
  = WithUser
  & WithTravelSettlement
  & WithTravelRequest
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<TravelSettlementDetailProps, OwnState> = (props: TravelSettlementDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<TravelSettlementDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: TravelSettlementDetailProps) => (): Partial<OwnState> => ({
    action: TravelUserAction.Modify,
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

const handlerCreators: HandleCreators<TravelSettlementDetailProps, OwnHandler> = {
  handleOnModify: (props: TravelSettlementDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: TravelSettlementDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: TravelSettlementDetailProps) => () => { 
    const { response } = props.travelSettlementState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let travelSettlementUid: string | undefined;

    // get project uid
    if (response.data) {
      travelSettlementUid = response.data.uid;
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
          next = '/travel/settlements/form';
          break;

        default:
          break;
      }

      props.setDefault();
      props.history.push(next, { 
          uid: travelSettlementUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<TravelSettlementDetailProps, OwnState> = {
  componentWillReceiveProps(nextProps: TravelSettlementDetailProps) {
    if (nextProps.travelSettlementState.detail.response !== this.props.travelSettlementState.detail.response) {
      const { response } = nextProps.travelSettlementState.detail;
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.travelRequestDispatch;

      if (user && response) {
            loadDetailRequest ({
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              travelUid: response.data.travelUid
            });
          }
    }
  },
  componentWillUnmount() {
    const { travelSettlementDispatch, travelRequestDispatch } = this.props;

    travelSettlementDispatch.loadDetailDispose();
    travelRequestDispatch.loadDetailDispose();
    
  }
};

export const TravelSettlementDetails = compose(
  withRouter,
  withUser,
  withTravelSettlement,
  withTravelRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle<TravelSettlementDetailProps, OwnState>(lifecycles),
)(TravelSettlementDetailViews);