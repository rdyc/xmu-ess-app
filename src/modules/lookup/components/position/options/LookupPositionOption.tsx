import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
import * as React from 'react';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface IOwnOption {
  filter?: IPositionGetListFilter;
}

interface IOwnState {
  options: ISelectFieldOption[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
}

export type LookupPositionOptionProps
  = WithLookupPosition
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupPositionOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<LookupPositionOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupPositionOptionProps) => () => {
    const { isExpired, isLoading } = props.lookupPositionState.list;
    const { loadListRequest } = props.lookupPositionDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupPositionOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: LookupPositionOptionProps) {
    if (this.props.lookupPositionState.list.response !== prevProps.lookupPositionState.list.response) {
      const { response } = this.props.lookupPositionState.list;

      if (response && response.data) {
        const options: ISelectFieldOption[] = [{ label: '', value: ''}];
        
        response.data.forEach(item => options.push({ 
          value: item.uid, 
          label: item.name 
        }));

        this.props.setOptions(options);
      }
    }
  }
};

const component: React.SFC<LookupPositionOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.lookupPositionState.list.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const LookupPositionOption = compose<LookupPositionOptionProps, IOwnOption>(
  setDisplayName('LookupPositionOptionProps'),
  withLookupPosition,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);