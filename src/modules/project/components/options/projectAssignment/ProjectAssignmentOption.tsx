import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import { IProjectAssignmentList } from '@project/classes/response';
import { WithProjectAssignment, withProjectAssignment } from '@project/hoc/withProjectAssignment';
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
  filter?: IProjectAssignmentGetListFilter;
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
  handleOnLoadApi: (filter: IProjectAssignmentGetListFilter) => void;
}

export type ProjectAssignmentOptionProps
  = WithProjectAssignment
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<ProjectAssignmentOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IProjectAssignmentList[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<ProjectAssignmentOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectAssignmentOptionProps) => (filter: IProjectAssignmentGetListFilter) => {
    const { isExpired, isLoading } = props.projectAssignmentState.list;
    const { loadListRequest } = props.projectAssignmentDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<ProjectAssignmentOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.projectAssignmentState.list;

    // 1st load only when request are empty and have filter
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
  componentWillUpdate(nextProps: ProjectAssignmentOptionProps) {
    const { request, response } = this.props.projectAssignmentState.list;

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
  componentDidUpdate(prevProps: ProjectAssignmentOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.projectAssignmentState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.projectAssignmentState.list;

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

const component: React.SFC<ProjectAssignmentOptionProps> = props => {
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

export const ProjectAssignmentOption = compose<ProjectAssignmentOptionProps, IOwnOption>(
  setDisplayName('ProjectAssignmentOption'),
  withProjectAssignment,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);