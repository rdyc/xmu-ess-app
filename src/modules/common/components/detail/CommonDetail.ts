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

import { CommonUserAction } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { CommonDetailView } from './CommonDetailView';

interface OwnRouteParams {
  category: string;
  typeId: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: CommonUserAction;
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

export type CommonDetailProps 
  = WithUser
  & WithCommonSystem
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<CommonDetailProps, OwnState> = (): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<CommonDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: CommonDetailProps) => (): Partial<OwnState> => ({
    action: CommonUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(commonMessage.system.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(commonMessage.system.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
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

const handlerCreators: HandleCreators<CommonDetailProps, OwnHandler> = {
  handleOnModify: (props: CommonDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: CommonDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: CommonDetailProps) => () => { 
    const { response } = props.commonSystemState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let typeId: number | undefined;

    // get expense uid
    if (response.data) {
      typeId = response.data.id;
    }

    // actions with new page
    const actions = [
      CommonUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case CommonUserAction.Modify:
          next = '/common/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        activity: props.match.params.category,
        uid: typeId,
      });
    }
  },
};

export const CommonDetail = compose(
  withRouter,
  withUser,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
)(CommonDetailView);