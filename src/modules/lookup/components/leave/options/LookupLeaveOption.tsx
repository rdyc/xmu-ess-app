// import { LeaveType } from '@common/classes/types';
import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ILookupLeaveGetListFilter } from '@lookup/classes/filters';
import { ILookupLeaveList } from '@lookup/classes/response';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
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
  companyUid?: string;
  categoryType?: string;
  filter?: ILookupLeaveGetListFilter;
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
  handleOnLoadApi: (filter: ILookupLeaveGetListFilter) => void;
}

export type LookupLeaveOptionProps
  = WithLookupLeave
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupLeaveOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: ILookupLeaveList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.name 
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<LookupLeaveOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupLeaveOptionProps) => (filter: ILookupLeaveGetListFilter) => {
    const { isExpired, isLoading } = props.lookupLeaveState.list;
    const { loadListRequest } = props.lookupLeaveDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupLeaveOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.lookupLeaveState.list;

    // 1st load only when request are empty
    if (!request && this.props.filter) {
      this.props.handleOnLoadApi(this.props.filter);
    } else if (request) {
      if ( response && response.data ) {
        this.props.setOptions(response.data);
      }
    }
    // else {
    //   // 2nd load only when request filter are present
    //   if (request.filter) {
    //     // comparing some props
    //     const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
  
    //     // then should update the list?
    //     if (shouldUpdate) {
    //       this.props.handleOnLoadApi(this.props.filter);
    //     } else {
    //       if (response && response.data) {
    //         this.props.setOptions(response.data);
    //       }
    //     }
    //   }
    // }
  },
  // componentWillUpdate(nextProps: LookupLeaveOptionProps) {
  //   if (!this.props.filter && nextProps.filter) {
  //     if (nextProps.filter.categoryType === LeaveType.CutiKhusus) {
  //       this.props.handleOnLoadApi(nextProps.filter);
  //     }
  //   }
  // },
  componentDidUpdate(prevProps: LookupLeaveOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.lookupLeaveState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.lookupLeaveState.list;

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        this.props.setOptions(thisResponse.data);
      }
    }
  }
};

const component: React.SFC<LookupLeaveOptionProps> = props => {
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

export const LookupLeaveOption = compose<LookupLeaveOptionProps, IOwnOption>(
  setDisplayName('LookupLeaveOption'),
  withLookupLeave,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);