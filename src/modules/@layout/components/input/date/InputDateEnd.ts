import { ILeaveGetEnd } from '@leave/classes/response';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  pure,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { InputDateEndView } from './InputDateEndView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  type?: string; 
  placeholder?: string;
  required?: boolean;
  label: string; 
  disabled: boolean; 
  multiline: boolean;
  value: ILeaveGetEnd | undefined; 
}

interface OwnHandlers {
}

interface OwnState {
  // value: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputDateEndProps 
  = OwnProps
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;
  
const handlerCreators: HandleCreators<InputDateEndProps, OwnHandlers> = {

};

const createProps: mapper<InputDateEndProps, OwnState> = (props: InputDateEndProps): OwnState => ({
  // value: props.input.value
});

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputDateEndProps, {}> = {
  // componentDidUpdate(prevProps: InputDateEndProps) {
  //   if (prevProps.input.value !== this.props.input.value) {
  //     this.props.stateUpdate({
  //       value: this.props.input.value
  //     });
  //   }
  // }
};

export const InputDateEnd = compose<InputDateEndProps, OwnProps>(
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  pure
)(InputDateEndView);