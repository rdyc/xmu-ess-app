import { WithForm, withForm } from '@layout/hoc/withForm';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import {
  compose,
  HandleCreators,
  mapper,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { EffectivenessFilterView } from './EffectivenessFilterView';

export type FilterFormData = {
  employeeUid: string | null ;
  projectUid: string | null;
};

interface FormValueProps {
  employeeUidValue: string | undefined;
  projectUidValue: string | undefined;
}

interface OwnOption {
  className: string;
  isLoading: boolean;
  onFilterChange: (customerUid: string, projectUid: string | undefined) => void;
  onClickSync: (event: React.MouseEvent<HTMLElement>) => void;
}

interface OwnHandler {
  
}

interface OwnState {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type EffectivenessFilterProps 
  = WithForm
  & InjectedIntlProps
  & OwnOption
  & OwnHandler
  & OwnState
  & WithUser
  & OwnStateUpdaters
  & FormValueProps;
  
const createProps: mapper<EffectivenessFilterProps, OwnState> = (props: EffectivenessFilterProps): OwnState => {
  return { 
    isOpenDialog: false
  };
};

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<EffectivenessFilterProps, OwnHandler> = {
  
};

export const EffectivenessFilter = compose<EffectivenessFilterProps, OwnOption>(
  withUser,
  withForm,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
  withHandlers<EffectivenessFilterProps, OwnHandler>(handlerCreators)
)(EffectivenessFilterView);