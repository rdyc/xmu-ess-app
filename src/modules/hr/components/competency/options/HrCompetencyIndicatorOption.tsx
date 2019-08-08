import { IHrCompetencyIndicatorGetListFilter } from '@hr/classes/filters/';
import { IHrCompetencyIndicatorList } from '@hr/classes/response';
import { WithHrCompetencyIndicator, withHrCompetencyIndicator } from '@hr/hoc/withHrCompetencyIndicator';
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
  filter?: IHrCompetencyIndicatorGetListFilter;
  clusterUid?: string;
  categoryUid?: string;
  levelUid?: string;
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
  handleOnLoadApi: (levelUid: string) => void;
}

export type HrCompetencyIndicatorOptionProps
  = WithHrCompetencyIndicator
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<HrCompetencyIndicatorOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IHrCompetencyIndicatorList[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<HrCompetencyIndicatorOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyIndicatorOptionProps) => (levelUid: string) => {
    const { isExpired, isLoading } = props.hrCompetencyIndicatorState.list;
    const { loadListRequest } = props.hrCompetencyIndicatorDispatch;
    const { filter, clusterUid, categoryUid } = props;

    if ((isExpired || !isLoading) && clusterUid && categoryUid) {
      loadListRequest({ 
        filter,
        clusterUid,
        categoryUid,
        levelUid,
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<HrCompetencyIndicatorOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.hrCompetencyIndicatorState.list;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.levelUid) {
        this.props.handleOnLoadApi(this.props.levelUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request) {
        if (request.levelUid && this.props.levelUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.levelUid, this.props.levelUid);
    
          // then should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(this.props.levelUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: HrCompetencyIndicatorOptionProps) {
    const { request, response } = this.props.hrCompetencyIndicatorState.list;

    // if no levelUid before, and next one is exist *this happen for field that need other field data
    if ( !this.props.levelUid && nextProps.levelUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.levelUid);
      } else if (request) {
        if (request.levelUid && nextProps.levelUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.levelUid, nextProps.levelUid);
  
          // should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.levelUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    // this used for update list when changing the levelUid *not the 1st time load
    if (this.props.levelUid && nextProps.levelUid) {
      if (this.props.levelUid !== nextProps.levelUid) {
        if (request) {
          const shouldUpdate = !shallowEqual(request.levelUid, nextProps.levelUid);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.levelUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: HrCompetencyIndicatorOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.hrCompetencyIndicatorState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.hrCompetencyIndicatorState.list;
    
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

const component: React.SFC<HrCompetencyIndicatorOptionProps> = props => {
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

export const HrCompetencyIndicatorOption = compose<HrCompetencyIndicatorOptionProps, IOwnOption>(
  setDisplayName('HrCompetencyIndicatorOption'),
  withHrCompetencyIndicator,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);