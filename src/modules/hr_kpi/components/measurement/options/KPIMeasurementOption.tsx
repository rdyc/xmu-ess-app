import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { IKPIMeasurementList } from '@kpi/classes/response/measurement';
import { WithKPIMeasurement, withKPIMeasurement } from '@kpi/hoc/withKPIMeasurement';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
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

export interface IKPIMeasurementOptions {
  [key: string]: ISelectFieldOption[];
}

interface IOwnOption {
  categoryUid: string;
  filter?: IKPIMeasurementGetListFilter;
}

interface IOwnState {
  isLoading: boolean;
  optionsList: IKPIMeasurementOptions;
  optionBlank: ISelectFieldOption[];
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
  & InjectedIntlProps
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (): IOwnState => ({
  isLoading: false,
  optionBlank: [{ label: '', value: ''}],
  optionsList: {},
});

const stateUpdaters: StateUpdaters<KPIMeasurementOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: () => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (prevState: IOwnState, props: KPIMeasurementOptionProps) => (values: IKPIMeasurementList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: props.intl.formatMessage(kpiMessage.template.field.measurementUidPlaceholder), value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.description,
      data: item
    }));

    const optionsList = prevState.optionsList;
    optionsList[props.categoryUid] = options;

    return {
      optionsList
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
    const { request, response, isLoading } = this.props.kpiMeasurementState.list;
    
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
          if ((shouldUpdate || shouldUpdateCategory) && !isLoading) {
            this.props.handleOnLoadApi(this.props.categoryUid);
          } else {
            if (response && response.data && !isLoading && !shouldUpdateCategory) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: KPIMeasurementOptionProps) {
    const { request, response, isLoading } = this.props.kpiMeasurementState.list;

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
            if (response && response.data && !isLoading && !shouldUpdate) {
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
  
          if (shouldUpdate && response && response.data) {
            this.props.handleOnLoadApi(nextProps.categoryUid);
          } else {
            if (response && response.data && !isLoading && !shouldUpdate) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    if (response && response.data && !isLoading) {
      if (request && request.categoryUid !== nextProps.categoryUid && !this.props.optionsList[nextProps.categoryUid]) {
        this.props.handleOnLoadApi(nextProps.categoryUid);
      }
    }
  },
  componentDidUpdate(prevProps: KPIMeasurementOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.kpiMeasurementState.list;
    const { request: prevRequest, isLoading: prevIsLoading, response: prevResponse } = prevProps.kpiMeasurementState.list;
    const shouldUpdate = !shallowEqual(prevRequest && prevRequest.categoryUid || '', this.props.categoryUid);

    if (thisIsLoading !== prevIsLoading) {
      this.props.setLoading(thisIsLoading);
    }

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data && !shouldUpdate && !this.props.optionsList[this.props.categoryUid]) {
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
            options: props.optionsList[props.categoryUid] && props.optionsList[props.categoryUid] || props.optionBlank,
            value: props.optionsList[props.categoryUid] && props.optionsList[props.categoryUid].find(option => option.value === children.props.valueString) || props.optionBlank
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
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);