import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectRegistrationGetListRequest } from '@project/classes/queries/registration';
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
  handleOnLoadApi: () => void;
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
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<ProjectOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectOptionProps) => () => {
    const { isExpired, isLoading } = props.projectRegisterState.list;

    const request: IProjectRegistrationGetListRequest = {
      filter: props.filter
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
  componentDidUpdate(prevProps: ProjectOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.projectRegisterState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.projectRegisterState.list;

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