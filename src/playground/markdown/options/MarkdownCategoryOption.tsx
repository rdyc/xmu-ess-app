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
import { IMarkdownCategoryGetListFilter } from '../classes/filters/category/IMarkdownCategoryGetListFilter';
import { IMarkdownCategory } from '../classes/response';
import { withMarkdownCategory, WithMarkdownCategory } from '../hoc/withMarkdownCategory';

interface IOwnOption {
  filter?: IMarkdownCategoryGetListFilter;
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

export type MarkdownCategoryOptionProps
  = WithMarkdownCategory
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<MarkdownCategoryOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IMarkdownCategory[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<MarkdownCategoryOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: MarkdownCategoryOptionProps) => () => {
    const { isExpired, isLoading } = props.markdownCategoryState.list;
    const { loadListRequest } = props.markdownCategoryDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<MarkdownCategoryOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.markdownCategoryState.list;

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
  componentDidUpdate(prevProps: MarkdownCategoryOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.markdownCategoryState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.markdownCategoryState.list;
    
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

const component: React.SFC<MarkdownCategoryOptionProps> = props => {
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

export const MarkdownCategoryOption = compose<MarkdownCategoryOptionProps, IOwnOption>(
  setDisplayName('MarkdownCategoryOption'),
  withMarkdownCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);