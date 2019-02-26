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
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { CommonDetailView } from './CommonDetailView';

interface IOwnRouteParams {
  category: string;
  id: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  isAdmin: boolean;
  action?: CommonUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

export type CommonDetailProps 
  = WithUser
  & WithCommonSystem
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<CommonDetailProps, IOwnState> = (): IOwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  shouldLoad: false,
});

const stateUpdaters: StateUpdaters<CommonDetailProps, IOwnState, IOwnStateUpdaters> = {
  setModify: (prevState: IOwnState, props: CommonDetailProps) => (): Partial<IOwnState> => ({
    action: CommonUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(commonMessage.system.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(commonMessage.system.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<CommonDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: CommonDetailProps) => () => { 
    if (props.userState.user && props.match.params.category && props.match.params.id && !props.commonSystemState.detail.isLoading) {
      props.commonDispatch.systemDetailRequest({
          category: categoryTypeTranslator(props.match.params.category),
          id: props.match.params.id
      });
    }
  },
  handleOnSelectedMenu: (props: CommonDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case CommonUserAction.Refresh:
        props.setShouldLoad();
        break;
      case CommonUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
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

const lifecycles: ReactLifeCycleFunctions<CommonDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: CommonDetailProps) {
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.handleOnLoadApi();
    }

    if (this.props.commonSystemState.detail.response !== prevProps.commonSystemState.detail.response) {
      const { isLoading } = this.props.commonSystemState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: CommonUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: CommonUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
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