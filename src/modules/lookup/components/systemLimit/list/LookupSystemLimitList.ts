import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupSystemLimitListView } from './LookupSystemLimitListView';

interface OwnHandlers {
  handleCompanyFilter: (companyUid: string) => void;
  handleCategoryFilter: (categoryType: string) => void;
}

interface OwnState {
  companyUid: string | undefined;
  categoryType: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupSystemLimitListProps 
  = WithUser
  & WithLookupSystemLimit
  & InjectedIntlProps
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters;

const createProps: mapper<LookupSystemLimitListProps, OwnState> = (): OwnState => ({
  companyUid: undefined,
  categoryType: undefined
});

const handlerCreators: HandleCreators<LookupSystemLimitListProps, OwnHandlers> = {
  handleCompanyFilter: (props: LookupSystemLimitListProps) => (companyUid: string) => {
    props.stateUpdate({
      companyUid
    });
  },
  handleCategoryFilter: (props: LookupSystemLimitListProps) => (categoryType: string) => {
    props.stateUpdate({
      categoryType
    });
  }
};

const stateUpdaters: StateUpdaters<LookupSystemLimitListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),  
};

export default compose<LookupSystemLimitListProps, {}>(
  withUser,
  withLookupSystemLimit,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupSystemLimitListProps, OwnHandlers>(handlerCreators),
)(LookupSystemLimitListView);