import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { IProjectSite } from '@project/classes/response';
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

interface IOwnOption {
  filter?: IProjectSiteGetRequest;
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
  handleOnLoadApi: (filter: IProjectSiteGetRequest) => void;
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
  setOptions: (state: IOwnState) => (values: IProjectSite[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<ProjectSiteOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: ProjectSiteOptionProps) => (filter: IProjectSiteGetRequest) => {
    const { isExpired, isLoading } = props.projectSiteState;
    const { loadRequest } = props.projectSiteDispatch;

    if (isExpired || !isLoading) {
      loadRequest({ 
        companyUid: filter.companyUid,
        projectUid: filter.projectUid,
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<ProjectSiteOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.projectSiteState;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.filter) {
        this.props.handleOnLoadApi(this.props.filter);
      }
    } else {
      // 2nd load only when request filter are present
      if (request && this.props.filter) {
        // comparing some props
        const shouldUpdate = !shallowEqual(request, this.props.filter);
  
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
  componentWillUpdate(nextProps: ProjectSiteOptionProps) {
    const { request, response } = this.props.projectSiteState;

    // if no filter before, and next one is exist *this happen for field that need other field data
    if ( !this.props.filter && nextProps.filter ) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.filter);
      } else if (request) {
        // if request(data) is exist then compare
        const shouldUpdate = !shallowEqual(request, nextProps.filter);

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
        if (request) {
          const shouldUpdate = !shallowEqual(request, nextProps.filter);
  
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
  componentDidUpdate(prevProps: ProjectSiteOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.projectSiteState;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.projectSiteState;

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
  setDisplayName('ProjectSiteOption'),
  withProjectSite,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);