import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import * as React from 'react';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';

interface IOwnOption {
  withFuture?: boolean;
}
interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type InputSemesterOptionProps
  = IOwnState
  & IOwnOption
  & IOwnStateUpdater;

const createProps: mapper<InputSemesterOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<InputSemesterOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: ISelectFieldOption[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.value, 
      label: item.label 
    }));

    return {
      options
    };
  }
};

const lifeCycle: ReactLifeCycleFunctions<InputSemesterOptionProps, IOwnState> = {
  componentDidMount() {    
    const year: ISelectFieldOption[] = [
      { label: 'Mid Year', value: '1'},
      { label: 'Full Year', value: '2'}
    ];

    this.props.setOptions(year);
  }
};

const component: React.SFC<InputSemesterOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const InputSemesterOption = compose<InputSemesterOptionProps, IOwnOption>(
  setDisplayName('InputSemesterOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);