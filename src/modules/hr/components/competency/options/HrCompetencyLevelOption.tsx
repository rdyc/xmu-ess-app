import { IHrCompetencyLevelGetListFilter } from '@hr/classes/filters/';
import { IHrCompetencyLevelList } from '@hr/classes/response';
import { WithHrCompetencyLevel, withHrCompetencyLevel } from '@hr/hoc/withHrCompetencyLevel';
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
  filter?: IHrCompetencyLevelGetListFilter;
  clusterUid?: string;
  categoryUid?: string;
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

export type HrCompetencyLevelOptionProps
  = WithHrCompetencyLevel
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<HrCompetencyLevelOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IHrCompetencyLevelList[]): Partial<IOwnState> => {
    const options: ISelectFieldOption[] = [
      { label: '', value: ''}
    ];
        
    values.forEach(item => options.push({ 
      value: item.uid, 
      label: item.level.toString() 
    }));

    return {
      options
    };
  }
};

const handlerCreators: HandleCreators<HrCompetencyLevelOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyLevelOptionProps) => (categoryUid: string) => {
    const { isExpired, isLoading } = props.hrCompetencyLevelState.list;
    const { loadListRequest } = props.hrCompetencyLevelDispatch;
    const { filter, clusterUid } = props;

    if ((isExpired || !isLoading) && clusterUid) {
      loadListRequest({ 
        filter,
        categoryUid,
        clusterUid
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<HrCompetencyLevelOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.hrCompetencyLevelState.list;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.categoryUid) {
        this.props.handleOnLoadApi(this.props.categoryUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request) {
        if (request.categoryUid && this.props.categoryUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.categoryUid, this.props.categoryUid);
    
          // then should update the list?
          if (shouldUpdate) {
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
  componentWillUpdate(nextProps: HrCompetencyLevelOptionProps) {
    const { request, response } = this.props.hrCompetencyLevelState.list;

    // if no categoryUid before, and next one is exist *this happen for field that need other field data
    if ( !this.props.categoryUid && nextProps.categoryUid) {
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

    // this used for update list when changing the categoryUid *not the 1st time load
    if (this.props.categoryUid && nextProps.categoryUid) {
      if (this.props.categoryUid !== nextProps.categoryUid) {
        if (request) {
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
  componentDidUpdate(prevProps: HrCompetencyLevelOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.hrCompetencyLevelState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.hrCompetencyLevelState.list;
    
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

const component: React.SFC<HrCompetencyLevelOptionProps> = props => {
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

export const HrCompetencyLevelOption = compose<HrCompetencyLevelOptionProps, IOwnOption>(
  setDisplayName('HrCompetencyLevelOption'),
  withHrCompetencyLevel,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);