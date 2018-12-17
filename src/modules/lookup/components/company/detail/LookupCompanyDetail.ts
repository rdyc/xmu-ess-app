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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { CompanyDeleteFormData } from './LookupCompanyDelete';
import { LookupCompanyDetailView } from './LookupCompanyDetailView';

interface OwnRouteParams {
  companyUid: string;
}

interface OwnHandler {
  // handleOnModify: () => void;
  handleOnOpenDialog: (action: CompanyUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: CompanyDeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;

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
  // setModify: StateHandler<OwnState>;
  // setDefault: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type CompanyDetailProps
  = WithUser
  & WithLayout
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
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<CompanyDetailProps, OwnState, OwnStateUpdaters> = {
  // setModify: (prevState: OwnState, props: CompanyDetailProps) => (): Partial<OwnState> => ({
  //   action: CompanyUserAction.Modify,
  //   dialogFullScreen: false,
  //   dialogOpen: true,
  //   dialogTitle: props.intl.formatMessage(lookupMessage.company.confirm.modifyTitle),
  //   dialogContent: props.intl.formatMessage(lookupMessage.company.confirm.modifyDescription),
  //   dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  //   dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  // }),
  // setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
  //   dialogFullScreen: false,
  //   dialogOpen: false,
  //   dialogTitle: undefined,
  //   dialogContent: undefined,
  //   dialogCancelLabel: undefined,
  //   dialogConfirmLabel: undefined,
  // })
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<CompanyDetailProps, OwnHandler> = {
  // handleOnModify: (props: CompanyDetailProps) => () => {
  //   props.setModify();
  // },
  // handleOnCloseDialog: (props: CompanyDetailProps) => () => {
  //   props.setDefault();
  // },
  handleOnOpenDialog: (props: CompanyDetailProps) => (action: CompanyUserAction) => {
    if (action === CompanyUserAction.Modify) {
      props.stateUpdate({
        action: CompanyUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
      });
    } else if (action === CompanyUserAction.Delete) {
      props.stateUpdate({
        action: CompanyUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: CompanyDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
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

      props.history.push(next, { 
        uid: companyUid 
      });
    }
  },
  handleDelete: (props: CompanyDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupCompanyDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.companyUid) {
      const message = intl.formatMessage(lookupMessage.company.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.companyUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupCompanyDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: CompanyDetailProps) => (response: boolean) => {
    props.history.push('/lookup/company');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.company.message.deleteSuccess, { uid : props.match.params.companyUid })
    });
  },
  handleDeleteFail: (props: CompanyDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.company.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LookupCompanyDetail = compose(
  withRouter,
  withUser,
  withLayout,
  withLookupCompany,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CompanyDetailProps, OwnHandler>(handlerCreators),
)(LookupCompanyDetailView);