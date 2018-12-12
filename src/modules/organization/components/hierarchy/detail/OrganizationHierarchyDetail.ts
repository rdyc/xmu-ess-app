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

import { HierarchyUserAction } from '@organization/classes/types';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { OrganizationHierarchyDetailView } from './OrganizationHierarchyDetailView';

interface OwnRouteParams {
  hierarchyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: HierarchyUserAction;
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

export type OrganizationHierarchyDetailProps 
  = WithUser
  & WithOrganizationHierarchy
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<OrganizationHierarchyDetailProps, OwnState> = (): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<OrganizationHierarchyDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: OrganizationHierarchyDetailProps) => (): Partial<OwnState> => ({
    action: HierarchyUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyDescription),
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

const handlerCreators: HandleCreators<OrganizationHierarchyDetailProps, OwnHandler> = {
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
      HierarchyUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case HierarchyUserAction.Modify:
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
};

export const OrganizationHierarchyDetail = compose(
  withRouter,
  withUser,
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(OrganizationHierarchyDetailView);