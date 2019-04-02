import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { withProjectSite, WithProjectSite } from '@project/hoc/withProjectSite';
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

interface IOwnOption extends IProjectSiteGetRequest {
  // filter?: ;
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

export type ProjectSiteOptionProps
  = WithProjectSite
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<ProjectSiteOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<ProjectSiteOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectSiteOptionProps) => () => {
    const { isExpired, isLoading } = props.projectSiteState;
    const { loadRequest } = props.projectSiteDispatch;

    if (isExpired || !isLoading) {
      loadRequest({ 
        companyUid: props.companyUid,
        projectUid: props.projectUid,
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<ProjectSiteOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.projectSiteState;

    // 1st load only when request are empty
    if (!request) {
      this.props.handleOnLoadApi();
    } else {
      // 2nd load only when request filter are present
      // if (request.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(
          {
            companyUid: request.companyUid,
            projectUid: request.projectUid
          },
          {
            companyUid: this.props.companyUid,
            projectUid: this.props.projectUid
          }
        );
  
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
      // }
    }
  },
  componentDidUpdate(prevProps: ProjectSiteOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.projectSiteState;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.projectSiteState;

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

const component: React.SFC<ProjectSiteOptionProps> = props => {
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

export const ProjectSiteOption = compose<ProjectSiteOptionProps, IOwnOption>(
  setDisplayName('ProjectSiteOptionProps'),
  withProjectSite,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);