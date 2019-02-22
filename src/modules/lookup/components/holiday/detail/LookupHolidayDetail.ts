import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupHolidayDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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

import { LookupHolidayDetailView } from './LookupHolidayDetailView';

interface IOwnRouteParams {
  holidayUid: string;
  companyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnState {
  pageOptions?: IAppBarMenu[];
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
  stateUpdate: StateHandler<IOwnState>;
}

export type HolidayDetailProps
  = WithUser
  & WithLayout
  & WithLookupHoliday
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HolidayDetailProps, IOwnState> = (props: HolidayDetailProps): IOwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<HolidayDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: HolidayDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<HolidayDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HolidayDetailProps) => () => { 
    if (props.userState.user && props.match.params.holidayUid && !props.lookupHolidayState.detail.isLoading) {
      props.lookupHolidayDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        holidayUid: props.match.params.holidayUid
      });
    }
  },
  handleOnOpenDialog: (props: HolidayDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'Time Limit'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'Time Limit'}),
      });
    }
  },
  handleOnCloseDialog: (props: HolidayDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: HolidayDetailProps) => () => {
    const { response } = props.lookupHolidayState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let holidayUid: string | undefined;
    let companyUid: string | undefined;

    // get uid
    if (response.data) {
      holidayUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/holidays/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, {
        companyUid,
        uid: holidayUid
      });
    }

  },
  handleSubmit: (props: HolidayDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupHolidayDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.holidayUid) {
      const message = intl.formatMessage(lookupMessage.holiday.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.holidayUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupHolidayDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: HolidayDetailProps) => (response: boolean) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.holiday.message.deleteSuccess, { uid : props.match.params.holidayUid })
    });

    props.history.push('/lookup/holidays/');
  },
  handleSubmitFail: (props: HolidayDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.holiday.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<HolidayDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HolidayDetailProps) {
    // handle updated route params
    if (this.props.match.params.holidayUid !== prevProps.match.params.holidayUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupHolidayState.detail.response !== prevProps.lookupHolidayState.detail.response) {
      const { isLoading } = this.props.lookupHolidayState.detail;

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

export const LookupHolidayDetail = compose<HolidayDetailProps, {}>(
  withRouter,
  withUser,
  withLayout,
  withLookupHoliday,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<HolidayDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupHolidayDetail')
)(LookupHolidayDetailView);