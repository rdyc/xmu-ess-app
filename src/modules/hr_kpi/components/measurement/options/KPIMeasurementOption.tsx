import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { IKPIMeasurementList } from '@kpi/classes/response/measurement';
import { WithKPIMeasurement, withKPIMeasurement } from '@kpi/hoc/withKPIMeasurement';
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
  categoryUid: string;
  filter?: IKPIMeasurementGetListFilter;
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
  handleOnLoadApi: (categoryUid: string) => void;
}

export type KPIMeasurementOptionProps
  = WithKPIMeasurement
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<KPIMeasurementOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: () => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: () => (values: IKPIMeasurementList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.description 
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<KPIMeasurementOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: KPIMeasurementOptionProps) => (categoryUid: string) => {
    const { isExpired, isLoading } = props.kpiMeasurementState.list;
    const { loadListRequest } = props.kpiMeasurementDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        categoryUid,
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<KPIMeasurementOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.kpiMeasurementState.list;
    
    // 1st load only when request are empty
    if (!request) {
      if (this.props.categoryUid) {
        this.props.handleOnLoadApi(this.props.categoryUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request && request.filter) {
        if (request.categoryUid && this.props.categoryUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.filter, this.props.filter || {});
          const shouldUpdateCategory = !shallowEqual(request.categoryUid, this.props.categoryUid);
    
          // then should update the list?
          if (shouldUpdate || shouldUpdateCategory) {
            this.props.handleOnLoadApi(this.props.categoryUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: KPIMeasurementOptionProps) {
    const { request, response } = this.props.kpiMeasurementState.list;

    // if no category before, and next one is exist *this happen for field that need other field data
    if (!this.props.categoryUid && nextProps.categoryUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.categoryUid);
      } else if (request) {
        if (request.categoryUid && nextProps.categoryUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.categoryUid, nextProps.categoryUid);
  
          // should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.categoryUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    // this used for update list when changing the filter(company) *not the 1st time load
    if (this.props.categoryUid && nextProps.categoryUid) {
      if (this.props.categoryUid !== nextProps.categoryUid) {
        if (request && request.categoryUid) {
          const shouldUpdate = !shallowEqual(request.categoryUid, nextProps.categoryUid);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.categoryUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: KPIMeasurementOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.kpiMeasurementState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.kpiMeasurementState.list;

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

const component: React.SFC<KPIMeasurementOptionProps> = props => {
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

export const KPIMeasurementOption = compose<KPIMeasurementOptionProps, IOwnOption>(
  setDisplayName('KPIMeasurementOption'),
  withKPIMeasurement,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);