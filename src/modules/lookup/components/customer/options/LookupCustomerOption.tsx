import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithLookupCustomer, withLookupCustomer } from '@lookup/hoc/withLookupCustomer';
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
  filter?: ILookupCustomerGetListFilter;
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

export type LookupCustomerOptionProps
  = WithLookupCustomer
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupCustomerOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<LookupCustomerOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupCustomerOptionProps) => () => {
    const { isExpired, isLoading } = props.lookupCustomerState.list;
    const { loadListRequest } = props.lookupCustomerDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupCustomerOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: LookupCustomerOptionProps) {
    if (this.props.lookupCustomerState.list.response !== prevProps.lookupCustomerState.list.response) {
      const { response } = this.props.lookupCustomerState.list;

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

const component: React.SFC<LookupCustomerOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.lookupCustomerState.list.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const LookupCustomerOption = compose<LookupCustomerOptionProps, IOwnOption>(
  setDisplayName('LookupCustomerOptionProps'),
  withLookupCustomer,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);