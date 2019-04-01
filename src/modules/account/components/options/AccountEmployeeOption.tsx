import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployeeListRequest } from '@account/classes/queries';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
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
  filter?: IEmployeeListFilter;
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

export type AccountEmployeeOptionProps
  = WithAccountEmployee
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<AccountEmployeeOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<AccountEmployeeOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeOptionProps) => () => {
    const { isExpired, isLoading } = props.accountEmployeeState.list;

    const request: IEmployeeListRequest = {
      filter: props.filter
    };

    if (isExpired || !isLoading) {
      props.accountEmployeeDispatch.loadListRequest(request);
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<AccountEmployeeOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.accountEmployeeState.list;

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
              label: item.fullName 
            }));
            
            this.props.setOptions(options);
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.accountEmployeeState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.accountEmployeeState.list;

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
        thisResponse.data.forEach(item => options.push({ 
          value: item.uid, 
          label: item.fullName 
        }));

        this.props.setOptions(options);
      }
    }
  }
};

const component: React.SFC<AccountEmployeeOptionProps> = props => {
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

export const AccountEmployeeOption = compose<AccountEmployeeOptionProps, IOwnOption>(
  setDisplayName('AccountEmployeeOption'),
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);