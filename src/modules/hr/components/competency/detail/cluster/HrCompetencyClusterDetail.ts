import { AppRole } from '@constants/AppRole';
import { IHrCompetencyClusterDeletePayload } from '@hr/classes/request';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { HrCompetencyClusterDetailView } from './HrCompetencyClusterDetailView';

interface IOwnRouteParams {
  clusterUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: (payload: DeleteFormData) => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type HrCompetencyClusterDetailProps
  = WithOidc
  & WithUser
  & WithLayout
  & WithHrCompetencyCluster
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyClusterDetailProps, IOwnState> = (props: HrCompetencyClusterDetailProps): IOwnState => { 
    // checking admin status
    const { user } = props.oidcState;
    let isAdmin: boolean = false;
  
    if (user) {
      const role: string | string[] | undefined = user.profile.role;
  
      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }
    }
    
    return { 
      isAdmin,
      shouldLoad: false,
      dialogFullScreen: false,
      dialogOpen: false,
      dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
      dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyClusterDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Cluster'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'cluster'}),
  }),
  setDelete: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.deleteTitle, {state: 'Cluster'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.deleteDescription, {state: 'cluster'}),
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
  })
};

const handlerCreators: HandleCreators<HrCompetencyClusterDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyClusterDetailProps) => () => { 
    const { user } = props.userState;
    const clusterUid = props.match.params.clusterUid;
    const { isLoading } = props.hrCompetencyClusterState.detail;

    if (user && clusterUid && !isLoading) {
      props.hrCompetencyClusterDispatch.loadDetailRequest({
        clusterUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyClusterDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;

      case LookupUserAction.Modify:
        props.setModify();
        break;

      case LookupUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyClusterDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyClusterDetailProps) => () => {
    const { response } = props.hrCompetencyClusterState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let clusterUid: string | undefined;

    // get project uid
    if (response.data) {
      clusterUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/hr/competency/cluster/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: clusterUid 
      });
    }
  },
  handleSubmit: (props: HrCompetencyClusterDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.hrCompetencyClusterDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.clusterUid) {
      const message = intl.formatMessage(hrMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.clusterUid
    };

    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as IHrCompetencyClusterDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: HrCompetencyClusterDetailProps) => (response: boolean) => {
    props.hrCompetencyClusterDispatch.loadListRequest({
      filter: {
        orderBy: 'name',
        direction: 'ascending'
      }
    });

    props.history.push(`/hr/competency/cluster`);
    const { response: dataDetail } = props.hrCompetencyClusterState.detail;

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(hrMessage.shared.message.deleteSuccess, { uid : dataDetail && dataDetail.data.name, state: 'Cluster', type: 'name' })
    });
  },
  handleSubmitFail: (props: HrCompetencyClusterDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(hrMessage.shared.message.deleteFailure),
      details: isObject(submitError) ? (submitError.errors[0] ? submitError.errors[0].message : submitError.message) : submitError
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyClusterDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
  componentDidUpdate(prevProps: HrCompetencyClusterDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.clusterUid !== prevProps.match.params.clusterUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyClusterState.detail.response !== prevProps.hrCompetencyClusterState.detail.response) {
      const { isLoading } = this.props.hrCompetencyClusterState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyClusterDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withHrCompetencyCluster,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyClusterDetail')
)(HrCompetencyClusterDetailView);