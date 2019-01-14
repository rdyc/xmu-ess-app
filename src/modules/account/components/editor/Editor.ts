import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { EditorView } from './EditorView';

interface OwnRouteParams {
  employeeUid: string;
}

interface OwnState {
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
  & RouteComponentProps<OwnRouteParams>
  & WithUser
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<EditorProps, OwnState> = (): OwnState => ({
  tab: 0
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

export const Editor = compose<EditorProps, {}>(
  withRouter,
  withUser,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<EditorProps, OwnHandler>(handlerCreators)
)(EditorView);