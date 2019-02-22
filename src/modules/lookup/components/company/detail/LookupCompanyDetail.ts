import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyDeletePayload } from '@lookup/classes/request/company';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { LookupCompanyDetailView } from './LookupCompanyDetailView';

interface OwnRouteParams {
  companyUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;

}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
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
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<CompanyDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: OwnState, props: CompanyDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<CompanyDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: CompanyDetailProps) => () => { 
    if (props.userState.user && props.match.params.companyUid && !props.lookupCompanyState.detail.isLoading) {
      props.lookupCompanyDispatch.loadDetailRequest({
        companyUid: props.match.params.companyUid,
      });
    }
  },
  handleOnOpenDialog: (props: CompanyDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.company.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.company.confirm.modifyDescription),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.company.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.company.confirm.deleteDescription),
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
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
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

const lifecycles: ReactLifeCycleFunctions<CompanyDetailProps, OwnState> = {
  componentDidUpdate(prevProps: CompanyDetailProps) {
    // handle updated route params
    if (this.props.match.params.companyUid !== prevProps.match.params.companyUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupCompanyState.detail.response !== prevProps.lookupCompanyState.detail.response) {
      const { isLoading } = this.props.lookupCompanyState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Modify)
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Delete)
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupCompanyDetail = compose(
  setDisplayName('LookupCompanyDetail'),
  withRouter,
  withUser,
  withLayout,
  withLookupCompany,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CompanyDetailProps, OwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(LookupCompanyDetailView);