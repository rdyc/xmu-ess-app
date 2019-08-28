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

export interface IEmployeesOption {
  [key: string]: ISelectFieldOption[];
}

interface IOwnOption {
  companyUid?: string;
  positoinUid?: string;
}

interface IOwnState {
  isLoading: boolean;
  optionsList: IEmployeesOption;
  optionBlank: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setLoading: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: (companyUid?: string, positionUid?: string) => void;
}

export type AccountEmployeeMultipleOptionProps
  = WithAccountEmployee
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  isLoading: false,
  optionBlank: [{ label: '', value: ''}],
  optionsList: {},
});

const stateUpdaters: StateUpdaters<AccountEmployeeMultipleOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: () => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (prevState: IOwnState, props: AccountEmployeeMultipleOptionProps) => (values: IEmployee[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.fullName,
      data: item
    }));

    const optionsList = prevState.optionsList;
    optionsList[props.positoinUid || 'isAll'] = options;

    return {
      optionsList
    };
  }
};

const handlerCreators: HandleCreators<AccountEmployeeMultipleOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeMultipleOptionProps) => (companyUid?: string, positionUid?: string) => {
    const { isExpired, isLoading } = props.accountEmployeeState.list;
    const { loadListRequest } = props.accountEmployeeDispatch;

    const request: IEmployeeListRequest = {
      filter: {
        companyUids: companyUid,
        positionUids: positionUid,
        useAccess: true,
        isActive: true,
        direction: 'ascending',
        orderBy: 'fullName'
      }
    };

    if (isExpired || !isLoading) {
      loadListRequest(request);
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<AccountEmployeeMultipleOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response, isLoading } = this.props.accountEmployeeState.list;
    
    // 1st load only when request are empty
    if (!request) {
      if (this.props.positoinUid) {
        this.props.handleOnLoadApi(this.props.companyUid, this.props.positoinUid);
      } else {
        this.props.handleOnLoadApi();
      }
    } else {
      // 2nd load only when request filter are present
      if (request && request.filter) {
        if (request.filter.positionUids && this.props.positoinUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
          const shouldUpdatePosition = !shallowEqual(request.filter.positionUids, this.props.positoinUid);
    
          // then should update the list?
          if ((shouldUpdate && shouldUpdatePosition) && !isLoading) {
            this.props.handleOnLoadApi(this.props.companyUid, this.props.positoinUid);
          } else {
            if (response && response.data && !isLoading && !shouldUpdatePosition) {
              this.props.setOptions(response.data);
            }
          }
        } else {
          if (request && request.filter && !request.filter.positionUids && !this.props.position) {
            this.props.setOptions(response && response.data);
          } else {
            this.props.handleOnLoadApi(this.props.companyUid, this.props.positoinUid);
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: AccountEmployeeMultipleOptionProps) {
    const { request, response } = this.props.accountEmployeeState.list;

    // if no positoin before, and next one is exist *this happen for field that need other field data
    if (!this.props.positoinUid && nextProps.positoinUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.companyUid, nextProps.positoinUid);
      } else if (request && request.filter) {
        if (request.filter.positionUids && nextProps.positoinUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.filter.positionUids, nextProps.positoinUid);
  
          // should update the list?
          if (shouldUpdate && !this.props.optionsList[nextProps.positoinUid]) {
            this.props.handleOnLoadApi(nextProps.companyUid, nextProps.positoinUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        } else if (!request.filter.positionUids && nextProps.positoinUid) {
          this.props.handleOnLoadApi(nextProps.companyUid, nextProps.positoinUid);
        }
      }
    }

    // this used for update list when changing the filter(position) *not the 1st time load
    if (this.props.positoinUid && nextProps.positoinUid) {
      if (this.props.positoinUid !== nextProps.positoinUid) {
        if (request && request.filter) {
          if (request.filter.positionUids) {
            const shouldUpdate = !shallowEqual(request.filter.positionUids, nextProps.positoinUid);
    
            if (!this.props.optionsList[nextProps.positoinUid]) {
              if (shouldUpdate) {
                this.props.handleOnLoadApi(nextProps.companyUid, nextProps.positoinUid);
              } else {
                if (response && response.data) {
                  this.props.setOptions(response.data);
                }
              }
            }
          } else {
            if (!this.props.optionsList[nextProps.positoinUid]) {
              this.props.handleOnLoadApi(nextProps.companyUid, nextProps.positoinUid);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: AccountEmployeeMultipleOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.accountEmployeeState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.accountEmployeeState.list;

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data && !this.props.optionsList[this.props.positoinUid || 'isAll']) {
        this.props.setOptions(thisResponse.data);
      }
    }
    // console.log(this.props.optionsList);
  }
};

const component: React.SFC<AccountEmployeeMultipleOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.isLoading,
            options: props.optionsList[props.positoinUid || 'isAll'] && props.optionsList[props.positoinUid || 'isAll'] || props.optionBlank,
            value: props.optionsList[props.positoinUid || 'isAll'] && props.optionsList[props.positoinUid || 'isAll'].find(option => option.value === children.props.valueString) || props.optionBlank
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const AccountEmployeeMultipleOption = compose<AccountEmployeeMultipleOptionProps, IOwnOption>(
  setDisplayName('AccountEmployeeMultipleOption'),
  withAccountEmployee,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);