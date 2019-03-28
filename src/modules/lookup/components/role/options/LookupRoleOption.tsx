import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ILookupRoleGetListFilter } from '@lookup/classes/filters/role';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
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
  filter?: ILookupRoleGetListFilter;
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

export type LookupRoleOptionProps
  = WithLookupRole
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupRoleOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<LookupRoleOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupRoleOptionProps) => () => {
    const { isExpired, isLoading } = props.lookupRoleState.list;
    const { loadListRequest } = props.lookupRoleDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupRoleOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: LookupRoleOptionProps) {
    if (this.props.lookupRoleState.list.response !== prevProps.lookupRoleState.list.response) {
      const { response } = this.props.lookupRoleState.list;

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

const component: React.SFC<LookupRoleOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.lookupRoleState.list.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const LookupRoleOption = compose<LookupRoleOptionProps, IOwnOption>(
  setDisplayName('LookupRoleOptionProps'),
  withLookupRole,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);