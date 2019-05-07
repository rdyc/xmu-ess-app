import { EmployeeInformationUserAction } from '@account/classes/types';
import { withAccountEmployeeMy, WithAccountEmployeeMy } from '@account/hoc/withAccountEmployeeMy';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
import { InformationDetailView } from './InformationDetailView';

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  action?: EmployeeInformationUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type InformationDetailProps
  = WithUser
  & WithAccountEmployeeMy
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<InformationDetailProps, IOwnState> = (): IOwnState => ({
  shouldLoad: false
});

const stateUpdaters: StateUpdaters<InformationDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<InformationDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: InformationDetailProps) => () => { 
    if (props.userState.user && !props.accountEmployeeMyState.detail.isLoading) {
      props.accountEmployeeMyDispatch.loadRequest();
    }
  },
  handleOnSelectedMenu: (props: InformationDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case EmployeeInformationUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<InformationDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: InformationDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated response state
    if (this.props.accountEmployeeMyState.detail.response !== prevProps.accountEmployeeMyState.detail.response) {
      const { isLoading } = this.props.accountEmployeeMyState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: EmployeeInformationUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const InformationDetail = compose(
  withUser,
  withAccountEmployeeMy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('InformationDetail')
)(InformationDetailView);