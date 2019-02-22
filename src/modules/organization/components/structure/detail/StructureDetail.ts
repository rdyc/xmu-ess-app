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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IAppBarMenu } from '@layout/interfaces';
import { StructureUserAction } from '@organization/classes/types';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { StructureDetailView } from './StructureDetailView';

interface OwnRouteParams {
  structureUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  pageOptions?: IAppBarMenu[];
  action?: StructureUserAction;
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
  setDefault: StateHandler<OwnState>;
}

export type OrganizationStructureDetailProps
  = WithUser
  & WithOrganizationStructure
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<OrganizationStructureDetailProps, OwnState> = (): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<OrganizationStructureDetailProps, OwnState, OwnStateUpdaters> = {
  setOptions: (prevState: OwnState, props: OrganizationStructureDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
  setModify: (prevState: OwnState, props: OrganizationStructureDetailProps) => (): Partial<OwnState> => ({
    action: StructureUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.structure.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.structure.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<OrganizationStructureDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: OrganizationStructureDetailProps) => () => {
    if (props.userState.user && props.match.params.structureUid && !props.organizationStructureState.detail.isLoading) {
       if (props.history.location.state.companyUid) {
      props.organizationStructureDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        structureUid: props.match.params.structureUid
      });
      } else {
         props.history.push('/organization/structure');
      }
    }
  }, 
  handleOnModify: (props: OrganizationStructureDetailProps) => () => {
    props.setModify();
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
      StructureUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case StructureUserAction.Modify:
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
};

const lifecycles: ReactLifeCycleFunctions<OrganizationStructureDetailProps, OwnState> = {
  componentDidUpdate(prevProps: OrganizationStructureDetailProps) {
    // handle updated route params
    if (this.props.match.params.structureUid !== prevProps.match.params.structureUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.organizationStructureState.detail.response !== prevProps.organizationStructureState.detail.response) {
      const { isLoading } = this.props.organizationStructureState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: StructureUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: StructureUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnModify
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const StructureDetail = compose(
  setDisplayName('OrganizationStructureDetail'),
  withRouter,
  withUser,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(StructureDetailView);