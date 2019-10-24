// import { IHrCompetencyCategoryGetListFilter } from '@hr/classes/filters/';
import { IHrCompetencyCategoryList } from '@hr/classes/response';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
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
  competencyUid?: string;
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
  handleOnLoadApi: (competencyUid: string) => void;
}

export type HrCompetencyCategoryOptionProps
  = WithHrCompetencyCategory
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isLoading: false,
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<HrCompetencyCategoryOptionProps, IOwnState, IOwnStateUpdater> = {
  setLoading: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isLoading: values
  }),
  setOptions: (state: IOwnState) => (values: IHrCompetencyCategoryList[]): Partial<IOwnState> => {
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

const handlerCreators: HandleCreators<HrCompetencyCategoryOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyCategoryOptionProps) => (competencyUid: string) => {
    const { isExpired, isLoading } = props.hrCompetencyCategoryState.list;
    const { loadListRequest } = props.hrCompetencyCategoryDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        competencyUid,
        filter: {
          direction: 'ascending',
          orderBy: 'name'
        },
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<HrCompetencyCategoryOptionProps, IOwnState> = {
  componentDidMount() {
    const { request, response } = this.props.hrCompetencyCategoryState.list;

    // 1st load only when request are empty
    if (!request) {
      if (this.props.competencyUid) {
        this.props.handleOnLoadApi(this.props.competencyUid);
      }
    } else {
      // 2nd load only when request filter are present
      if (request) {
        if (request.competencyUid && this.props.competencyUid) {
          // comparing some props
          const shouldUpdate = !shallowEqual(request.competencyUid, this.props.competencyUid);
    
          // then should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(this.props.competencyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentWillUpdate(nextProps: HrCompetencyCategoryOptionProps) {
    const { request, response } = this.props.hrCompetencyCategoryState.list;

    // if no competencyUid before, and next one is exist *this happen for field that need other field data
    if ( !this.props.competencyUid && nextProps.competencyUid) {
      // when no data then load
      if (!request) {
        this.props.handleOnLoadApi(nextProps.competencyUid);
      } else if (request) {
        if (request.competencyUid && nextProps.competencyUid) {
          // if request(data) is exist then compare
          const shouldUpdate = !shallowEqual(request.competencyUid, nextProps.competencyUid);
  
          // should update the list?
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.competencyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }

    // this used for update list when changing the competencyUid *not the 1st time load
    if (this.props.competencyUid && nextProps.competencyUid) {
      if (this.props.competencyUid !== nextProps.competencyUid) {
        if (request) {
          const shouldUpdate = !shallowEqual(request.competencyUid, nextProps.competencyUid);
  
          if (shouldUpdate) {
            this.props.handleOnLoadApi(nextProps.competencyUid);
          } else {
            if (response && response.data) {
              this.props.setOptions(response.data);
            }
          }
        }
      }
    }
  },
  componentDidUpdate(prevProps: HrCompetencyCategoryOptionProps) {
    const { isLoading: thisIsLoading, response: thisResponse } = this.props.hrCompetencyCategoryState.list;
    const { isLoading: prevIsLoading, response: prevResponse } = prevProps.hrCompetencyCategoryState.list;
    
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

const component: React.SFC<HrCompetencyCategoryOptionProps> = props => {
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

export const HrCompetencyCategoryOption = compose<HrCompetencyCategoryOptionProps, IOwnOption>(
  setDisplayName('HrCompetencyCategoryOption'),
  withHrCompetencyCategory,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);