import { IEmployee } from '@account/classes/response';
import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IOrganizationStructureSubOrdinateListFilter } from '@organization/classes/filters/structure';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import * as React from 'react';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, shallowEqual, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

interface IOwnOption {
  filter?: IOrganizationStructureSubOrdinateListFilter;
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

export type OrganizationStructureSubOrdinateOptionProps
  = WithOrganizationStructure
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: '' }]
});

const stateUpdaters: StateUpdaters<OrganizationStructureSubOrdinateOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: () => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: () => (values: IEmployee[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.fullName,
      data: item
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<OrganizationStructureSubOrdinateOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationStructureSubOrdinateOptionProps) => () => {
    const { isExpired, isLoading } = props.organizationStructureState.subOrdinateList;
    const { loadSubOrdinateListRequest } = props.organizationStructureDispatch;

    if (isExpired || !isLoading) {
      loadSubOrdinateListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<OrganizationStructureSubOrdinateOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.organizationStructureState.subOrdinateList;

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
  componentDidUpdate(prevProps: OrganizationStructureSubOrdinateOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.organizationStructureState.subOrdinateList;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.organizationStructureState.subOrdinateList;
    
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

const component: React.SFC<OrganizationStructureSubOrdinateOptionProps> = props => {
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

export const OrganizationStructureSubOrdinateOption = compose<OrganizationStructureSubOrdinateOptionProps, IOwnOption>(
  setDisplayName('organizationStructureSubOrdinateOption'),
  withOrganizationStructure,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);