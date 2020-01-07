// import { IAccountEmployee } from '@account/classes';
import { IEmployeeListFilter } from '@account/classes/filters';
import { IEmployeeListRequest } from '@account/classes/queries';
import { IEmployee } from '@account/classes/response';
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
  // default?: IAccountEmployee;
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

export type AccountEmployeeAllOptionProps
  = WithAccountEmployee
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [
    { label: '', value: ''}
  ]
});

const stateUpdaters: StateUpdaters<AccountEmployeeAllOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState, props: AccountEmployeeAllOptionProps) => (values: IEmployee[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: '', secondLabel: ''}
    ];
        
    // inject default when doesn't exist in values
    // if (props.default) {
    //   const employee = props.default;
    //   const index = values.findIndex(item => item.uid === employee.uid);

    //   if (index === -1) {
    //     options.push({
    //       value: employee.uid,
    //       label: employee.fullName,
    //       data: employee
    //     });
    //   }
    // }

    // iterate each values
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.fullName,
      secondLabel: item.company && item.company.name 
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<AccountEmployeeAllOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeAllOptionProps) => () => {
    const { isExpired, isLoading } = props.accountEmployeeState.allList;

    const request: IEmployeeListRequest = {
      filter: props.filter
    };

    if (isExpired || !isLoading) {
      props.accountEmployeeDispatch.loadAllListRequest(request);
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<AccountEmployeeAllOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.accountEmployeeState.allList;

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
          if (response && response.data) {
            this.props.setOptions(response.data);
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeAllOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse, request } = this.props.accountEmployeeState.allList;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.accountEmployeeState.allList;

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (request && request.filter) {
      const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});

      if (shouldUpdate) {
        this.props.handleOnLoadApi();
      }
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        this.props.setOptions(thisResponse.data);
      }
    }
  }
};

const component: React.SFC<AccountEmployeeAllOptionProps> = props => {
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

export const AccountEmployeeAllOption = compose<AccountEmployeeAllOptionProps, IOwnOption>(
  setDisplayName('AccountEmployeeAllOption'),
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);