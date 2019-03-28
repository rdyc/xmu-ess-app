import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ICurrencyListFilter } from '@lookup/classes/filters';
import { WithLookupCurrency, withLookupCurrency } from '@lookup/hoc/withLookupCurrency';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface IOwnOption {
  filter?: ICurrencyListFilter;
}

interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

export type LookupCurrencyOptionProps
  = WithLookupCurrency
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupCurrencyOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<LookupCurrencyOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupCurrencyOptionProps) => () => {
    const { isExpired, isLoading } = props.lookupCurrencyState.list;
    const { loadListRequest } = props.lookupCurrencyDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupCurrencyOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: LookupCurrencyOptionProps) {
    if (this.props.lookupCurrencyState.list.response !== prevProps.lookupCurrencyState.list.response) {
      const { response } = this.props.lookupCurrencyState.list;

      if (response && response.data) {
        const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
        response.data.forEach(item => options.push({ 
          value: item.uid, 
          label: item.name 
        }));

        this.props.setOptions(options);
      }
    }
  }
};

const component: React.SFC<LookupCurrencyOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.lookupCurrencyState.list.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const LookupCurrencyOption = compose<LookupCurrencyOptionProps, IOwnOption>(
  setDisplayName('LookupCurrencyOptionProps'),
  withLookupCurrency,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);