import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/shared/Delete';
import { IOrganizationStructureDeletePayload } from '@organization/classes/request/structure';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
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

import { StructureDetailView } from './StructureDetailView';

interface IOwnRouteParams {
  structureUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type OrganizationStructureDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithOrganizationStructure
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<OrganizationStructureDetailProps, IOwnState> = (props: OrganizationStructureDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<OrganizationStructureDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: OrganizationStructureDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: OrganizationStructureDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: OrganizationStructureDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.structure.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.structure.dialog.modifyDescription),
  }),
  setDelete: (prevState: IOwnState, props: OrganizationStructureDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.structure.dialog.deleteTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.structure.dialog.deleteDescription),
  }),
  setDefault: () => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
  })
};

const handlerCreators: HandleCreators<OrganizationStructureDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationStructureDetailProps) => () => {
    if (props.userState.user && props.match.params.structureUid && !props.organizationStructureState.detail.isLoading) {
       if (props.history.location.state) {
        props.organizationStructureDispatch.loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          structureUid: props.match.params.structureUid
        });
      }
    }
  },
  
  handleOnSelectedMenu: (props: OrganizationStructureDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: OrganizationStructureDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationStructureDetailProps) => () => {
    const { response } = props.organizationStructureState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let structureUid: string | undefined;
    let companyUid: string | undefined;

    // get expense uid
    if (response.data) {
      structureUid = response.data.uid;
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
          next = `/organization/structure/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, {
        companyUid, structureUid
      });
    }
  },
  handleDelete: (props: OrganizationStructureDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.organizationStructureDispatch;

    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.structureUid) {
      const message = intl.formatMessage(organizationMessage.structure.message.emptyProps);
      return Promise.reject(message);
    }

    const payload: IOrganizationStructureDeletePayload = {
      companyUid: props.history.location.state.companyUid,
      structureUid: match.params.structureUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload
      });
    });
  },
  handleDeleteSuccess: (props: OrganizationStructureDetailProps) => (response: boolean) => {
    props.history.push('/organization/structure');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(organizationMessage.structure.message.deleteSuccess, { uid : props.match.params.structureUid })
    });
  },
  handleDeleteFail: (props: OrganizationStructureDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(organizationMessage.structure.message.deleteFailure),
        details: (submitError !== null && typeof submitError === 'object') ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<OrganizationStructureDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationStructureDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.structureUid !== prevProps.match.params.structureUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.organizationStructureState.detail.response !== prevProps.organizationStructureState.detail.response) {
      const { isLoading } = this.props.organizationStructureState.detail;

      // generate option menus
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
          enabled: !isLoading,
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
  }
};

export const StructureDetail = compose(
  setDisplayName('OrganizationStructureDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(StructureDetailView);