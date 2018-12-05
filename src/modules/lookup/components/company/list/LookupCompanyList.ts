import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyDeletePayload } from '@lookup/classes/request/company';
import { CompanyUserAction } from '@lookup/classes/types/company';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupCompanyListView } from './LookupCompanyListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  companyUid: string;
  callback?: () => void;
  reload: boolean;
  action?: CompanyUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDelete: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

const createProps: mapper<CompanyListProps, OwnState> = (props: CompanyListProps): OwnState => ({
  companyUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<CompanyListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: CompanyListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: CompanyUserAction.Delete,
    companyUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    companyUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<CompanyListProps, OwnHandlers> = {
  handleOnDelete: (props: CompanyListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: CompanyListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: CompanyListProps) => () => {
    const { response } = props.lookupCompanyState.all;
    const { deleteRequest, loadAllDispose } = props.lookupCompanyDispatch;
    const { companyUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: companyUid
    };
    
    const message = intl.formatMessage(lookupMessage.company.message.deleteSuccess, {uid: companyUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupCompanyDeletePayload
      });

      alertAdd({
        message,
        time: new Date()
      });
  
      if (response && props.callback) {
        loadAllDispose();
        props.callback();
      }
      props.setDefault();
      props.history.push(`/lookup/company/list`);
    });
  },
};

export type CompanyListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupCompany;

export default compose<CompanyListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupCompany,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CompanyListProps, OwnHandlers>(handlerCreators),
)(LookupCompanyListView);