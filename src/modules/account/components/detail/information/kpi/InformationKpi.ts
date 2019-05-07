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
import { InformationKpiView } from './InformationKpiView';

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

export type InformationKpiProps
  = WithUser
  & WithAccountEmployeeMy
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<InformationKpiProps, IOwnState> = (): IOwnState => ({
  shouldLoad: false
});

const stateUpdaters: StateUpdaters<InformationKpiProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<InformationKpiProps, IOwnHandler> = {
  handleOnLoadApi: (props: InformationKpiProps) => () => { 
    if (props.userState.user && !props.accountEmployeeMyState.detail.isLoading) {
      props.accountEmployeeMyDispatch.loadRequest();
    }
  },
  handleOnSelectedMenu: (props: InformationKpiProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case EmployeeInformationUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<InformationKpiProps, IOwnState> = {
  componentDidUpdate(prevProps: InformationKpiProps) {
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

export const InformationKpi = compose(
  withUser,
  withAccountEmployeeMy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('InformationKpi')
)(InformationKpiView);