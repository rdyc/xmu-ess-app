import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { IRoleList } from '@lookup/classes/response';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
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
  companyUid?: string;
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
  handleOnLoadApi: (companyUid: string) => void;
}

export type LookupRoleOptionProps
  = WithLookupRole
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupRoleOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IRoleList[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<LookupRoleOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupRoleOptionProps) => (companyUid: string) => {
    const { isExpired, isLoading } = props.lookupRoleState.list;
    const { loadListRequest } = props.lookupRoleDispatch;

    const filter: ILookupRoleGetListFilter = {
      companyUid,
      direction: 'ascending'
    };

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupRoleOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.lookupRoleState.list;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.companyUid) {
        this.props.handleOnLoadApi(this.props.companyUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request && request.filter) {
        if (request.filter.companyUid && this.props.companyUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.filter.companyUid, this.props.companyUid);
    
          // then should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(this.props.companyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: LookupRoleOptionProps) {
    const { request, response } = this.props.lookupRoleState.list;

    // if no filter(company) before, and next one is exist *this happen for field that need other field data
    if ( !this.props.companyUid && nextProps.companyUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.companyUid);
      } else if (request && request.filter) {
        if (request.filter.companyUid && nextProps.companyUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.filter.companyUid, nextProps.companyUid);
  
          // should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.companyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    // this used for update list when changing the filter(company) *not the 1st time load
    if (this.props.companyUid && nextProps.companyUid) {
      if (this.props.companyUid !== nextProps.companyUid) {
        if (request && request.filter && request.filter.companyUid) {
          const shouldUpdate = !shallowEqual(request.filter.companyUid, nextProps.companyUid);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.companyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: LookupRoleOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.lookupRoleState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.lookupRoleState.list;

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

const component: React.SFC<LookupRoleOptionProps> = props => {
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

export const LookupRoleOption = compose<LookupRoleOptionProps, IOwnOption>(
  setDisplayName('LookupRoleOption'),
  withLookupRole,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);