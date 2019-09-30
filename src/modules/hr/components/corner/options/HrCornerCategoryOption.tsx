import { IHrCornerCategoryGetListFilter } from '@hr/classes/filters/';
import { IHrCornerCategoryList } from '@hr/classes/response';
import { WithHrCornerCategory, withHrCornerCategory } from '@hr/hoc/withHrCornerCategory';
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

interface IOwnOption {
  filter?: IHrCornerCategoryGetListFilter;
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

export type HrCornerCategoryOptionProps
  = WithHrCornerCategory
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<HrCornerCategoryOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IHrCornerCategoryList[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<HrCornerCategoryOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCornerCategoryOptionProps) => () => {
    const { isExpired, isLoading } = props.hrCornerCategoryState.list;
    const { loadListRequest } = props.hrCornerCategoryDispatch;
    const { filter } = props;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<HrCornerCategoryOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.hrCornerCategoryState.list;
    
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
  componentDidUpdate(prevProps: HrCornerCategoryOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.hrCornerCategoryState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.hrCornerCategoryState.list;
    
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

const component: React.SFC<HrCornerCategoryOptionProps> = props => {
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

export const HrCornerCategoryOption = compose<HrCornerCategoryOptionProps, IOwnOption>(
  setDisplayName('HrCornerCategoryOption'),
  withHrCornerCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);