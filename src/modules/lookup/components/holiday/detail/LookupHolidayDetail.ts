import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupHolidayUserAction } from '@lookup/classes/types';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { LookupHolidayDetailView } from './LookupHolidayDetailView';

interface OwnRouteParams {
  holidayUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LookupHolidayUserAction;
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

export type LookupHolidayDetailProps 
  = WithUser
  & WithLookupHoliday
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupHolidayDetailProps, OwnState> = (props: LookupHolidayDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LookupHolidayDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: LookupHolidayDetailProps) => (): Partial<OwnState> => ({
    action: LookupHolidayUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.holiday.confirm.modifyTitle), 
    dialogContent: props.intl.formatMessage(lookupMessage.holiday.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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

const handlerCreators: HandleCreators<LookupHolidayDetailProps, OwnHandler> = {
  handleOnModify: (props: LookupHolidayDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: LookupHolidayDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: LookupHolidayDetailProps) => () => { 
    const { response } = props.lookupHolidayState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let lookupHolidayUid: string | undefined;

    // get Leave uid
    if (response.data) {
      lookupHolidayUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupHolidayUserAction.Modify, 
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupHolidayUserAction.Modify:
          next = '/lookup/holiday/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: lookupHolidayUid 
      });
    }
  },
};

export const LookupHolidayDetail = compose(
  withRouter,
  withUser,
  withLookupHoliday,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(LookupHolidayDetailView);