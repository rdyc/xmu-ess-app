import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { CompanyUserAction } from '@lookup/classes/types/company';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupCompanyDetailView } from './LookupCompanyDetailView';

interface OwnRouteParams {
  companyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: CompanyUserAction;
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

export type CompanyDetailProps
  = WithUser
  & WithLookupCompany
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<CompanyDetailProps, OwnState> = (props: CompanyDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<CompanyDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: CompanyDetailProps) => (): Partial<OwnState> => ({
    action: CompanyUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.company.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.company.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
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

const handlerCreators: HandleCreators<CompanyDetailProps, OwnHandler> = {
  handleOnModify: (props: CompanyDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: CompanyDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: CompanyDetailProps) => () => {
    const { response } = props.lookupCompanyState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let companyUid: string | undefined;

    // get project uid
    if (response.data) {
      companyUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      CompanyUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case CompanyUserAction.Modify:
          next = '/lookup/company/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: companyUid 
      });
    }
  },
};

export const LookupCompanyDetail = compose(
  withRouter,
  withUser,
  withLookupCompany,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupCompanyDetailView);