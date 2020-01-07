import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IWebJobDefinitionJobGetListFilter } from '@webjob/classes/filters';
import { IWebJobDefinitionJobList } from '@webjob/classes/response';
import { WithWebJobDefinition, withWebJobDefinition } from '@webjob/hoc/withWebJobDefinition';
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
  definitionUid?: string;
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
  handleOnLoadApi: (definitionUid: string) => void;
}

export type DefintionJobOptionProps
  = WithWebJobDefinition
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<DefintionJobOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IWebJobDefinitionJobList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.class 
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<DefintionJobOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: DefintionJobOptionProps) => (definitionUid: string) => {
    const { isExpired, isLoading } = props.webJobDefinitionState.jobList;
    const { jobloadListRequest } = props.webJobDefinitionDispatch;
    
    const filter: IWebJobDefinitionJobGetListFilter = {
      direction: 'ascending'
    };

    if (isExpired || !isLoading) {
      jobloadListRequest({ 
        definitionUid,
        filter
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<DefintionJobOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.webJobDefinitionState.jobList;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.definitionUid) {
        this.props.handleOnLoadApi(this.props.definitionUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request) {
        if (request.definitionUid && this.props.definitionUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.definitionUid, this.props.definitionUid);
    
          // then should update the jobList?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(this.props.definitionUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: DefintionJobOptionProps) {
    const { request, response } = this.props.webJobDefinitionState.jobList;

    // if no filter(company) before, and next one is exist *this happen for field that need other field data
    if ( !this.props.definitionUid && nextProps.definitionUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.definitionUid);
      } else if (request) {
        if (request.definitionUid && nextProps.definitionUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.definitionUid, nextProps.definitionUid);
  
          // should update the jobList?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.definitionUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    // this used for update jobList when changing the filter(company) *not the 1st time load
    if (this.props.definitionUid && nextProps.definitionUid) {
      if (this.props.definitionUid !== nextProps.definitionUid) {
        if (request && request.definitionUid) {
          const shouldUpdate = !shallowEqual(request.definitionUid, nextProps.definitionUid);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.definitionUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: DefintionJobOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.webJobDefinitionState.jobList;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.webJobDefinitionState.jobList;

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

const component: React.SFC<DefintionJobOptionProps> = props => {
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

export const DefintionJobOption = compose<DefintionJobOptionProps, IOwnOption>(
  setDisplayName('DefintionJobOption'),
  withWebJobDefinition,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);