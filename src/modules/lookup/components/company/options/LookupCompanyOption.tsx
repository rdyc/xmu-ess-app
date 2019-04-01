import { ISelectFieldOption, SelectFieldProps } from '@layout/components/fields/SelectField';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
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
  filter?: ILookupCompanyGetListFilter;
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

export type LookupCompanyOptionProps
  = WithLookupCompany
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  options: [{ label: '', value: ''}]
});

const stateUpdaters: StateUpdaters<LookupCompanyOptionProps, IOwnState, IOwnStateUpdater> = {
  setOptions: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    options: values
  })
};

const handlerCreators: HandleCreators<LookupCompanyOptionProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupCompanyOptionProps) => () => {
    const { isExpired, isLoading } = props.lookupCompanyState.list;
    const { loadListRequest } = props.lookupCompanyDispatch;

    if (isExpired || !isLoading) {
      loadListRequest({ 
        filter: props.filter 
      });
    }
  }
};

const lifeCycle: ReactLifeCycleFunctions<LookupCompanyOptionProps, IOwnState> = {
  componentDidMount() {
    this.props.handleOnLoadApi();
  },
  componentDidUpdate(prevProps: LookupCompanyOptionProps) {
    if (this.props.lookupCompanyState.list.response !== prevProps.lookupCompanyState.list.response) {
      const { response } = this.props.lookupCompanyState.list;

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

const component: React.SFC<LookupCompanyOptionProps> = props => {
  const children = props.children as React.ReactElement<SelectFieldProps>;

  if (children) {
    return (
      <React.Fragment>
        {
          React.cloneElement(children, { 
            isLoading: props.lookupCompanyState.list.isLoading,
            options: props.options,
            value: props.options.find(option => option.value === children.props.valueString)
          })
        }
      </React.Fragment>
    );
  }

  return <div></div>;
};

export const LookupCompanyOption = compose<LookupCompanyOptionProps, IOwnOption>(
  setDisplayName('LookupCompanyOptionProps'),
  withLookupCompany,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycle)
)(component);