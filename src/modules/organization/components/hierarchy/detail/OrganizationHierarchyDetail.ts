import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { IOrganizationHierarchyDeletePayload } from '@organization/classes/request/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { OrganizationHierarchyDetailView } from './OrganizationHierarchyDetailView';

interface IOwnRouteParams {
  hierarchyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface IOwnState {
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type OrganizationHierarchyDetailProps 
  = WithOidc
  & WithUser
  & WithLayout
  & WithOrganizationHierarchy
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<OrganizationHierarchyDetailProps, IOwnState> = (props: OrganizationHierarchyDetailProps): IOwnState => {
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
  
  return ({
    isAdmin,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  });
};

const stateUpdaters: StateUpdaters<OrganizationHierarchyDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: OrganizationHierarchyDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyDescription)
  }),
  setDelete: (prevState: IOwnState, props: OrganizationHierarchyDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle), 
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'hierarchy'}),
  }),
  setDefault: () => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<OrganizationHierarchyDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationHierarchyDetailProps) => () => { 
    if (props.userState.user && props.match.params.hierarchyUid && !props.organizationHierarchyState.detail.isLoading) {
      if (props.history.location.state.companyUid) {
        props.organizationHierarchyDispatch.loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          hierarchyUid: props.match.params.hierarchyUid
        });
      } else {
        props.history.push('/organization/hierarchy');
      }
    }
  },
  handleOnSelectedMenu: (props: OrganizationHierarchyDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnModify: (props: OrganizationHierarchyDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: OrganizationHierarchyDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationHierarchyDetailProps) => () => { 
    const { response } = props.organizationHierarchyState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let hierarchyUid: string | undefined;
    let companyUid: string | undefined;

    // get expense uid
    if (response.data) {
      hierarchyUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/organization/hierarchy/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        companyUid, hierarchyUid
      });
    }
  },
  handleDelete: (props: OrganizationHierarchyDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.organizationHierarchyDispatch;
    const { response } = props.organizationHierarchyState.detail;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.hierarchyUid) {
      const message = intl.formatMessage(lookupMessage.company.message.emptyProps);
      return Promise.reject(message);
    }
    if (response) {
      const payload: IOrganizationHierarchyDeletePayload = {
        hierarchyUid: match.params.hierarchyUid,
        companyUid: response.data.companyUid
      };

      return new Promise((resolve, reject) => {
        deleteRequest({
          resolve,
          reject,
          data: payload
        });
      });
    }
    
    return undefined;
  },
  handleDeleteSuccess: (props: OrganizationHierarchyDetailProps) => (response: boolean) => {
    props.history.push('/organization/hierarchy');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(organizationMessage.hierarchy.message.deleteSuccess, { uid : props.match.params.hierarchyUid })
    });
  },
  handleDeleteFail: (props: OrganizationHierarchyDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(organizationMessage.hierarchy.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationHierarchyDetailProps) {
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.hierarchyUid !== prevProps.match.params.hierarchyUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.organizationHierarchyState.detail.response !== prevProps.organizationHierarchyState.detail.response) {
      const { isLoading } = this.props.organizationHierarchyState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  },
};

export const OrganizationHierarchyDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(OrganizationHierarchyDetailView);