import { WorkflowStatusType } from '@common/classes/types';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { TravelUserAction } from '@travel/classes/types';
import { WithTravelRequest, withTravelRequest } from '@travel/hoc/withTravelRequest';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { isNull } from 'util';
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
  pageOptions?: IAppBarMenu[];
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
  setOptions: StateHandler<OwnState>;
  setModify: StateHandler<OwnState>;
  setAddSettlement: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type TravelRequestDetailProps 
  = WithOidc
  & WithUser
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
  setOptions: (prevState: OwnState, props: TravelRequestDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
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
  handleOnLoadApi: (props: TravelRequestDetailProps) => () => { 
    if (props.userState.user && props.match.params.travelUid && !props.travelRequestState.detail.isLoading) {
      props.travelRequestDispatch.loadDetailRequest({
        companyUid: props.userState.user.company.uid,
        positionUid: props.userState.user.position.uid,
        travelUid: props.match.params.travelUid
      });
    }
  },
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

const lifecycles: ReactLifeCycleFunctions<TravelRequestDetailProps, OwnState> = {
  componentDidUpdate(prevProps: TravelRequestDetailProps) {
    // handle updated route params
    if (this.props.match.params.travelUid !== prevProps.match.params.travelUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.travelRequestState.detail.response !== prevProps.travelRequestState.detail.response) {
      const { isLoading, response } = this.props.travelRequestState.detail;

      // find status type
      let _statusType: string | undefined = undefined;

      if (response && response.data) {
        _statusType = response.data.statusType;
      }

      // checking status types
      const isContains = (statusType: string | undefined, statusTypes: string[]): boolean => { 
        return statusType ? statusTypes.indexOf(statusType) !== -1 : false;
      };
      
      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: TravelUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: () => this.props.handleOnLoadApi
        },
        {
          id: TravelUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: isContains(_statusType, [ WorkflowStatusType.Submitted, WorkflowStatusType.InProgress]),
          onClick: this.props.handleOnModify
        },
        {
          id: TravelUserAction.AddSettlement,
          name: this.props.intl.formatMessage(travelMessage.request.option.addSettlement),
          enabled: true,
          visible: isContains(_statusType, [ WorkflowStatusType.Approved]) && isNull(response && response.data.settlement)  ,
          onClick: this.props.handleAddSettlement
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const TravelRequestDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withTravelRequest,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('TravelRequestDetail')
)(TravelRequestDetailView);