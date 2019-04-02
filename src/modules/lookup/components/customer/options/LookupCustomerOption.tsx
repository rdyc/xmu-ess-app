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
  shallowEqual,
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
  isLoading: boolean;
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setLoading: StateHandler<IOwnState>;
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
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupCustomerOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
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
    const { request, response } = this.props.lookupCustomerState.list;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      if (request.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi();
        } else {
          const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
          if (response && response.data) {
            response.data.forEach(item => options.push({ 
              value: item.uid, 
              label: item.name 
            }));
            
            this.props.setOptions(options);
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: LookupCustomerOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.lookupCustomerState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.lookupCustomerState.list;

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
        thisResponse.data.forEach(item => options.push({ 
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
            isLoading: props.isLoading,
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