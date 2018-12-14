import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';

import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { LookupMileageExceptionListView } from './LookupMileageExceptionListView';

interface OwnHandlers {
  handleCompanyFilter: (companyUid: string) => void;
}

interface OwnState {
  companyUid: string | undefined;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupMileageExceptionListProps 
  = WithUser
  & WithLookupMileageException
  & InjectedIntlProps
  & OwnState
  & OwnHandlers
  & OwnStateUpdaters;

const createProps: mapper<LookupMileageExceptionListProps, OwnState> = (): OwnState => ({
  companyUid: undefined
});

const handlerCreators: HandleCreators<LookupMileageExceptionListProps, OwnHandlers> = {
  handleCompanyFilter: (props: LookupMileageExceptionListProps) => (companyUid: string) => {
    props.stateUpdate({
      companyUid
    });
  },  
};

const stateUpdaters: StateUpdaters<LookupMileageExceptionListProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),  
};

export default compose<LookupMileageExceptionListProps, {}>(
  withUser,
  withLookupMileageException,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupMileageExceptionListProps, OwnHandlers>(handlerCreators),
)(LookupMileageExceptionListView);