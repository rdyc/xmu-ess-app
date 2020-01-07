import { Moment } from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, lifecycle, mapper, pure, ReactLifeCycleFunctions, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { BaseFieldProps, WrappedFieldProps } from 'redux-form';
import { InputDateClearableView } from './InputDateClearableView';

interface OwnProps extends WrappedFieldProps, BaseFieldProps { 
  dateFormat?: string | undefined;
  type?: string; 
  required?: boolean;
  label: string; 
  disabled: boolean;
  disablePast?: boolean;
}

interface OwnHandlers {
  handleOnChange: (event: Moment) => void;
  // handleOnBlur: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

interface OwnState {
  value: Moment;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type InputDateClearableProps 
  = OwnProps
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters
  & InjectedIntlProps;

const createProps: mapper<InputDateClearableProps, OwnState> = (props: InputDateClearableProps): OwnState => ({
  value: props.input.value
});

const handlerCreators: HandleCreators<InputDateClearableProps, OwnHandlers> = {
  handleOnChange: (props: InputDateClearableProps) => (event: Moment) => { 
    !(event === undefined || event === null) ? props.input.onChange(event.toISOString(true)) : props.input.onChange(event);
    console.log(event);
    props.stateUpdate({
      value: event
    });
  }
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const lifecycles: ReactLifeCycleFunctions<InputDateClearableProps, {}> = {
  componentDidUpdate(prevProps: InputDateClearableProps) {
    if (prevProps.input.value !== this.props.input.value) {
      this.props.stateUpdate({
        value: this.props.input.value
      });
    }
  }
};

export const InputDateClearable = compose<InputDateClearableProps, OwnProps>(
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  pure
)(InputDateClearableView);