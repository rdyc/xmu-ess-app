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

import { StructureUserAction } from '@organization/classes/types';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { StructureDetailView } from './StructureDetailView';

interface OwnRouteParams {
  structureUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: StructureUserAction;
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

export const StructureDetail = compose(
  withRouter,
  withUser,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(StructureDetailView);