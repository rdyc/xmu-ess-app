import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPICategoryList } from '@kpi/classes/response/category';
import { WithKPICategory, withKPICategory } from '@kpi/hoc/withKPICategory';
import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
  defaultLabel?: string;
  filter?: IKPICategoryGetListFilter;
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

export type KPICategoryOptionProps
  = WithKPICategory
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  isLoading: false,
  options: [{ label: 'Select The Category', value: ''}]
});

const stateUpdaters: StateUpdaters<KPICategoryOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: () => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (props: KPICategoryOptionProps) => (values: IKPICategoryList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: props.defaultLabel || '', value: ''}
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

const handlerCreators: HandleCreators<KPICategoryOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPICategoryOptionProps) => () => {
    const { isExpired, isLoading } = props.kpiCategoryState.list;
    const { loadListRequest } = props.kpiCategoryDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<KPICategoryOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.kpiCategoryState.list;

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
  componentDidUpdate(prevProps: KPICategoryOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.kpiCategoryState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.kpiCategoryState.list;

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

const component: React.SFC<KPICategoryOptionProps> = props => {
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

export const KPICategoryOption = compose<KPICategoryOptionProps, IOwnOption>(
  setDisplayName('KPICategoryOption'),
  injectIntl,
  withKPICategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);