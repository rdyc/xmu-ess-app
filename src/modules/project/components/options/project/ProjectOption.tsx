import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectRegistrationGetListRequest } from '@project/classes/queries/registration';
import { IProjectList } from '@project/classes/response';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
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
  filter?: IProjectRegistrationGetListFilter;
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
  handleOnLoadApi: (filter: IProjectRegistrationGetListFilter) => void;
}

export type ProjectOptionProps
  = WithProjectRegistration
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<ProjectOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IProjectList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: `${item.uid} - ${item.name}`,
      data: item
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<ProjectOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectOptionProps) => (filter: IProjectRegistrationGetListFilter) => {
    const { isExpired, isLoading } = props.projectRegisterState.list;

    const request: IProjectRegistrationGetListRequest = {
      filter
    };

    if (isExpired || !isLoading) {
      props.projectRegisterDispatch.loadListRequest(request);
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<ProjectOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.projectRegisterState.list;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.filter) {
        this.props.handleOnLoadApi(this.props.filter);
      }
    } else {
      // 2nd load only when request filter are present
      if (request && request.filter && this.props.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(request.filter, this.props.filter);
  
        // then should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi(this.props.filter);
        } else {
          if (response && response.data) {
            this.props.setOptions(response.data);
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: ProjectOptionProps) {
    const { request, response } = this.props.projectRegisterState.list;

    // if no filter before, and next one is exist *this happen for field that need other field data
    if ( !this.props.filter && nextProps.filter) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.filter);
      } else if (request && request.filter) {
        // if request(data) is exist then compare
        const shouldUpdate = !shallowEqual(request.filter, nextProps.filter);

        // should update the list?
        if (shouldUpdate) {
          this.props.handleOnLoadApi(nextProps.filter);
        } else {
          if (response && response.data) {
            this.props.setOptions(response.data);
          }
        }
      }
    }

    // this used for update list when changing the filter *not the 1st time load
    if (this.props.filter && nextProps.filter) {
      if (this.props.filter !== nextProps.filter) {
        if (request && request.filter) {
          const shouldUpdate = !shallowEqual(request.filter, nextProps.filter);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.filter);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: ProjectOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.projectRegisterState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.projectRegisterState.list;

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

const component: React.SFC<ProjectOptionProps> = props => {
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

export const ProjectOption = compose<ProjectOptionProps, IOwnOption>(
  setDisplayName('ProjectOption'),
  withProjectRegistration,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);