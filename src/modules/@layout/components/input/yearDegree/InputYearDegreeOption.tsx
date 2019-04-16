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

export type InputYearDegreeOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<InputYearDegreeOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<InputYearDegreeOptionProps, IOwnState, IOwnStateUpdater> = {
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

const lifeCycle: ReactLifeCycleFunctions<InputYearDegreeOptionProps, IOwnState> = {
  componentDidMount() {    
    const getYear: number = Number(moment().format('YYYY'));
    // const until: number = 30;
    const year: number[] = [];
    for (let i = 0; i < 30; i += 1 ) {
      year.push(getYear - i);      
    }
    
    this.props.setOptions(year);
  }
};

const component: React.SFC<InputYearDegreeOptionProps> = props => {
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

export const InputYearDegreeOption = compose<InputYearDegreeOptionProps, {}>(
  setDisplayName('InputYearDegreeOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);