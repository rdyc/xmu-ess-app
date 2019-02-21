import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { CommonUserAction } from '@common/classes/types';
import { categoryTypeTranslator } from '@common/helper';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { IAppBarMenu } from '@layout/interfaces';
import { CommonDetailView } from './CommonDetailView';

interface OwnRouteParams {
  category: string;
  id: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
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
  pageOptions?: IAppBarMenu[];
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
  setOptions: StateHandler<OwnState>;
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
  }),
  setOptions: (prevState: OwnState, props: CommonDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<CommonDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: CommonDetailProps) => () => { 
    if (props.userState.user && props.match.params.category && props.match.params.id && !props.commonSystemState.detail.isLoading) {
      props.commonDispatch.systemDetailRequest({
          category: categoryTypeTranslator(props.match.params.category),
          id: props.match.params.id
      });
    }
  },
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
    const category = props.match.params.category;

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
          next = `/common/system/${category}/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        id: typeId,
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<CommonDetailProps, OwnState> = {
  componentDidUpdate(prevProps: CommonDetailProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.handleOnLoadApi();
    }

    if (this.props.commonSystemState.detail.response !== prevProps.commonSystemState.detail.response) {
      const { isLoading } = this.props.commonSystemState.detail;

      const options: IAppBarMenu[] = [
        {
          id: CommonUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi,
        },
        {
          id: CommonUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnModify
        }
      ];

      this.props.setOptions(options);
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
  lifecycle(lifecycles),
)(CommonDetailView);