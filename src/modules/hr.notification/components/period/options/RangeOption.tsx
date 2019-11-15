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

interface IRangeValue {
  value: string;
  label: string;
}

interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

export type RangeOptionProps
  = IOwnState
  & IOwnStateUpdater;

const createProps: mapper<RangeOptionProps, IOwnState> = (): IOwnState => ({
  options: [{ label: '', value: ''}],
});

const stateUpdaters: StateUpdaters<RangeOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: () => (values: IRangeValue[]): Partial<IOwnState> => {
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

const lifeCycle: ReactLifeCycleFunctions<RangeOptionProps, IOwnState> = {
  componentDidMount() {    
    const data: IRangeValue[] = [
      {
        label: 'In A Range',
        value: 'InARange'
      },
      {
        label: 'End Of Range',
        value: 'EndOfRange'
      }
    ];

    this.props.setOptions(data);
  }
};

const component: React.SFC<RangeOptionProps> = props => {
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

export const RangeOption = compose<RangeOptionProps, {}>(
  setDisplayName('RangeOption'),
  withStateHandlers(createProps, stateUpdaters),
  lifecycle(lifeCycle)
)(component);