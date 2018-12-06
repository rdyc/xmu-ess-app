import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { TimesheetUserAction } from '@timesheet/classes/types';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
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

import { WithTimesheetEntry, withTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { TimesheetEntryDetailView } from './TimesheetEntryDetailView';

interface OwnRouteParams {
  timesheetUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: TimesheetUserAction;
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

export type TimesheetEntryDetailProps
  = WithUser
  & WithTimesheetEntry
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<TimesheetEntryDetailProps, OwnState> = (props: TimesheetEntryDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<TimesheetEntryDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: TimesheetEntryDetailProps) => (): Partial<OwnState> => ({
    action: TimesheetUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(timesheetMessage.entry.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(timesheetMessage.entry.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<TimesheetEntryDetailProps, OwnHandler> = {
  handleOnModify: (props: TimesheetEntryDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: TimesheetEntryDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: TimesheetEntryDetailProps) => () => {
    const { response } = props.timesheetEntryState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let timesheetUid: string | undefined;

    // get project uid
    if (response.data) {
      timesheetUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      TimesheetUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case TimesheetUserAction.Modify:
          next = '/timesheet/entry/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: timesheetUid 
      });
    }
  },
};

export const TimesheetEntryDetail = compose(
  withRouter,
  withUser,
  withTimesheetEntry,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(TimesheetEntryDetailView);