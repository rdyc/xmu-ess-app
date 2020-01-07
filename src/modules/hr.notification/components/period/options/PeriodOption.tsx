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

interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type PeriodOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<PeriodOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<PeriodOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: string[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item, 
      label: item 
    }));

    return {
      options
    };
  }
};

const lifeCycle: ReactLifeCycleFunctions<PeriodOptionProps, IOwnState> = {
  componentDidMount() {    
    const data: string[] = ['Birthday', 'Contract'];

    this.props.setOptions(data);
  }
};

const component: React.SFC<PeriodOptionProps> = props => {
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

export const PeriodOption = compose<PeriodOptionProps, {}>(
  setDisplayName('PeriodOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);