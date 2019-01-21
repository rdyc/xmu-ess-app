import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { FormMode } from '@generic/types';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { isNullOrUndefined } from 'util';
import { EditorView } from './EditorView';

interface OwnState {
  formMode: FormMode;
  tab: number;
}

interface OwnHandler {
  handleTab: (event: any, value: any) => void;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type EditorProps
  = OwnState
  & OwnHandler
  & OwnStateUpdaters
  & RouteComponentProps<{}>
  & WithUser
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<EditorProps, OwnState> = (): OwnState => ({
  tab: 0,
  formMode: FormMode.New
});

const stateUpdaters: StateUpdaters<EditorProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<EditorProps, OwnHandler> = {
  handleTab: (props: EditorProps) => (event: any, value: any) => {
    props.stateUpdate({
      tab: value
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<EditorProps, {}> = {
  componentDidMount() {
    const { history, stateUpdate } = this.props;

    if (!isNullOrUndefined(history.location.state)) {
      stateUpdate({
        formMode: FormMode.Edit,
      });
    }
  }
};

export const Editor = compose<EditorProps, {}>(
  withRouter,
  withUser,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EditorProps, OwnHandler>(handlerCreators),
  lifecycle<EditorProps, {}>(lifecycles),
)(EditorView);