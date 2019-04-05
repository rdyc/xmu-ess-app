import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import * as moment from 'moment';
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
  month: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type InputMonthOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<InputMonthOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
  month: []
});

const stateUpdaters: StateUpdaters<InputMonthOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: string[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach((item, index) => options.push({ 
      value: (index + 1).toString(), 
      label: item 
    }));

    return {
      options
    };
  }
};

const lifeCycle: ReactLifeCycleFunctions<InputMonthOptionProps, IOwnState> = {
  componentDidMount() {
    const months = this.props.month;
    
    moment.months().map(item => 
      months.push(item)  
    );

    this.props.setOptions(months);
  }
};

const component: React.SFC<InputMonthOptionProps> = props => {
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

export const InputMonthOption = compose<InputMonthOptionProps, {}>(
  setDisplayName('InputMonthOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);