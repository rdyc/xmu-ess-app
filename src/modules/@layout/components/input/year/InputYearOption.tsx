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
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type InputYearOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<InputYearOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<InputYearOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: number[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.toString(), 
      label: item.toString() 
    }));

    return {
      options
    };
  }
};

const lifeCycle: ReactLifeCycleFunctions<InputYearOptionProps, IOwnState> = {
  componentDidMount() {    
    const getYear: number = Number(moment().format('YYYY'));
  
    const year: number[] = [getYear - 1, getYear];

    this.props.setOptions(year);
  }
};

const component: React.SFC<InputYearOptionProps> = props => {
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

export const InputYearOption = compose<InputYearOptionProps, {}>(
  setDisplayName('InputYearOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);